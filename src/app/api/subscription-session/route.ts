import { NextRequest, NextResponse } from 'next/server'
import stripe from '@/lib/stripe'

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const { priceId, userId } = await req.json()

    if (!priceId || !userId) {
      return NextResponse.json(
        { error: 'Missing required parameters: priceId or userId' },
        { status: 400 },
      )
    }

    // Create the Checkout session with metadata
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/subscription-success/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel-sub-checkout`,
      metadata: {
        userId, // Attach your internal user ID
      },
    })

    // Log the customer ID for debugging (may be null at this stage)
    const customerId = session.customer
    console.log(
      'Customer ID (may be null before session completion):',
      customerId,
    )

    return NextResponse.json({ sessionId: session.id })
  } catch (error: any) {
    console.error('Error creating Stripe Checkout session:', error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
