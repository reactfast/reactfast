"use client";

import { useState } from "react";
import { ExclamationCircleIcon, StarIcon } from "@heroicons/react/16/solid";
import ReturnIcon from "../utils/returnHeroIcon.jsx";

/**
 * @typedef {import('index').NovaForms.RatingInputProps} RatingInputProps
 */

/**
 * @param {RatingInputProps} props
 * 
 * @returns {JSX.Element}
 */
export default function RatingInput({ field, value, onChange, theme }) {
  const {
    name,
    title,
    description,
    required,
    helper,
    max = 5, // default rating scale
    icon = "StarIcon", // default icon (must match one in ReturnSecIcon)
  } = field;

  const [error, setError] = useState(null);
  const [hoverValue, setHoverValue] = useState(null);

  const hasError = Boolean(error);

  const handleSelect = (val) => {
    if (required && val === 0) {
      setError("Rating is required");
    } else {
      setError(null);
    }
    onChange({ target: { name, value: val } });
  };

  const renderIcon = (index) => {
    const isFilled = hoverValue
      ? index <= hoverValue // while hovering
      : index <= (value || 0); // after click

    let color;
    if (hoverValue) {
      color = index <= hoverValue ? theme.inputFocusBorder : theme.inputBorder;
    } else {
      color = isFilled ? theme.inputBackground : theme.inputBorder;
    }

    const Icon = icon === "StarIcon" ? StarIcon : ReturnIcon;

    return (
      <button
        key={index}
        type="button"
        onClick={() => handleSelect(index)}
        onMouseEnter={() => setHoverValue(index)}
        onMouseLeave={() => setHoverValue(null)}
        className="p-1"
        aria-label={`Rate ${index} out of ${max}`}
      >
        {icon === "StarIcon" ? (
          <Icon className="h-6 w-6" style={{ color }} />
        ) : (
          <ReturnIcon name={icon} color={color} />
        )}
      </button>
    );
  };

  return (
    <div>
      {/* Label */}
      {title && (
        <div className="mb-1 flex justify-between">
          <label
            htmlFor={name}
            style={{ color: theme.label }}
            className="block text-sm/6 font-medium"
          >
            {title}
            {required && (
              <span style={{ color: theme.requiredAsterisk }}> *</span>
            )}
          </label>
          {!required && !hasError && (
            <span style={{ color: theme.description }} className="text-sm/6">
              Optional
            </span>
          )}
        </div>
      )}

      {helper && (
        <p style={{ color: theme.description }} className="mb-1 text-xs">
          {helper}
        </p>
      )}

      {/* Icons */}
      <div
        id={name}
        role="radiogroup"
        className="flex items-center gap-1"
        aria-invalid={hasError ? "true" : "false"}
        aria-describedby={
          hasError
            ? `${name}-error`
            : description
              ? `${name}-description`
              : undefined
        }
      >
        {[...Array(max)].map((_, i) => renderIcon(i + 1))}
      </div>

      {/* Error or Description */}
      {hasError ? (
        <div className="mt-1 flex items-center gap-1">
          <ExclamationCircleIcon
            aria-hidden="true"
            className="h-4 w-4 text-red-500"
          />
          <p
            id={`${name}-error`}
            style={{ color: theme.error }}
            className="mt-1 text-sm"
          >
            {error}
          </p>
        </div>
      ) : description ? (
        <p
          id={`${name}-description`}
          style={{ color: theme.description }}
          className="mt-1 text-sm"
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
