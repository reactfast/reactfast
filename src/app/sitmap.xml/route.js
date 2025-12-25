import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic' // disables prerendering during build

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'sitemap.xml')
    const file = await fs.readFile(filePath, 'utf-8')

    return new NextResponse(file, {
      headers: {
        'Content-Type': 'application/xml',
      },
    })
  } catch (error) {
    console.error('❌ Error serving sitemap:', error)
    return new NextResponse('Sitemap not found', { status: 404 })
  }
}
