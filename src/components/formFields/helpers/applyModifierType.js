export function applyModifierType({
  type,
  kind,
  targetValue,
  modifierValue,
  strictString = false,
}) {
  let result = targetValue

  const isNumericModifier = typeof modifierValue === 'number' && !strictString

  if (isNumericModifier) {
    const targetNum = Number(targetValue) || 0
    const modNum = Number(modifierValue)

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
    }

    if (kind === 'percent') result = (targetNum * modNum) / 100
  } else {
    // String handling
    switch (type) {
      case 'concat':
      case 'add': // if both strings, treat add as concat
        result = String(targetValue) + String(modifierValue)
        break
      case 'replace':
        result = String(modifierValue)
        break
    }
  }

  return String(result)
}
