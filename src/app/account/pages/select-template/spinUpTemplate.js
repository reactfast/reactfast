import { supabaseClient as supabase } from '@/config/supabase-client'
// src/templates/templateRegistry.js
import * as Dark from '@/scaffold/Dark/template'
import * as Eth from '@/scaffold/Eth/template'
import * as Light from '@/scaffold/Light/template'
import * as Palm from '@/scaffold/Palm/template'
import * as Tatoo from '@/scaffold/tatoo/template'
import * as Professional from '@/scaffold/professional/template'

const templateRegistry = {
  Eth: Eth,
  'Dark Modern': Dark,
  'Light Modern': Light,
  'Palm Glass': Palm,
  Tatoo: Tatoo,
  Professional: Professional,
}

export async function SpinUpTemplate({
  formData,
  socialLinks,
  vCardFilePath,
  emails,
  phoneNumbers,
  addresses,
  links,
  selectedTemplate,
}) {
  try {
    const templateModule = templateRegistry[selectedTemplate]

    if (!templateModule) {
      throw new Error(`Invalid template selected: ${selectedTemplate}`)
    }

    // Build page data and sections
    const pageData = {
      name: formData.site_name,
      active: false,
      ...templateModule.themeInfo,
    }

    const pageSections = templateModule.MakeSections()

    // Step 1: Insert the page
    const { data: page, error: pageError } = await supabase
      .from('pages')
      .insert(pageData)
      .select('*')
      .single()

    if (pageError) {
      throw new Error(
        pageError.message || 'Something went wrong inserting the page',
      )
    }

    // Step 2: Prepare and insert sections
    const sectionData = pageSections.map((sec) => ({
      page: page.id,
      ...sec,
    }))

    const { data: sectionsData, error: sectionsError } = await supabase
      .from('secs')
      .insert(sectionData)
      .select('id')

    if (sectionsError) {
      console.error('Sections Insert Error:', sectionsError)
      throw new Error(sectionsError.message || 'Failed to insert sections')
    }

    // Step 3: Insert into page_sections with order
    const pageSectionsInsert = sectionsData.map((sec, index) => ({
      page: page.id,
      section: sec.id,
      order: index,
    }))

    const { error: pageSectionsError } = await supabase
      .from('page_sections')
      .insert(pageSectionsInsert)

    if (pageSectionsError) {
      console.error('Page Sections Insert Error:', pageSectionsError)
      throw new Error(
        pageSectionsError.message || 'Failed to link sections to page',
      )
    }

    // Step 4: Redirect to the new page
    window.location.href = `/account/pages/${page.id}`
  } catch (error) {
    console.error('Error submitting form:', error)
  }
}
