'use client'

import { useRef, useState, useEffect } from 'react'

const ASPECT_RATIOS = {
  A4: { width: 794, height: 1123 },
  Letter: { width: 816, height: 1056 },
  Legal: { width: 816, height: 1344 },
  Square: { width: 1000, height: 1000 },
}

export default function TestPDFExportPage() {
  const [htmlInput, setHtmlInput] = useState(
    `<h1 class="text-3xl font-bold mb-4">Marketing Content</h1><p>This is an example marketing block. You can paste large amounts of content to test auto-paging.</p><p>${'<br/>'.repeat(100)}End of Content</p>`,
  )
  const [aspectRatio, setAspectRatio] = useState('A4')

  const iframeRef = useRef(null)
  const stagingRef = useRef(null)

  const { width, height } = ASPECT_RATIOS[aspectRatio]

  // Slice content into multiple "page" divs
  const generatePagedHTML = () => {
    const staging = stagingRef.current
    staging.innerHTML = `<div style="width: ${width}px">${htmlInput}</div>`

    const contentHeight = staging.scrollHeight
    const pages = []
    const clone = staging.firstChild

    let offset = 0
    while (offset < contentHeight) {
      const pageWrapper = document.createElement('div')
      pageWrapper.className = 'page'
      pageWrapper.style.width = `${width}px`
      pageWrapper.style.height = `${height}px`
      pageWrapper.style.overflow = 'hidden'
      pageWrapper.style.position = 'relative'

      const pageContent = clone.cloneNode(true)
      pageContent.style.position = 'absolute'
      pageContent.style.top = `-${offset}px`

      pageWrapper.appendChild(pageContent)
      pages.push(pageWrapper.outerHTML)

      offset += height
    }

    return pages.join('')
  }

  const injectContent = () => {
    const iframe = iframeRef.current
    const doc = iframe?.contentDocument || iframe?.contentWindow?.document

    if (doc) {
      const pagedHTML = generatePagedHTML()

      doc.open()
      doc.write(`
        <html>
          <head>
            <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
            <style>
              body {
                margin: 0;
                padding: 0;
                background: #f0f0f0;
              }
              .page {
                page-break-after: always;
                break-after: page;
                background: white;
                margin: 20px auto;
                box-shadow: 0 0 4px rgba(0,0,0,0.1);
              }
            </style>
          </head>
          <body>${pagedHTML}</body>
        </html>
      `)
      doc.close()
    }
  }

  useEffect(() => {
    injectContent()
  }, [htmlInput, aspectRatio])

  const handleDownloadPDF = async () => {
    const iframe = iframeRef.current
    const doc = iframe?.contentDocument || iframe?.contentWindow?.document
    const element = doc?.body

    if (element) {
      const html2pdf = (await import('html2pdf.js')).default

      html2pdf()
        .from(element)
        .set({
          margin: 0,
          filename: `marketing-material-${aspectRatio}.pdf`,
          html2canvas: { scale: 2 },
          jsPDF: {
            unit: 'px',
            format: [width, height],
            orientation: 'portrait',
          },
        })
        .save()
    }
  }

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">PDF Export Builder</h1>

      <div className="flex flex-wrap items-center gap-4">
        <label className="text-sm font-medium">Aspect Ratio:</label>
        <select
          className="rounded border px-3 py-2"
          value={aspectRatio}
          onChange={(e) => setAspectRatio(e.target.value)}
        >
          {Object.keys(ASPECT_RATIOS).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>

        <button
          onClick={injectContent}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Preview
        </button>

        <button
          onClick={handleDownloadPDF}
          className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
        >
          Download PDF
        </button>
      </div>

      <textarea
        className="h-64 w-full rounded border p-4 font-mono text-sm"
        value={htmlInput}
        onChange={(e) => setHtmlInput(e.target.value)}
        placeholder="Paste your raw HTML here..."
      />

      <div className="mt-4 overflow-hidden rounded border">
        <iframe
          ref={iframeRef}
          title="PDF Preview"
          className="min-h-[1200px] w-full bg-gray-100"
        />
      </div>

      {/* Hidden staging element for measuring content height */}
      <div
        ref={stagingRef}
        className="absolute left-[-9999px] top-0 w-[794px]"
      />
    </div>
  )
}
