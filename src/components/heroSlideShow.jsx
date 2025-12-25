'use client'

import { useEffect, useState } from 'react'
import ReturnSection from '@/app/[slug]/returnSecs3'
import * as Dark from '@/scaffold/Dark/template'
import * as Eth from '@/scaffold/Eth/template'
import * as Light from '@/scaffold/Light/template'
import * as Palm from '@/scaffold/Palm/template'
import * as Tatoo from '@/scaffold/tatoo/template'
import * as Professional from '@/scaffold/professional/template'
import { fonts } from '@/utils/fonts'

const templateMap = {
  Eth,
  // 'Dark Modern': Dark,
  // 'Light Modern': Light,
  'Palm Glass': Palm,
  Tatoo,
  Professional,
}

const templateNames = Object.keys(templateMap)

export default function SimpleRotatingTemplatePreview() {
  const [index, setIndex] = useState(0)
  const [fade, setFade] = useState(true)

  const name = templateNames[index]
  const module = templateMap[name]
  const preview = module?.getPreview?.() || []
  const theme = module?.themeInfo || {}

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % templateNames.length)
        setFade(true)
      }, 400)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className={`relative mx-auto h-[600px] w-[300px] overflow-y-auto rounded-xl shadow-lg transition-opacity duration-500 ease-in-out ${
        fade ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        backgroundColor: theme?.bg_color || '#fff',
        color: theme?.font_color || '#000',
        backgroundImage: theme?.bg_image ? `url(${theme.bg_image})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'top left',
        backgroundRepeat: 'repeat',
        fontFamily: fonts[theme?.font_name] || 'inherit',
      }}
    >
      {preview.length > 0 ? (
        preview.map((section) => (
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
        ))
      ) : (
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
  )
}
