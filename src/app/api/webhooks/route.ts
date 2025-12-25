import { NextRequest, NextResponse } from 'next/server'
import stripe from '@/lib/stripe'
import { supabaseClient as supabase } from '@/config/supabase-client'

export async function POST(req: NextRequest) {
  const payload = await req.text()
  const sig = req.headers.get('stripe-signature')!
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

  let event = null

  try {
    event = stripe.webhooks.constructEvent(payload, sig, webhookSecret)
  } catch (err) {
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 },
    )
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object

      try {
        // Extract userId from metadata and customerId from session
        const userId = session.metadata?.userId
        const customerId = session.customer

        if (!userId || !customerId) {
          return NextResponse.json(
            { error: 'Missing required data: userId or customerId' },
            { status: 400 },
          )
        }

        // Update the profiles table in Supabase
        const { error } = await supabase
          .from('profiles')
          .update({ stripe_customer_id: customerId })
          .eq('id', userId) // Assuming the column storing userId is 'id'

        if (error) {
          console.error('Error updating profiles:', error.message)
          return NextResponse.json(
            { error: 'Failed to update profiles in Supabase' },
            { status: 500 },
          )
        }

        console.log('Successfully updated profile with Stripe customer ID:', {
          userId,
          customerId,
        })
      } catch (err: any) {
        console.error('Error handling checkout.session.completed:', err.message)
        return NextResponse.json(
          { error: 'Internal server error' },
          { status: 500 },
        )
      }

      break
    }

    // Handle other event types as needed
    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  return NextResponse.json({ received: true })
}
