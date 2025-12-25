import { NextResponse } from 'next/server'
import { supabaseClient as supabase } from '@/config/supabase-client'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(request) {
  const sig = request.headers.get('stripe-signature')
  const rawBody = await request.text()

  try {
    const event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    )

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object

      // Grab the order ID from metadata
      const order_id = session.metadata?.order_id
      const stripe_transaction_id = session.id

      if (!order_id) {
        console.error('Missing order ID in Stripe session metadata')
        return NextResponse.json({ error: 'Invalid data' }, { status: 400 })
      }

      // Update the existing order in Supabase
      const { data, error } = await supabase
        .from('orders')
        .update({
          status: 'paid',
          stripe_transaction_id,
        })
        .eq('id', order_id)
        .select()
        .single()

      if (error) {
        console.error('Error updating order:', error)
        return NextResponse.json(
          { error: 'Failed to update order' },
          { status: 400 },
        )
      }

      return NextResponse.json({ success: true, order: data }, { status: 200 })
    }

    console.log(`Unhandled event type: ${event.type}`)
    return NextResponse.json({ received: true }, { status: 200 })
  } catch (error) {
    console.error('Stripe webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handling failed' },
      { status: 400 },
    )
  }
}
