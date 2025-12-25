'use client'

import React from 'react'
import getStripe from '@/lib/getStripe' // Adjust the path based on your project structure

const SubscribeButton = ({ priceId, userId, subTypeID }) => {
  console.log('priceId:', priceId)
  console.log('userId:', userId)
  const handleSubscription = async () => {
    try {
      // Call the backend API to create a subscription checkout session
      const response = await fetch('/api/subscription-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId, userId, subTypeID }), // Send the price ID to the backend
      })

      const data = await response.json()

      if (data.sessionId) {
        // Load the Stripe instance using the getStripe utility
        const stripe = await getStripe()
        if (stripe) {
          const { error } = await stripe.redirectToCheckout({
            sessionId: data.sessionId,
          })

          if (error) {
            console.error('Error during Stripe Checkout redirection:', error)
          }
        } else {
          console.error('Stripe failed to load.')
        }
      } else {
        console.error('Failed to create Stripe Checkout session')
      }
    } catch (error) {
      console.error('Error creating subscription:', error)
    }
  }

  return (
    <button
      onClick={handleSubscription}
      className="bg-secondary font-semibold text-white hover:brightness-[90%] hover:saturate-[110%]"
      style={{
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
      }}
    >
      Subscribe Now
    </button>
  )
}

export default SubscribeButton
