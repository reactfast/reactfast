export function initializeFormData(fields, existingData = {}) {
  const withDefaults = fields.reduce((acc, field) => {
    if (field.default !== undefined) {
      acc[field.name] = field.default
    }
    return acc
  }, {})

  return { ...withDefaults, ...existingData }
}
