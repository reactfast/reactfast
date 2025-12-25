'use client'

import { useEffect, useState } from 'react'
import { supabaseClient as supabase } from '@/config/supabase-client'
import ReturnSection from '@/app/[slug]/returnSecs3'
import { fonts } from '@/utils/fonts'

export default function CatchAllPages({ params }) {
  const [site, setSite] = useState({})
  const [pageInfo, setPageInfo] = useState({})
  const [loading, setLoading] = useState(true)
  const [secs, setSecs] = useState([])
  const [sectionsIdArray, setSectionsIdArray] = useState([])
  const { siteName, pagename = [] } = params

  useEffect(() => {
    console.log('PARAMS', params)

    async function getSite() {
      const { data, error } = await supabase
        .from('sites')
        .select('*')
        .eq('name', params.siteName)
        .single()

      if (error) {
        console.error('Error fetching site:', error)
      } else {
        console.log('Site data:', data)
        setSite(data)
      }
    }

    getSite()
  }, [params])

  // ------------------------------------------------------------------
  // 1. Fetch the page data on load
  // ------------------------------------------------------------------
  useEffect(() => {
    async function resolveNestedPage() {
      if (!site?.id || !params.pageName || params.pageName.length === 0) return

      setLoading(true)
      let parent = null
      let page = null

      for (const segment of params.pageName) {
        let query = supabase
          .from('pages')
          .select('*')
          .eq('name', segment)
          .eq('site', site.id)
          .single()

        // Handle null vs non-null parent
        if (parent === null) {
          query = query.is('parent', null) // Correct way to handle null in Supabase/Postgres
        } else {
          query = query.eq('parent', parent) // Numeric parent ID for nested pages
        }

        const { data, error } = await query

        if (error || !data) {
          console.warn('Page not found at segment:', segment, error)
          setPageInfo(null) // Handle 404 or fallback
          setLoading(false)
          return
        }

        page = data
        parent = page.id // Set parent for next iteration
      }

      // Final page after full path traversal
      setPageInfo(page)
      setLoading(false)
    }

    resolveNestedPage()
  }, [site.id, params.pageName])

  // ------------------------------------------------------------------
  // 1. Fetch the section IDs for the current page from 'page_sections'
  // ------------------------------------------------------------------
  useEffect(() => {
    async function getPageSectionIds() {
      if (!pageInfo.id) return
      setLoading(true)

      const { data, error } = await supabase
        .from('page_sections')
        .select('*')
        .eq('page', pageInfo.id)
        .order('order', { ascending: true })

      if (error) {
        console.warn('Error fetching page_sections:', error)
      } else if (data) {
        const orderedSectionIds = data.map((sec) => sec.section)
        setSectionsIdArray(orderedSectionIds)
      }

      setLoading(false)
    }

    if (pageInfo?.id) {
      getPageSectionIds()
    }
  }, [pageInfo, params.slug])

  // ------------------------------------------------------------------
  // 2. Fetch the actual sections for those IDs from 'secs' table
  // ------------------------------------------------------------------
  useEffect(() => {
    async function getPageSections() {
      if (!pageInfo.id || sectionsIdArray.length === 0) return
      setLoading(true)

      console.log('pageInfo:', pageInfo)
      console.log('FONT', fonts[pageInfo?.font_name])

      const { data, error } = await supabase
        .from('secs')
        .select('* , sec_type(*)') // Join with sec_type table
        .in('id', sectionsIdArray)

      if (error) {
        console.warn('Error fetching sections:', error)
      } else if (data) {
        // Order sections based on the order of section IDs
        const orderedSections = sectionsIdArray.map((id) =>
          data.find((section) => section.id === id),
        )

        setSecs(orderedSections)
      }

      setLoading(false)
    }

    if (pageInfo?.id && sectionsIdArray.length > 0) {
      getPageSections()
    }
  }, [pageInfo, sectionsIdArray, params.slug])

  return (
    <>
      <div>
        {secs.map((section) => (
          <ReturnSection
            key={section.id}
            sec={section.sec_type.name}
            section={section}
            content={section.definition}
            colors={[
              pageInfo.primary,
              pageInfo.secondary,
              pageInfo.tertiary,
              pageInfo.quaternary,
              pageInfo.bg_color,
              pageInfo.foreground_color,
            ]}
            theme={section.sec_type.folder_name}
            kind={section.sec_type.type}
            num={section.sec_type.num}
            component_name={section.sec_type.component_name}
          />
        ))}
      </div>
    </>
  )
}
