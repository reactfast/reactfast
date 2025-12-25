// core/fieldRegistry.js
const fieldRegistry = {}

export function registerField(type, component) {
  fieldRegistry[type] = component
}

export function getField(type) {
  return fieldRegistry[type]
}

export function getAllFields() {
  return { ...fieldRegistry }
}