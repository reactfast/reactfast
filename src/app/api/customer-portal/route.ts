// /app/api/customer-portal/route.ts
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
})

export async function POST(req: NextRequest) {
  try {
    const { customerId } = await req.json() // Get the Stripe Customer ID from the request body

    // Create a session for the customer portal
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId, // Stripe Customer ID
      return_url: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000', // Redirect after portal
    })

    return NextResponse.json({ url: portalSession.url })
  } catch (error: any) {
    console.error('Error creating customer portal session:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
