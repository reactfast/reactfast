'use client'

import { useParams } from 'next/navigation'
import { MDPage } from '@/components/MDPage'

export default function FormsDocsPage() {
  const params = useParams()
  const { slug } = params

  // Construct the URL dynamically
  const mdUrl = `https://raw.githubusercontent.com/reactfast/forms-docs/main/v1/${slug}/page.md`

  return (
    <MDPage mdUrl={mdUrl} className="prose dark:prose-invert mx-auto p-6" />
  )
}
