'use client'

import { Fragment } from 'react'
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  Transition,
} from '@headlessui/react'
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/20/solid'

/**
 * MultiSelect (labels mode)
 *
 * - Accepts options as primitives (string/number) or objects.
 * - Internally normalizes every option to { id, label, original }.
 * - `value` is always an array of labels.
 * - `onChange` always emits an array of labels.
 */
export default function MultiSelect({ field, value = [], onChange, theme }) {
  const {
    name,
    title,
    placeholder = 'Select options',
    options = [],
    optionId = 'id',
    optionLabel = 'name',
    error,
  } = field

  // Normalize options
  const normalized = options.map((opt, idx) => {
    if (typeof opt === 'string' || typeof opt === 'number') {
      const s = String(opt)
      return { id: s, label: s, original: opt }
    }
    const rawId = opt?.[optionId]
    const id =
      rawId !== undefined && rawId !== null ? String(rawId) : `__opt_${idx}`
    const label =
      opt?.[optionLabel] ??
      opt?.label ??
      (rawId !== undefined && rawId !== null ? String(rawId) : `option ${idx}`)
    return { id, label, original: opt }
  })

  // Map label -> id
  const labelToId = new Map(normalized.map((o) => [o.label, o.id]))
  const idToLabel = new Map(normalized.map((o) => [o.id, o.label]))

  // Convert incoming labels to ids
  const incomingLabels = Array.isArray(value) ? value : []
  const incomingIds = incomingLabels
    .map((lbl) => labelToId.get(lbl))
    .filter((id) => id !== undefined)

  // Handle change from HeadlessUI (ids → labels)
  const handleChange = (ids) => {
    const labels = (Array.isArray(ids) ? ids : [])
      .map((id) => idToLabel.get(id))
      .filter((lbl) => lbl !== undefined)
    onChange(labels)
  }

  // Label shown in button
  const labelForSelected =
    incomingLabels.length > 0 ? incomingLabels.join(', ') : placeholder

  return (
    <div>
      {title && (
        <label
          htmlFor={name}
          style={{ color: theme?.label }}
          className="mb-1 block text-sm font-medium"
        >
          {title}
        </label>
      )}

      <Listbox value={incomingIds} onChange={handleChange} multiple>
        <div className="relative">
          <ListboxButton
            id={name}
            className="relative w-full cursor-default rounded-md border py-1.5 pl-3 pr-8 text-left text-sm"
            style={{
              color: error ? theme?.error : theme?.inputText,
              backgroundColor: theme?.inputBackground,
              borderColor: error ? theme?.error : theme?.inputBorder,
            }}
          >
            <span
              className={`block truncate ${incomingLabels.length === 0 ? 'opacity-50' : ''}`}
              style={{
                color:
                  incomingLabels.length === 0
                    ? theme?.inputPlaceholder
                    : undefined,
              }}
            >
              {labelForSelected}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5"
                style={{ color: theme?.inputPlaceholder }}
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
              className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border py-1 text-sm shadow-lg"
              style={{
                backgroundColor: theme?.inputBackground,
                color: theme?.inputText,
                borderColor: theme?.inputBorder,
              }}
            >
              {normalized.map((o) => (
                <ListboxOption
                  key={o.id}
                  value={o.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-gray-100' : ''}`
                  }
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}
                      >
                        {o.label}
                      </span>
                      {selected && (
                        <span
                          className="absolute inset-y-0 left-0 flex items-center pl-3"
                          style={{ color: theme?.inputFocusBorder }}
                        >
                          <CheckIcon className="h-5 w-5" />
                        </span>
                      )}
                    </>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>

      {error && (
        <p className="mt-2 text-sm" style={{ color: theme?.error }}>
          {error}
        </p>
      )}
    </div>
  )
}
