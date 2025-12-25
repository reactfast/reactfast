import { supabaseClient as supabase } from '@/config/supabase-client'
import * as Eth from '@/scaffold/Eth/template'
import * as Palm from '@/scaffold/Palm/template'
import * as Tatoo from '@/scaffold/tatoo/template'
import * as Professional from '@/scaffold/professional/template'
import * as QuickPage from '@/scaffold/QuickPage/template'

export async function createSiteFromTemplate({
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
    let pageData = {
      name: formData.site_name,
      active: true,
      vcard: vCardFilePath,
    }

    let pageSections = []

    pageData = {
      ...pageData,
      ...QuickPage.themeInfo,
    }

    pageSections = QuickPage.MakeSections({
      formData,
      vCardFilePath,
      socialLinks,
    })

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

    // Step 2: Prepare section data with page ID
    const sectionData = pageSections.map((sec) => ({
      page: page.id, // optional if you're still using it
      ...sec,
    }))

    // Step 3: Insert sections into 'secs' table
    const { data: sectionsData, error: sectionsError } = await supabase
      .from('secs')
      .insert(sectionData)
      .select('id')

    if (sectionsError) {
      console.error('Sections Insert Error:', sectionsError)
      throw new Error(sectionsError.message || 'Failed to insert sections')
    }

    // Step 4: Insert into 'page_sections' join table with correct order
    const pageSectionsInsert = sectionsData.map((sec, index) => ({
      page: page.id,
      section: sec.id,
      order: index, // assign order based on array index
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

    // Step 5: Redirect to the new page
    window.location.href = `/account/pages/${page.id}`
  } catch (error) {
    console.error('Error submitting form:', error)
  }
}
