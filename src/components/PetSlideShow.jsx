'use client'

import { useEffect, useState } from 'react'
import { fonts } from '@/utils/fonts'
import * as Pets from '@/scaffold/pet/template'
import { supabaseClient as supabase } from '@/config/supabase-client'

export default function PetSlideshow() {
  const [preview, setPreview] = useState([])
  const [sectionsWSecType, setSectionsWithSecType] = useState([])
  const [theme, setTheme] = useState({})

  // load preview (async getPreview)
  useEffect(() => {
    let mounted = true
    async function loadPreview() {
      console.log('[loadPreview] Pets')
      if (Pets?.themeInfo) setTheme(Pets.themeInfo)
      if (Pets?.getPreview) {
        const sections = await Pets.getPreview()
        console.log('[loadPreview] sections:', sections)
        if (mounted) setPreview(sections)
      }
    }
    loadPreview()
    return () => {
      mounted = false
    }
  }, [])

  async function getSecType({ secId }) {
    console.log('[getSecType] id:', secId)
    const { data, error } = await supabase
      .from('sec_type') // keep your table name
      .select('*')
      .eq('id', secId)
      .single()
    if (error) {
      console.warn('[getSecType] error:', error)
      return null
    }
    return data
  }

  // hydrate sec_type IDs -> objects
  useEffect(() => {
    if (!preview?.length) return
    async function hydrate() {
      const updated = await Promise.all(
        preview.map(async (section) => {
          if (typeof section.sec_type === 'number') {
            const secType = await getSecType({ secId: section.sec_type })
            return { ...section, sec_type: secType }
          }
          return section
        }),
      )
      console.log('[hydrate] sectionsWSecType:', updated)
      setSectionsWithSecType(updated)
    }
    hydrate()
  }, [preview])

  return (
    <div
      className="relative mx-auto h-[600px] w-[300px] overflow-y-auto rounded-xl shadow-lg"
      style={{
        backgroundColor: theme?.bg_color || '#fff',
        color: theme?.font_color || '#000',
        backgroundImage: theme?.bg_image ? `url(${theme.bg_image})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'top left',
        backgroundRepeat: 'repeat',
        fontFamily: fonts[theme?.font_name] || 'inherit',
      }}
    ></div>
  )
}
