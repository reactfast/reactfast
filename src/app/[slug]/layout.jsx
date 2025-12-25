// app/[slug]/layout.js (Dynamic layout for each page)
import generateDynamicMetadata from '@/helpers/genDynamicMetadata'
import { supabaseClient as supabase } from '@/config/supabase-client'
import { notFound } from 'next/navigation'

async function getPage(pageSlug) {
  let { data, error } = await supabase
    .from('pages')
    .select('*')
    .eq('name', pageSlug)
    .single()

  if (error) {
    console.warn(error)
  } else if (data) {
    return data
  }
}

export async function generateViewport({ params }) {
  let page = await getPage(params.slug)

  return {
    themeColor: page?.bg_color || '#ffffff', // Default to white if no color is found
  }
}

export async function generateMetadata({ params }) {
  // Initialize an empty page object

  // Define the asynchronous function to fetch the page data

  // Await the result of getPage() to ensure page data is fetched before proceeding
  let page = await getPage(params.slug)

  console.log(page)

  // Generate the dynamic metadata
  const metaData = await generateDynamicMetadata({
    title: page?.title + ' ' + params.slug,
    description: page.description,
    image: page.meta_img, // Now, page.description should have a value
  })

  // Return the final metadata
  return {
    title: `${metaData.title} | Powered by Jot.Space | digital networking for creatives and professionals`,
    description: metaData.description,
    openGraph: metaData.openGraph,
    twitter: metaData.twitter,
  }
}

export default async function MetaLayout({ params, children }) {
  const page = await getPage(params.slug)

  if (!page) {
    notFound() // This triggers the 404 page
  }

  return (
    <div
      id="PAGE_LAYOUT"
      className="min-h-screen font-sans"
      style={{ backgroundColor: page.bg_color, color: page.font_color }}
    >
      <main>{children}</main>
    </div>
  )
}
