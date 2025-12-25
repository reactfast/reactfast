// src/ReturnFieldsV2.js
import React from "react";
import { getField } from "./core/fieldRegistry.js";

const defaultTheme = {
  title: "#000",
  label: "#111",
  inputText: "#000",
  inputBackground: "#fff",
  inputBorder: "#ebebeb",
  inputPlaceholder: "#888",
  inputFocusBorder: "#020DF9",
  description: "#555",
  error: "#ff0000",
  requiredAsterisk: "#020DF9",

  // Rating-specific
  ratingActive: "#020DF9",
  ratingInactive: "#8e8e8eff",
  ratingHover: "#5555ff",
};

export function ReturnFieldsV2({ field, onChange, value, theme }) {
  if (!field || !field.type) return null;

  const mergedTheme = { ...defaultTheme, ...(theme || {}) };

  const handleCustomChange = (eOrValue) => {
    if (!onChange) return;
    // If a real/synthetic event is passed through from a field, forward it directly
    if (eOrValue && eOrValue.target) {
      onChange(eOrValue);
      return;
    }
    // Otherwise, normalize to a synthetic event-like shape
    onChange({
      target: {
        name: field.name,
        value: eOrValue,
      },
    });
  };

  const renderField = (subField, subValue, index, handleChange) => {
    return (
      <ReturnFieldsV2
        key={index}
        field={subField}
        value={subValue}
        onChange={(newVal) => handleChange(newVal, index)}
        theme={mergedTheme}
      />
    );
  };

  // Look up the field component from the registry
  const FieldComponent = getField(field.type);

  if (!FieldComponent) return null;

  // Special handling for subForm/array to pass subfields
  if (field.type === "subForm" || field.type === "array") {
    return (
      <FieldComponent
        field={field}
        fields={field.fields}
        value={Array.isArray(value) ? value : []}
        title={field.title || field.name}
        onSave={(newVal) => handleCustomChange(newVal)}
        renderField={renderField} // pass renderField for nested recursion
        theme={mergedTheme}
      />
    );
  }

  // For simple fields, just render the component
  return (
    <FieldComponent
      field={field}
      value={value}
      onChange={handleCustomChange}
      theme={mergedTheme}
    />
  );
}
