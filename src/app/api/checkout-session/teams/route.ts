import { NextRequest, NextResponse } from 'next/server'
import stripe from '@/lib/stripe'

export async function POST(req: NextRequest) {
  try {
    const { basePriceId, seatPriceId, seatCount, includedSeats, userId } =
      await req.json()

    if (
      !userId ||
      !basePriceId ||
      !seatPriceId ||
      !seatCount ||
      !includedSeats
    ) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 },
      )
    }

    const extraSeats = Math.max(seatCount - includedSeats, 0)

    const line_items: { price: string; quantity: number }[] = [
      {
        price: basePriceId,
        quantity: 1,
      },
    ]

    if (extraSeats > 0) {
      line_items.push({
        price: seatPriceId,
        quantity: extraSeats,
      })
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/subscription-success/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel-sub-checkout`,
      metadata: {
        userId,
        type: 'teams',
        seatCount: String(seatCount),
        includedSeats: String(includedSeats),
        extraSeats: String(extraSeats),
      },
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error: any) {
    console.error('Error creating Teams checkout session:', error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
