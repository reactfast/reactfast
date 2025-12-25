'use client'

import { useEffect, useState } from 'react'
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/16/solid'
import { CheckIcon } from '@heroicons/react/20/solid'
import {
  Inter,
  Roboto,
  Lora,
  Montserrat,
  Poppins,
  Raleway,
  Playfair_Display,
  Merriweather,
  Nunito,
  Ubuntu,
  Oswald,
  Josefin_Sans,
  Rubik,
  Source_Sans_3,
  Karla,
  Hind,
  Work_Sans,
  Titillium_Web,
  Cabin,
  Fira_Sans,
  Dosis,
  Quicksand,
  Barlow,
  Mukta,
  Spectral,
} from 'next/font/google'
import { fonts } from '@/utils/fonts'

// Load each font globally at module scope
// const inter = Inter({
//   subsets: ['latin'],
//   weight: ['400'],
//   variable: '--font-inter',
// })
// const roboto = Roboto({
//   subsets: ['latin'],
//   weight: ['400'],
//   variable: '--font-roboto',
// })
// const lora = Lora({
//   subsets: ['latin'],
//   weight: ['400'],
//   variable: '--font-lora',
// })
// const montserrat = Montserrat({
//   subsets: ['latin'],
//   weight: ['400'],
//   variable: '--font-montserrat',
// })
// const poppins = Poppins({
//   subsets: ['latin'],
//   weight: ['400'],
//   variable: '--font-poppins',
// })
// const raleway = Raleway({
//   subsets: ['latin'],
//   weight: ['400'],
//   variable: '--font-raleway',
// })
// const playfair = Playfair_Display({
//   subsets: ['latin'],
//   weight: ['400'],
//   variable: '--font-playfair',
// })
// const merriweather = Merriweather({
//   subsets: ['latin'],
//   weight: ['400'],
//   variable: '--font-merriweather',
// })
// const nunito = Nunito({
//   subsets: ['latin'],
//   weight: ['400'],
//   variable: '--font-nunito',
// })
// const ubuntu = Ubuntu({
//   subsets: ['latin'],
//   weight: ['400'],
//   variable: '--font-ubuntu',
// })
// const oswald = Oswald({
//   subsets: ['latin'],
//   weight: ['400'],
//   variable: '--font-oswald',
// })
// const josefin = Josefin_Sans({
//   subsets: ['latin'],
//   weight: ['400'],
//   variable: '--font-josefin',
// })
// const rubik = Rubik({
//   subsets: ['latin'],
//   weight: ['400'],
//   variable: '--font-rubik',
// })
// const sourceSans = Source_Sans_3({
//   subsets: ['latin'],
//   weight: ['400'],
//   variable: '--font-source-sans',
// })
// const karla = Karla({
//   subsets: ['latin'],
//   weight: ['400'],
//   variable: '--font-karla',
// })
// const hind = Hind({
//   subsets: ['latin'],
//   weight: ['400'],
//   variable: '--font-hind',
// })
// const workSans = Work_Sans({
//   subsets: ['latin'],
//   weight: ['400'],
//   variable: '--font-work-sans',
// })
// const titillium = Titillium_Web({
//   subsets: ['latin'],
//   weight: ['400'],
//   variable: '--font-titillium',
// })
// const cabin = Cabin({
//   subsets: ['latin'],
//   weight: ['400'],
//   variable: '--font-cabin',
// })
// const firaSans = Fira_Sans({
//   subsets: ['latin'],
//   weight: ['400'],
//   variable: '--font-fira-sans',
// })
// const dosis = Dosis({
//   subsets: ['latin'],
//   weight: ['400'],
//   variable: '--font-dosis',
// })
// const quicksand = Quicksand({
//   subsets: ['latin'],
//   weight: ['400'],
//   variable: '--font-quicksand',
// })
// const barlow = Barlow({
//   subsets: ['latin'],
//   weight: ['400'],
//   variable: '--font-barlow',
// })
// const mukta = Mukta({
//   subsets: ['latin'],
//   weight: ['400'],
//   variable: '--font-mukta',
// })
// const spectral = Spectral({
//   subsets: ['latin'],
//   weight: ['400'],
//   variable: '--font-spectral',
// })

// // Map font names to their CSS variables
// const fonts = {
//   Inter: inter.variable,
//   Roboto: roboto.variable,
//   Lora: lora.variable,
//   Montserrat: montserrat.variable,
//   Poppins: poppins.variable,
//   Raleway: raleway.variable,
//   Playfair_Display: playfair.variable,
//   Merriweather: merriweather.variable,
//   Nunito: nunito.variable,
//   Ubuntu: ubuntu.variable,
//   Oswald: oswald.variable,
//   Josefin_Sans: josefin.variable,
//   Rubik: rubik.variable,
//   Source_Sans_3: sourceSans.variable,
//   Karla: karla.variable,
//   Hind: hind.variable,
//   Work_Sans: workSans.variable,
//   Titillium_Web: titillium.variable,
//   Cabin: cabin.variable,
//   Fira_Sans: firaSans.variable,
//   Dosis: dosis.variable,
//   Quicksand: quicksand.variable,
//   Barlow: barlow.variable,
//   Mukta: mukta.variable,
//   Spectral: spectral.variable,
// }

export default function FontSelector({ value, onFontChange }) {
  const fontList = Object.keys(fonts)
  const [selectedFont, setSelectedFont] = useState(value || fontList[0])

  function handleFontChange(font) {
    setSelectedFont(font)
    onFontChange(font) // Pass selected font to parent component
  }

  useEffect(() => {
    if (value && value !== selectedFont) {
      setSelectedFont(value)
    }
  }, [value])

  return (
    <Listbox value={selectedFont} onChange={handleFontChange}>
      <div className="relative mt-2 w-64">
        {/* Dropdown Button */}
        <ListboxButton className="grid w-full cursor-pointer grid-cols-1 rounded-md bg-white py-2 pl-3 pr-2 text-left text-gray-900 outline outline-1 outline-gray-300 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm">
          <span
            className="col-start-1 row-start-1 truncate pr-6"
            style={{ fontFamily: `var(${fonts[selectedFont]})` }}
          >
            {selectedFont.replace(/_/g, ' ')}
          </span>
          <ChevronUpDownIcon className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4" />
        </ListboxButton>

        {/* Dropdown List */}
        <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
          {fontList.map((font) => (
            <ListboxOption
              key={font}
              value={font}
              className="group relative cursor-pointer select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-indigo-600 hover:text-white"
            >
              <div id="FONTS" className={fonts[font] || ''}>
                {font.replace(/_/g, ' ')}
              </div>

              {/* Checkmark for selected item */}
              {font === selectedFont && (
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600">
                  <CheckIcon aria-hidden="true" className="size-5" />
                </span>
              )}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  )
}
