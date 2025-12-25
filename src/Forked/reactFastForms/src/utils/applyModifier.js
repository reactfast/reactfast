/**
 * Apply a field’s modifiers based on its value
 * Converts value to number first, applies modifier, returns string
 * @param {Object} field - Field object with optional modifiers
 * @param {string} value - Current value of the field
 * @param {Object} context - Optional: subtotal or other context
 * @returns {string} - Result after modifier applied
 */
export function applyModifier(field, value, context = {}) {
  if (!field?.modifiers?.price) return '0'

  const priceRules = field.modifiers.price
  const numericValue = Number(value) || 0
  let result = 0

  // 1️⃣ Exact value rules (select/boolean)
  if (typeof value === 'string' || typeof value === 'boolean') {
    const key = value === true ? 'true' : value === false ? 'false' : value
    if (priceRules[key] != null) {
      result = resolvePriceRule(priceRules[key], numericValue, context)
      return String(result)
    }
  }

  // 2️⃣ ifPresent rule
  if (value && priceRules.ifPresent != null) {
    result = resolvePriceRule(priceRules.ifPresent, numericValue, context)
    return String(result)
  }

  // 3️⃣ perChar pricing
  if (typeof value === 'string' && priceRules.perChar != null) {
    const freeChars = priceRules.freeChars || 0
    const extraChars = Math.max(value.length - freeChars, 0)
    result = extraChars * Number(priceRules.perChar)
    return String(result)
  }

  // 4️⃣ numeric shorthand (legacy)
  if (typeof priceRules === 'number') return String(priceRules)

  return '0'
}

/**
 * Resolve a single price rule
 * @param {number|object} rule
 * @param {number} value - numeric value
 * @param {Object} context
 * @returns {number} - number result
 */
function resolvePriceRule(rule, value, context) {
  if (typeof rule === 'number') return rule
  if (rule.flat != null) return Number(rule.flat)
  if (rule.percent != null) {
    // apply percent to numeric value or subtotal
    const base = Number(context.subtotal || value)
    return (base * Number(rule.percent)) / 100
  }
  return 0
}
