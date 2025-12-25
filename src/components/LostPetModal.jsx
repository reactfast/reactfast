'use client'

import Modal from '@/components/modal'
import getStripe from '@/lib/getStripe'
import { supabaseClient as supabase } from '@/config/supabase-client'

export default function ProUpgradePrompt({
  petName = 'your pet',
  open,
  setOpen,
  userId,
}) {
  const handlePurchase = async () => {
    try {
      // 1️⃣ Prepare order data
      const cartItems = [
        {
          id: 'upgrade-2wk',
          name: `2-Week Protection for ${petName}`,
          quantity: 1,
          price: 29.99,
        },
      ]
      const total_paid = 29.99

      // 2️⃣ Create pending order in Supabase
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert([
          {
            user_id: userId,
            user_email: null, // you could optionally collect guest email if needed
            items: cartItems,
            total_paid,
            status: 'pending',
          },
        ])
        .select()
        .single()

      if (orderError || !orderData) {
        console.error('Error creating order:', orderError)
        alert('Failed to create order. Please try again.')
        return
      }

      const order_id = orderData.id

      // 3️⃣ Create Stripe checkout session
      const response = await fetch('/api/checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            ...item,
            price: item.price * 100, // convert dollars to cents
          })),
          user_id: userId,
          total_paid,
          order_id, // attach order ID so webhook can update
        }),
      })

      const data = await response.json()

      if (data.sessionId) {
        const stripe = await getStripe()
        await stripe.redirectToCheckout({ sessionId: data.sessionId })
      } else {
        console.error('Failed to create checkout session:', data.error)
        alert('Failed to start checkout. Please try again.')
      }
    } catch (err) {
      console.error('Error in purchase flow:', err)
      alert('An unexpected error occurred. Please try again.')
    } finally {
      setOpen(false)
    }
  }

  return (
    <div className="flex justify-center">
      <Modal open={open} setOpen={setOpen} title="Protect Your Pet" size="md">
        <div className="space-y-4 text-gray-700">
          <p className="text-sm">
            Make sure <span className="font-semibold">{petName}</span> has the
            best chance of getting home safe.
          </p>

          <ul className="list-disc space-y-1 pl-5 text-sm">
            <li>
              <strong>Real-time scan alerts</strong> when someone scans their
              Boop tag
            </li>
            <li>
              <strong>Geolocation access</strong> for 2 weeks — know where your
              pet was last seen
            </li>
            <li>
              <strong>Instant contact info</strong> available to rescuers
            </li>
          </ul>

          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm">
            <p className="font-semibold">Special Offer:</p>
            <p>$29.99 for 2 weeks of coverage</p>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <button
              onClick={() => setOpen(false)}
              className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-100"
            >
              Maybe Later
            </button>
            <button
              onClick={handlePurchase}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white shadow transition hover:bg-blue-700"
            >
              Buy 2 Weeks
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
