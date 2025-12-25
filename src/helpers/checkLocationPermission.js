export async function checkGeolocationPermission() {
  if (typeof window === 'undefined' || !navigator.permissions) return null

  try {
    const result = await navigator.permissions.query({ name: 'geolocation' })
    return result.state // 'granted', 'prompt', or 'denied'
  } catch (err) {
    console.error('Error checking geolocation permission:', err)
    return null
  }
}
