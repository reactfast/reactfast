// app/api/stripe-webhook/route.ts
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { apiCreateClient as supabase } from '@/config/supabase-client'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
})

export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature')
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  let event

  try {
    const body = await req.text() // Stripe requires the raw body
    event = stripe.webhooks.constructEvent(body, sig!, webhookSecret!)
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 },
    )
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    const customerId = session.customer as string
    const userId = session.metadata?.userId
    const SubTypeID = session.metadata?.subTypeID

    if (!customerId || !userId) {
      console.error('Missing customerId or userId in webhook event')
      return NextResponse.json(
        { error: 'Missing customerId or userId' },
        { status: 400 },
      )
    }

    try {
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ stripe_customer_id: customerId })
        .eq('id', userId)

      if (profileError) {
        console.error('Error updating profile:', profileError.message)
        return NextResponse.json(
          { error: 'Profile update failed' },
          { status: 500 },
        )
      }

      // Check if subscription already exists
      const { data: existingSubs, error: fetchError } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (fetchError && fetchError.code !== 'PGRST116') {
        console.error(
          'Error checking existing subscription:',
          fetchError.message,
        )
        return NextResponse.json(
          { error: 'Subscription check failed' },
          { status: 500 },
        )
      }

      if (existingSubs) {
        const { error: updateError } = await supabase
          .from('subscriptions')
          .update({ stripe_id: customerId, sub_type: SubTypeID })
          .eq('user_id', userId)

        if (updateError) {
          console.error('Error updating subscription:', updateError.message)
          return NextResponse.json(
            { error: 'Subscription update failed' },
            { status: 500 },
          )
        }

        console.log('Updated existing subscription')
      } else {
        // Insert new subscription
        const { error: insertError } = await supabase
          .from('subscriptions')
          .insert([{ user_id: userId, sub_type: SubTypeID }])

        if (insertError) {
          console.error('Error inserting subscription:', insertError.message)
          return NextResponse.json(
            { error: 'Subscription insert failed' },
            { status: 500 },
          )
        }

        console.log('Inserted new subscription')
      }

      return NextResponse.json({ received: true })
    } catch (err: any) {
      console.error('Unexpected DB error:', err.message)
      return NextResponse.json({ error: 'Internal error' }, { status: 500 })
    }
  } else if (event.type === 'invoice.payment_failed') {
    console.log('Payment failed event received:', event.id)

    const session = event.data.object as Stripe.Checkout.Session

    const customerId = session.customer as string
    const userId = session.metadata?.userId

    console.log('Customer ID from webhook:', customerId)
    console.log('User ID from metadata:', userId)

    if (!customerId || !userId) {
      console.error('Missing customerId or userId in webhook event')
      return NextResponse.json(
        { error: 'Missing customerId or userId' },
        { status: 400 },
      )
    }

    try {
      const { error: updateError } = await supabase
        .from('subscriptions')
        .update({ status: 'past due' })
        .eq('user_id', userId)

      if (updateError) {
        console.error('Error updating subscription:', updateError.message)
        return NextResponse.json(
          { error: 'Subscription update failed' },
          { status: 500 },
        )
      }
    } catch (err: any) {
      console.error('Error handling payment failure:', err.message)
      return NextResponse.json({ error: 'Internal error' }, { status: 500 })
    }

    return NextResponse.json({ received: true })
  } else if (event.type === 'customer.subscription.deleted') {
    console.log('Payment failed event received:', event.id)

    const session = event.data.object as Stripe.Checkout.Session

    const customerId = session.customer as string
    const userId = session.metadata?.userId

    console.log('Customer ID from webhook:', customerId)
    console.log('User ID from metadata:', userId)

    if (!customerId || !userId) {
      console.error('Missing customerId or userId in webhook event')
      return NextResponse.json(
        { error: 'Missing customerId or userId' },
        { status: 400 },
      )
    }

    try {
      const { error: updateError } = await supabase
        .from('subscriptions')
        .update({ status: 'Canceled' })
        .eq('user_id', userId)

      if (updateError) {
        console.error('Error updating subscription:', updateError.message)
        return NextResponse.json(
          { error: 'Subscription update failed' },
          { status: 500 },
        )
      }
    } catch (err: any) {
      console.error('Error handling payment failure:', err.message)
      return NextResponse.json({ error: 'Internal error' }, { status: 500 })
    }

    console.log('Subscription cancelled event received:', event.id)
    return NextResponse.json({ received: true })
  } else {
    console.log('Unhandled event type:', event.type)
    return NextResponse.json({ received: true })
  }
}
