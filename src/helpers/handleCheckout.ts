import getStripe from '@/lib/getStripe'

const handleCheckout = async (items) => {
  const response = await fetch('/api/checkout-sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ items }),
  })

  const { sessionId } = await response.json()
  const stripe = await getStripe()
  await stripe?.redirectToCheckout({ sessionId })
}
