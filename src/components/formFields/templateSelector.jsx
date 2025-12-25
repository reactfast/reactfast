'use client'

import { useState, useEffect } from 'react'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import IPhoneLayout from '@/components/iphone'
import ReturnSection from '@/app/[slug]/returnSecs3'
import * as Dark from '@/scaffold/Dark/template'
import * as Eth from '@/scaffold/Eth/template'
import * as Light from '@/scaffold/Light/template'
import * as Palm from '@/scaffold/Palm/template'
import * as Tatoo from '@/scaffold/tatoo/template'
import * as Professional from '@/scaffold/professional/template'
import { set } from 'date-fns'
import { fonts } from '@/utils/fonts'

const templateMap = {
  Eth: Eth,
  // 'Dark Modern': Dark,
  // 'Light Modern': Light,
  'Palm Glass': Palm,
  Tatoo: Tatoo,
  Professional: Professional,
}

const templates = [
  [
    'Eth',
    'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics/templates/iPhone%2016%20-%202.png',
  ],
  // [
  //   'Dark Modern',
  //   'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics/templates/Screen%20Shot%202025-03-23%20at%208.35.21%20PM.png',
  // ],
  [
    'Palm Glass',
    'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics/templates/Screen%20Shot%202025-04-11%20at%205.22.14%20PM.png',
  ],
  [
    'Tatoo',
    'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics/templates/iPhone%2016%20-%201.png',
  ],
  [
    'Professional',
    'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics/templates/Screen%20Shot%202025-04-11%20at%205.22.14%20PM.png',
  ],
]

export default function TemplateSelector({ onChange }) {
  const [selectedName, setSelectedName] = useState(templates[0][0])

  const selectedModule = templateMap[selectedName]
  const preview = selectedModule?.getPreview?.() || []
  const theme = selectedModule?.themeInfo || {}

  // Fire onChange initially and whenever selection updates
  useEffect(() => {
    if (onChange && selectedName) {
      onChange(selectedName)
    }
  }, [selectedName, onChange])

  useEffect(() => {
    if (onChange && selectedName) {
      onChange(selectedName)
    }
  }, [selectedName, onChange])

  useEffect(() => {
    console.log('Preview:', preview)
  }, [preview])

  return (
    <div className="flex h-full flex-col overflow-hidden sm:flex-row">
      {/* Mobile Select Dropdown (hidden on sm and up) */}
      <div className="block p-4 sm:hidden">
        <select
          className="w-full rounded border px-4 py-2"
          value={selectedName}
          onChange={(e) => setSelectedName(e.target.value)}
        >
          {templates.map(([name]) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {/* Left Panel - Template List (hidden on mobile) */}
      <div className="hidden border-r bg-gray-50 sm:block sm:w-1/3">
        <ul className="divide-y">
          {templates.map(([name]) => (
            <li
              key={name}
              onClick={() => setSelectedName(name)}
              className={`flex cursor-pointer items-center justify-between p-4 transition-colors ${
                selectedName === name
                  ? 'bg-white font-semibold'
                  : 'hover:bg-gray-100'
              }`}
            >
              {name}
              {selectedName === name && (
                <CheckCircleIcon className="h-5 w-5 text-green-500" />
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Right Panel - Preview */}
      <div className="flex flex-1 items-center justify-center bg-white p-6">
        <IPhoneLayout
          bgColor={theme?.bg_color}
          fontColor={theme?.font_color}
          bgImage={theme?.bg_image}
        >
          <div className={fonts[theme?.font_name] || ''}>
            {preview?.map((section) => (
              <ReturnSection
                key={section.id}
                sec={section.sec_type.name}
                section={section}
                content={section.definition}
                colors={[
                  theme.primary,
                  theme.secondary,
                  theme.tertiary,
                  theme.quaternary,
                  theme.bg_color,
                  theme.foreground_color,
                ]}
                theme={section.sec_type.folder_name}
                kind={section.sec_type.type}
                num={section.sec_type.num}
                component_name={section.sec_type.component_name}
              />
            ))}

            {preview?.length === 0 && (
              <div className="p-4">
                <h1 className="text-center text-xl font-bold">
                  No Sections on This Page
                </h1>
                <p className="mt-4 text-center">
                  Click the Plus Button to Add Your First Section
                </p>
              </div>
            )}
          </div>
        </IPhoneLayout>
      </div>
    </div>
  )
}
