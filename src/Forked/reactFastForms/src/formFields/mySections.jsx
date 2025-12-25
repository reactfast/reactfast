'use client'

import { useState, useMemo } from 'react'
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/16/solid'
import { CheckIcon } from '@heroicons/react/20/solid'

const people = [
  { id: 1, name: 'Wade Cooper' },
  { id: 2, name: 'Arlene Mccoy' },
  { id: 3, name: 'Devon Webb' },
  { id: 4, name: 'Tom Cook' },
  { id: 5, name: 'Tanya Fox' },
  { id: 6, name: 'Hellen Schmidt' },
  { id: 7, name: 'Caroline Schultz' },
  { id: 8, name: 'Mason Heaney' },
  { id: 9, name: 'Claudie Smitham' },
  { id: 10, name: 'Emil Schaefer' },
]

/**
 * @returns {JSX.Element}
 */
export default function AutoComplete() {
  const [selected, setSelected] = useState(people[0])
  const [query, setQuery] = useState('')

  // Only used for filtering
  const filteredPeople = useMemo(() => {
    if (!query) return people
    return people.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase()),
    )
  }, [query])

  return (
    <div>
      <label
        htmlFor="search"
        className="block text-sm/6 font-medium text-gray-900 dark:text-white"
      >
        Search People
      </label>
      <div className="mt-2">
        <input
          id="search"
          type="text"
          placeholder="Type to filter..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
        />
      </div>

      <div className="relative mt-3">
        <Listbox value={selected} onChange={setSelected}>
          <div className="relative">
            <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-8 text-left text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:focus-visible:outline-indigo-500">
              <span className="block truncate">{selected?.name}</span>
              <ChevronUpDownIcon
                aria-hidden="true"
                className="pointer-events-none absolute right-2 top-1/2 size-5 -translate-y-1/2 text-gray-500 sm:size-4 dark:text-gray-400"
              />
            </ListboxButton>

            <ListboxOptions
              transition
              className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg outline outline-1 outline-black/5 sm:text-sm dark:bg-gray-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10"
            >
              {filteredPeople.length === 0 ? (
                <div className="cursor-default select-none px-3 py-2 text-gray-500 dark:text-gray-400">
                  No results found.
                </div>
              ) : (
                filteredPeople.map((person) => (
                  <ListboxOption
                    key={person.id}
                    value={person}
                    className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white dark:text-white dark:data-[focus]:bg-indigo-500"
                  >
                    <span className="block truncate font-normal group-data-[selected]:font-semibold">
                      {person.name}
                    </span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-[:not([data-selected])]:hidden group-data-[focus]:text-white dark:text-indigo-400">
                      <CheckIcon aria-hidden="true" className="size-5" />
                    </span>
                  </ListboxOption>
                ))
              )}
            </ListboxOptions>
          </div>
        </Listbox>
      </div>
    </div>
  )
}
