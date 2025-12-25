'use client'

import { Fragment, useState } from 'react'
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  Transition,
} from '@headlessui/react'
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/20/solid'

export default function SingleSelect({ field, value, onChange, theme }) {
  const {
    name,
    title,
    helper,
    description,
    placeholder = 'Select an option',
    required,
    error,
    options = [],
    optionId = 'id',
    optionLabel = 'name',
  } = field

  const [isFocused, setIsFocused] = useState(false)
  const hasError = Boolean(error)

  // Determine border color
  const borderColor = hasError
    ? theme.error
    : isFocused
      ? theme.inputFocusBorder
      : theme.inputBorder

  const getDisplayValue = () => {
    if (!value) return null
    const found = options.find((o) =>
      typeof o === 'string' ? o === value : o[optionId] === value,
    )
    return typeof found === 'string' ? found : found?.[optionLabel]
  }

  const handleChange = (val) => {
    const result = typeof val === 'string' ? val : val[optionId]
    onChange(result)
  }

  const displayValue = getDisplayValue()

  return (
    <div>
      {/* Label + optional */}
      {title && (
        <div className="mb-1 flex justify-between">
          <label
            htmlFor={name}
            style={{ color: theme.label }}
            className="block text-sm/6 font-medium"
          >
            {title}
            {required && (
              <span
                style={{ color: theme.inputFocusBorder }}
                className="ml-1 text-xs"
              >
                *
              </span>
            )}
          </label>
          {!required && !hasError && (
            <span style={{ color: theme.description }} className="text-sm/6">
              (Optional)
            </span>
          )}
        </div>
      )}

      {helper && (
        <p style={{ color: theme.description }} className="mb-2 text-xs">
          {helper}
        </p>
      )}

      {/* Listbox */}
      <div className="relative mt-2">
        <Listbox
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        >
          <div className="relative">
            <ListboxButton
              id={name}
              style={{
                color: hasError ? theme.error : theme.inputText,
                backgroundColor: theme.inputBackground,
                borderColor: borderColor,
                borderWidth: '1px',
                borderStyle: 'solid',
                borderRadius: '0.375rem', // rounded-md
                paddingLeft: '0.75rem',
                paddingRight: '2.5rem',
              }}
              className="relative w-full cursor-default py-1.5 text-left text-base outline-none sm:text-sm/6"
            >
              <span
                className={`block truncate ${!displayValue ? 'opacity-50' : ''}`}
                style={{
                  color: !displayValue ? theme.inputPlaceholder : undefined,
                }}
              >
                {value || displayValue || placeholder}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5"
                  style={{ color: theme.inputPlaceholder }}
                  aria-hidden="true"
                />
              </span>
            </ListboxButton>

            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <ListboxOptions
                style={{
                  backgroundColor: theme.inputBackground,
                  color: theme.inputText,
                  borderColor: theme.inputBorder,
                  borderWidth: '1px',
                  borderStyle: 'solid',
                }}
                className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md py-1 text-base shadow-lg sm:text-sm"
              >
                {options.map((option, idx) => {
                  const val = typeof option === 'string' ? option : option.value
                  const labelText =
                    typeof option === 'string'
                      ? option
                      : option.name + option.label
                        ? ` (${option.label})`
                        : ''
                  return (
                    <ListboxOption
                      key={idx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? 'bg-gray-100' : ''
                        }`
                      }
                      value={val}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            style={{ fontWeight: selected ? '600' : '400' }}
                            className="block truncate"
                          >
                            {labelText}
                          </span>
                          {selected && (
                            <span
                              className="absolute inset-y-0 left-0 flex items-center pl-3"
                              style={{ color: theme.inputFocusBorder }}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          )}
                        </>
                      )}
                    </ListboxOption>
                  )
                })}
              </ListboxOptions>
            </Transition>
          </div>
        </Listbox>
      </div>

      {/* Error or description */}
      {hasError ? (
        <p
          id={`${name}-error`}
          style={{ color: theme.error }}
          className="mt-2 text-sm"
        >
          {error}
        </p>
      ) : description ? (
        <p
          id={`${name}-description`}
          style={{ color: theme.description }}
          className="mt-2 text-sm"
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}
