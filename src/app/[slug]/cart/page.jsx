'use client'
import { useEffect, useState } from 'react'
import { CheckIcon, ClockIcon } from '@heroicons/react/20/solid'
import {
  getCart,
  saveCart,
  removeFromCart,
  updateQuantity,
} from '@/helpers/vendorCart'
import Link from 'next/link'
import getStripe from '@/lib/getStripe'
import { getUser } from '@/hooks/Auth'

function handleRemove(id) {
  removeFromCart(id)
  window.location.reload()
}

export default function CartView() {
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0)
  const [shipping, setShipping] = useState(0)

  useEffect(() => {
    const cart = getCart() || { items: [] }
    setProducts(cart.items)

    const total = cart.items.reduce(
      (acc, item) => acc + parseFloat(item.price || 0) * (item.quantity || 1),
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
      (acc, item) => acc + parseFloat(item.price || 0) * (item.quantity || 1),
      0,
    )
    setTotal(newTotal)
  }

  const handleCheckout = async () => {
    // Get user info (modify based on your authentication system)
    const user_id = getUser()
    let guest_email = null

    if (!user_id) {
      // If no user_id, prompt for an email (modify based on your UI flow)
      guest_email = prompt('Enter your email for order confirmation:')
      if (!guest_email) {
        alert('Email is required for guest checkout.')
        return
      }
    }

    // Prepare cart items
    const cartItems = products.map((product) => ({
      id: product.id,
      name: product.name,
      quantity: product.quantity,
      price: (product.price * 100).toFixed(0), // Convert to cents
    }))

    // Calculate total price
    const total_paid =
      cartItems.reduce(
        (acc, item) => acc + parseInt(item.price) * item.quantity,
        0,
      ) / 100 // Convert back to dollars

    try {
      const response = await fetch('/api/checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cartItems,
          user_id,
          guest_email,
          total_paid,
        }),
      })

      const data = await response.json()

      if (data.sessionId) {
        const stripe = await getStripe()
        await stripe.redirectToCheckout({ sessionId: data.sessionId })
      } else {
        console.error('Failed to create checkout session:', data.error)
      }
    } catch (error) {
      console.error('Error creating checkout session:', error)
    }
  }

  return (
    <div className="min-h-[100vh] bg-white">
      <main>
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-0">
          <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Shopping Cart
          </h1>

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
                      <img
                        alt={product.imageAlt}
                        src={product.imageSrc}
                        className="size-24 rounded-md object-cover sm:size-32"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col sm:ml-6">
                      <div>
                        <div className="flex justify-between">
                          <h4 className="text-sm">
                            <a
                              href={product.href}
                              className="font-medium text-gray-700 hover:text-gray-800"
                            >
                              {product.name}
                            </a>
                          </h4>
                          <p className="ml-4 text-sm font-medium text-gray-900">
                            ${(product.price * product.quantity).toFixed(2)}
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
                  <button
                    onClick={handleCheckout}
                    type="button"
                    className="w-full rounded-md bg-indigo-600 px-4 py-3 text-white hover:bg-indigo-700"
                  >
                    Checkout
                  </button>
                </div>
              </section>
            )}
          </form>
        </div>
      </main>
    </div>
  )
}
