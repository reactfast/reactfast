'use client'
import { useEffect, useState } from 'react'
import { CheckIcon, ClockIcon } from '@heroicons/react/20/solid'
import {
  getCart,
  saveCart,
  removeFromCart,
  updateQuantity,
} from '@/helpers/cart'
import Link from 'next/link'
import getStripe from '@/lib/getStripe'
import { gracefulGetUser } from '@/hooks/Auth'
import Modal from '@/components/modal'
import { supabaseClient as supabase } from '@/config/supabase-client'

function handleRemove(id) {
  removeFromCart(id)
  window.location.reload()
}

export default function CartView() {
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0)
  const [shipping, setShipping] = useState(0)
  const [userInfo, setUserInfo] = useState(null)
  const [guestEmail, setGuestEmail] = useState('')
  const [guestEmailModalOpen, setGuestEmailModalOpen] = useState(false)

  useEffect(() => {
    try {
      async function _getUser() {
        const user = await gracefulGetUser()
        console.log('User info:', user)
        setUserInfo(user)
      }

      _getUser()
    } catch (error) {
      console.error('Error fetching user info:', error)
    }
  }, [])

  useEffect(() => {
    const cart = getCart() || { items: [] }
    setProducts(cart.items)

    const total = cart.items.reduce(
      (acc, item) =>
        acc + parseFloat(item.data.price || 0) * (item.quantity || 1),
      0,
    )
    setTotal(total)

    const costPerOunce = 0.5
    const shipping = cart.items.reduce((acc, item) => {
      const weightInOunces = item.weight || 0
      return acc + weightInOunces * costPerOunce
    }, 0)
    setShipping(shipping)
  }, [])

  const handleQuantityChange = (id, newQuantity) => {
    const updatedProducts = products.map((product) => {
      if (product.id === id) {
        return { ...product, quantity: newQuantity }
      }
      return product
    })
    setProducts(updatedProducts)

    updateQuantity(id, newQuantity)

    const newTotal = updatedProducts.reduce(
      (acc, item) =>
        acc + parseFloat(item.data.price || 0) * (item.quantity || 1),
      0,
    )
    setTotal(newTotal)
  }

  const handleCheckout = async () => {
    try {
      // Get user info (modify based on your authentication system)
      const user_id = userInfo ? userInfo.user.id : null
      const guest_email = guestEmail || null

      // Prepare cart items
      const cartItems = products.map((product) => ({
        id: product.id,
        name: product.name,
        quantity: product.quantity,
        price: (product.data.price * 100).toFixed(0), // Convert to cents
      }))

      // Calculate total price in dollars
      const total_paid =
        cartItems.reduce(
          (acc, item) => acc + parseInt(item.price) * item.quantity,
          0,
        ) / 100

      if (!cartItems.length) {
        alert('Your cart is empty.')
        return
      }

      // 1️⃣ Create pending order in Supabase
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert([
          {
            user_id,
            user_email: guest_email,
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

      // 2️⃣ Create Stripe checkout session
      const response = await fetch('/api/checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cartItems,
          user_id,
          guest_email,
          total_paid,
          order_id, // Pass the order ID to Stripe metadata
        }),
      })

      const sessionData = await response.json()

      if (!sessionData.sessionId) {
        console.error('Failed to create checkout session:', sessionData.error)
        alert('Failed to start checkout. Please try again.')
        return
      }

      // 3️⃣ Redirect to Stripe checkout
      const stripe = await getStripe()
      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionData.sessionId,
      })

      if (error) {
        console.error('Stripe redirect error:', error)
        alert('Failed to redirect to Stripe checkout.')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('An unexpected error occurred. Please try again.')
    }
  }

  if (!products) {
    return (
      <div className="flex h-full flex-col items-center justify-center py-10">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Loading...</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white">
      <main>
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-0">
          <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Shopping Cart
          </h1>
          <hr />
          <div className="mt-10 w-full">
            <Link href={'/shop/category/all'}>
              <button
                type="button"
                className="mx-auto block rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
              >
                Continue Shopping
              </button>
            </Link>
          </div>

          <form className="mt-12">
            <section aria-labelledby="cart-heading">
              <ul className="divide-y divide-gray-200 border-b border-t border-gray-200">
                {products.length === 0 && (
                  <div className="flex h-full flex-col items-center justify-center py-10">
                    <div className="text-center">
                      <h1 className="text-2xl font-bold text-gray-800">
                        Your cart is empty
                      </h1>
                      <Link href="/shop/category/all">
                        <div className="mt-6 inline-block rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700">
                          Start Shopping
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
                {products.map((product) => (
                  <li key={product.id} className="flex py-6">
                    <div className="shrink-0">
                      <Link
                        href={`/shop/category/${product.category || 'all'}/${product.id}`}
                      >
                        <img
                          alt={product.imageAlt}
                          src={product.imageSrc}
                          className="size-24 rounded-md object-cover sm:size-32"
                        />
                      </Link>
                    </div>

                    <div className="ml-4 flex flex-1 flex-col sm:ml-6">
                      <div>
                        <div className="flex justify-between">
                          <h4 className="text-sm">
                            <a
                              href={`/shop/category/${product.category || 'all'}/${product.id}`}
                              className="font-medium text-gray-700 hover:text-gray-800"
                            >
                              {product.name}
                            </a>
                          </h4>
                          <p className="ml-4 text-sm font-medium text-gray-900">
                            $
                            {(product.data.price * product.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-1 items-end justify-between">
                        <p className="flex items-center space-x-2 text-sm text-gray-700">
                          {product.inStock ? (
                            <CheckIcon className="size-5 shrink-0 text-green-500" />
                          ) : (
                            <ClockIcon className="size-5 shrink-0 text-gray-300" />
                          )}
                          <span>
                            {product.inStock
                              ? 'In stock'
                              : `Will ship in ${product.leadTime}`}
                          </span>
                        </p>

                        <div className="flex items-center space-x-2">
                          <input
                            type="number"
                            min="1"
                            value={product.quantity || 1}
                            onChange={(e) =>
                              handleQuantityChange(
                                product.id,
                                parseInt(e.target.value, 10),
                              )
                            }
                            className="w-16 rounded-md border border-gray-300 p-1 text-center"
                          />
                          <button
                            onClick={() => handleRemove(product.id)}
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {products.length > 0 && (
              <section aria-labelledby="summary-heading" className="mt-10">
                <div>
                  <dl className="space-y-4">
                    <div className="flex items-center justify-between">
                      <dt className="text-base font-medium text-gray-900">
                        Subtotal
                      </dt>
                      <dd className="ml-4 text-base font-medium text-gray-900">
                        ${total.toFixed(2)}
                      </dd>
                    </div>
                  </dl>
                  <p className="mt-1 text-sm text-gray-500">
                    Shipping and taxes will be calculated at checkout.
                  </p>
                </div>

                <div className="mt-10">
                  {!userInfo ? (
                    <div className="items-center justify-between text-center">
                      <button
                        onClick={() => {
                          setGuestEmailModalOpen(true)
                        }}
                        type="button"
                        className="w-full rounded-md bg-indigo-600 px-4 py-3 text-white hover:bg-indigo-700"
                      >
                        Guest Checkout
                      </button>
                      <p>or</p>
                      <button
                        onClick={() => {
                          const redirect = encodeURIComponent('/shop/cart')
                          window.location.href = `/login?redirect=${redirect}`
                        }}
                        type="button"
                        className="w-full rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      >
                        Login
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={handleCheckout}
                      type="button"
                      className="w-full rounded-md bg-indigo-600 px-4 py-3 text-white hover:bg-indigo-700"
                    >
                      Checkout
                    </button>
                  )}
                </div>
              </section>
            )}
          </form>
        </div>
        <Modal
          open={guestEmailModalOpen}
          setOpen={() => setGuestEmailModalOpen(false)}
          title="Guest Checkout"
          size="md"
        >
          <div className="p-6">
            <p className="text-gray-700">
              Please enter your email to proceed with guest checkout.
            </p>
            <input
              type="email"
              placeholder="Email"
              value={guestEmail}
              onChange={(e) => setGuestEmail(e.target.value)}
              required
              className="mt-4 w-full rounded-md border border-gray-300 p-2"
            />
            <button
              onClick={handleCheckout}
              className="mt-4 w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
            >
              Checkout as Guest
            </button>
          </div>
        </Modal>
      </main>
    </div>
  )
}
