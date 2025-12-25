export function convertIsoToReadableDate(isoTimestamp) {
  try {
    const date = new Date(isoTimestamp)
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return date.toLocaleDateString(undefined, options)
  } catch (error) {
    return 'Invalid ISO 8601 timestamp'
  }
}
