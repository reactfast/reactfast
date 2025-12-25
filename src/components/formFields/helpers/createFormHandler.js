import { applyModifierType } from './applyModifierType'

/**
 * createFormHandler - generic onChange handler for dynamic forms
 * Applies modifiers automatically
 *
 * @param {Function} setState - React setState function
 * @param {Array} fields - array of field definitions (JSON schema)
 */
export function createFormHandler({ setState, fields = [] }) {
  return function handleChange(eOrValue, fieldName) {
    let name, value, type, checked, files

    // Detect React synthetic event vs direct call
    if (eOrValue?.target) {
      const e = eOrValue
      name = e.target.name
      value = e.target.value
      type = e.target.type
      checked = e.target.checked
      files = e.target.files
    } else {
      name = fieldName
      value = eOrValue
    }

    if (type === 'checkbox') value = checked
    if (type === 'file') value = files?.[0] ?? value

    setState((prev) => {
      const newData = { ...prev, [name]: value }

      const fieldDef = fields.find((f) => f.name === name)

      // Apply array-based modifiers if they exist
      if (fieldDef?.modifiers?.length) {
        fieldDef.modifiers.forEach((modifier) => {
          const {
            target,
            type,
            kind = 'number',
            when,
            value: ruleValue,
            strictString = false,
          } = modifier

          if (evaluateCondition(value, when, ruleValue)) {
            const targetVal = strictString
              ? String(newData[target] || '')
              : Number(newData[target] || 0)
            const modVal = strictString ? String(ruleValue) : Number(ruleValue)

            newData[target] = applyModifierType({
              type,
              kind,
              targetValue: targetVal,
              modifierValue: modVal,
            })
          }
        })
      }

      return newData
    })
  }
}

/**
 * evaluateCondition - check if the modifier should apply
 * @param {any} triggerValue
 * @param {string} when - condition type ("true", "false", "less than", "greater than", "between", "matches")
 * @param {any} value - value to compare (or array for "between", regex for "matches")
 */
export function evaluateCondition(triggerValue, when, value) {
  const numeric = Number(triggerValue)
  switch (when) {
    case 'true':
      return !!triggerValue
    case 'false':
      return !triggerValue
    case 'less than':
      return numeric < Number(value)
    case 'greater than':
      return numeric > Number(value)
    case 'equal':
      return numeric === Number(value)
    case 'not equal':
      return numeric !== Number(value)
    case 'between':
      return numeric >= Number(value[0]) && numeric <= Number(value[1])
    case 'matches':
      return new RegExp(value).test(triggerValue)
    default:
      return false
  }
}
