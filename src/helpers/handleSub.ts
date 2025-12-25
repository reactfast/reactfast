import getStripe from '@/lib/getStripe'

const handleSubscription = async (priceId) => {
  const response = await fetch('/api/subscription-sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ priceId }),
  })

  const { sessionId } = await response.json()
  const stripe = await getStripe()
  await stripe?.redirectToCheckout({ sessionId })
}
