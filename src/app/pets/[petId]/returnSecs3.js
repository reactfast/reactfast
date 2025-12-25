import * as Secs from '@/builderAssets/digitalBusinessCard/import'
import * as Heros from '@/builderAssets/tailwindUi/hero/import'
import * as Features from '@/builderAssets/tailwindUi/feature/import'
import * as tailwind from '@/builderAssets/tailwindUi/import'
import * as Custom from '@/builderAssets/tailwindUi/custom/import'
import * as Hospitality from '@/builderAssets/food/import'
import * as CustomComponents from '@/builderAssets/custom/import'
import * as Jot from '@/builderAssets/jot/import'

import React from 'react'

export function NoSectionFound({ section }) {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <h1 className="mb-4 text-4xl font-bold text-red-600">
        Component Not Found
      </h1>
      <p className="text-lg text-gray-700">
        No component found by the name of{' '}
        <span className="font-semibold text-gray-900">{section}</span>.
      </p>
    </div>
  )
}

export default function ReturnSection({
  sec,
  key,
  content, // obj
  colors, // site theme
  theme,
  component_name,
  kind,
  num,
  recent,
  section,
  site,
}) {
  const isRecent = recent && recent.id === section.id

  if (typeof content === 'string') {
    try {
      content = JSON.parse(content)
    } catch (e) {
      console.error('Invalid JSON string:', content)
      return <NoSectionFound section={sec} />
    }
  }

  // console.log('theme:', theme)

  let component

  switch (theme) {
    case 'digitalBusinessCard':
      component = Secs[component_name]
      break
    case 'tailwindUi':
      switch (kind) {
        case 'hero':
          component = Heros[component_name]
          break
        case 'feature':
          component = Features[component_name]
          break
        case 'custom':
          component = Custom[component_name]
          break
        default:
          console.error(`Unknown kind: ${kind}`)
      }
      break
    case 'hospitality':
      component = Hospitality[component_name]
      break
    case 'tailwind':
      component = tailwind[component_name]
      break
    case 'jot':
      component = Jot[component_name]
      break
    case 'custom':
      component = CustomComponents[component_name]
      break
    default:
      console.error(`Unknown theme: ${theme}`)
  }

  if (!component) {
    return <NoSectionFound section={component_name} />
  }

  return isRecent ? (
    <div
      id={section.id}
      data-recent="true"
      className="relative m-1 rounded-md border border-blue-500 p-1 transition"
    >
      <span className="absolute right-0 top-0 z-[50] rounded-bl-md bg-blue-500 p-1 text-xs text-white">
        {component_name}
      </span>

      {React.createElement(component, { obj: content, colors, site })}
    </div>
  ) : (
    React.createElement(component, {
      obj: content,
      colors,
      site,
      id: section.id,
    })
  )
}
