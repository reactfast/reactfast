export function applyModifierType({
  type,
  kind,
  targetValue,
  modifierValue,
  strictString = false,
  sourceFields,
}) {
  // Handle sourceFields array for concat operations
  if (type === 'concat' && Array.isArray(sourceFields)) {
    let concatResult = ''
    sourceFields.forEach((source) => {
      const fieldValue = String(source.fieldValue || '')
      concatResult += (source.charBefore || '') + fieldValue + (source.charAfter || '')
    })
    return concatResult
  }

  // Auto-detect if we should do math operations
  const isNumericValue = typeof modifierValue === 'number'
  const shouldDoMath = isNumericValue && strictString !== true

  if (shouldDoMath) {
    // Math operations - convert target to number, do math, return as string
    const targetNum = Number(targetValue) || 0
    const modNum = Number(modifierValue)

    let result
    switch (type) {
      case 'add':
        result = targetNum + modNum
        break
      case 'subtract':
        result = targetNum - modNum
        break
      case 'multiply':
        result = targetNum * modNum
        break
      case 'divide':
        result = targetNum / modNum
        break
      case 'replace':
        result = modNum
        break
      case 'concat':
        // If concat with number, treat as add
        result = targetNum + modNum
        break
    }

    if (kind === 'percent') result = (targetNum * modNum) / 100

    return String(result)
  } else {
    // String operations - keep existing logic
    let result = targetValue

    switch (type) {
      case 'concat':
      case 'add': // if both strings, treat add as concat
        result = String(targetValue) + String(modifierValue)
        break
      case 'replace':
        result = String(modifierValue)
        break
      case 'subtract':
      case 'multiply':
      case 'divide':
        // For string operations, these don't make sense, just return target
        result = String(targetValue)
        break
    }

    return String(result)
  }
}
