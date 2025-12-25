import { v4 as uuidv4 } from 'uuid'
import { getUser } from '@/hooks/Auth'

// Helper to check if localStorage is available
const isLocalStorageAvailable = () =>
  typeof window !== 'undefined' && typeof localStorage !== 'undefined'

// Helper to get the cart from localStorage
const getCart = () => {
  if (!isLocalStorageAvailable()) {
    console.error('localStorage is not available.')
    return null
  }

  const cart = localStorage.getItem('jot-vendor-cart')
  return cart ? JSON.parse(cart) : { items: [] } // Return an empty cart if not found
}

// Helper to save the cart to localStorage
const saveCart = (cart) => {
  if (!isLocalStorageAvailable()) {
    console.error('localStorage is not available.')
    return
  }

  localStorage.setItem('jot-vendor-cart', JSON.stringify(cart))
}

// Function to add an item to the cart
const addToCart = (item) => {
  const cart = getCart()

  if (!cart) {
    console.error('Cart not initialized.')
    return
  }

  // Check if the item already exists in the cart
  const existingItem = cart.items.find((cartItem) => cartItem.id === item.id)

  if (existingItem) {
    // If it exists, update the quantity
    existingItem.quantity += item.quantity || 1
  } else {
    // Add the new item to the cart
    cart.items.push({ ...item, quantity: item.quantity || 1 })
  }

  saveCart(cart)
  console.log('Item added to cart:', item)
}

// Function to remove an item from the cart
const removeFromCart = (itemId) => {
  const cart = getCart()

  if (!cart) {
    console.error('Cart not initialized.')
    return
  }

  // Filter out the item to remove it from the cart
  cart.items = cart.items.filter((item) => item.id !== itemId)

  saveCart(cart)
  console.log('Item removed from cart:', itemId)
}

// Function to update the quantity of an item in the cart
const updateQuantity = (itemId, newQuantity) => {
  const cart = getCart()

  if (!cart) {
    console.error('Cart not initialized.')
    return
  }

  // Find the item and update its quantity
  const item = cart.items.find((cartItem) => cartItem.id === itemId)

  if (item) {
    if (newQuantity <= 0) {
      // Remove the item if the new quantity is 0 or less
      cart.items = cart.items.filter((cartItem) => cartItem.id !== itemId)
      console.log('Item removed due to quantity 0:', itemId)
    } else {
      // Update the item's quantity
      item.quantity = newQuantity
      console.log('Item quantity updated:', { itemId, newQuantity })
    }

    saveCart(cart)
  } else {
    console.error('Item not found in cart:', itemId)
  }
}

// Function to get the count of unique items in the cart
const getUniqueItemCount = () => {
  const cart = getCart()

  if (!cart) {
    console.error('Cart not initialized.')
    return 0
  }

  return cart.items.length
}

const initializeCart = () => {
  const existingCart = localStorage.getItem('jot-vendor-cart')

  if (existingCart) {
    return
  }

  // Check for an authenticated user
  const user = getUser()
  const userId = user?.id || uuidv4() // Use authenticated user's ID or generate a UUID

  // Create the cart object
  const newCart = {
    customerId: userId,
    items: [], // Initialize with an empty items array
  }

  // Save the cart in localStorage
  localStorage.setItem('jot-vendor-cart', JSON.stringify(newCart))
}

// Export all functions
export {
  getCart,
  saveCart,
  addToCart,
  removeFromCart,
  updateQuantity,
  getUniqueItemCount,
  initializeCart,
}
