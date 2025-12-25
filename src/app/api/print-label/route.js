import path from 'path'
import fs from 'fs'

export async function POST(request) {
  try {
    // Load the static label template from the public folder
    const labelPath = path.join(process.cwd(), 'public', 'labelTemplate.label')
    const labelXml = fs.readFileSync(labelPath, 'utf-8')

    // Return the label template (for now, we're not yet handling the actual printing)
    return new Response(labelXml, {
      status: 200,
      headers: { 'Content-Type': 'application/xml' },
    })
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to load label template' }),
      {
        status: 500,
      },
    )
  }
}
