import { applyModifierType } from '../utils/applyModifierType'

/**
 * createFormHandler - generic onChange handler for dynamic forms
 * Applies modifiers automatically
 *
 * @param {Function} setState - React setState function
 * @param {Array} fields - array of field definitions (JSON schema)
 */
export function createFormHandler({ setState, fields = [], rules = [] }) {
  
  const ruleNameToRule = Array.isArray(rules)
    ? rules.reduce((acc, r) => {
        if (r?.name) acc[r.name] = r
        return acc
      }, {})
    : {}

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
      let newData = { ...prev, [name]: value }

      const fieldDef = fields.find((f) => f.name === name)

      // Legacy per-field modifiers (backward compatible)
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

          if (!target) return

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
              strictString,
            })
          }
        })
      }

      // New top-level rules triggered by field-level triggers
      const triggers = Array.isArray(fieldDef?.triggers) ? fieldDef.triggers : []
      triggers.forEach((trigger) => {
        const ruleName = trigger?.rule
        if (!ruleName) return
        const rule = ruleNameToRule[ruleName]
        if (!rule) return

        // Simplified trigger condition - no need for field property since we know which field triggered
        const whenCondition = trigger.when
        const isActive = evaluateCondition(value, whenCondition, trigger.value)
        if (!isActive) return

        // Apply rule effects that target field values
        const effects = Array.isArray(rule.effects) ? rule.effects : []
        effects.forEach((effect) => {
          const { targetField, prop = 'value', type, kind = 'number', value: effVal, strictString = false, sourceFields } = effect
          if (!targetField) return
          if (prop !== 'value') return // only values handled here; attributes handled in renderer

          // Prepare sourceFields with actual field values for concat operations
          let processedSourceFields = null
          if (type === 'concat' && Array.isArray(sourceFields)) {
            processedSourceFields = sourceFields.map(source => ({
              ...source,
              fieldValue: newData[source.field] || ''
            }))
          }

          // Get current value of the target field
          const currentTarget = newData[targetField] || ''
          const targetVal = strictString
            ? String(currentTarget)
            : Number(currentTarget) || 0
          
          // Use the effect value
          const modVal = strictString ? String(effVal) : Number(effVal)
          
          newData[targetField] = applyModifierType({
            type,
            kind,
            targetValue: targetVal,
            modifierValue: modVal,
            strictString,
            sourceFields: processedSourceFields,
          })
        })
      })

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
    case 'empty':
      return !triggerValue || triggerValue === '' || triggerValue === null || triggerValue === undefined
    case 'not empty':
      return triggerValue && triggerValue !== '' && triggerValue !== null && triggerValue !== undefined
    case 'null':
      return triggerValue === null || triggerValue === undefined
    case 'not null':
      return triggerValue !== null && triggerValue !== undefined
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
