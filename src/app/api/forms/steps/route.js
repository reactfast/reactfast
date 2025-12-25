import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE,
)

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const formId = searchParams.get('formId')
    const stepId = searchParams.get('stepId')

    if (stepId) {
      // Get specific step with fields
      const { data, error } = await supabase
        .from('form_steps')
        .select(`
          *,
          form_step_fields(*)
        `)
        .eq('id', stepId)
        .single()

      if (error) throw error
      return NextResponse.json(data)
    }

    if (formId) {
      // Get all steps for a form
      const { data, error } = await supabase
        .from('form_steps')
        .select(`
          *,
          form_step_fields(*)
        `)
        .eq('form_id', formId)
        .order('step_order', { ascending: true })

      if (error) throw error
      return NextResponse.json(data)
    }

    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 })
  } catch (error) {
    console.error('Error in GET /api/forms/steps:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { step, fields } = body

    // Create step
    const { data: stepData, error: stepError } = await supabase
      .from('form_steps')
      .insert([step])
      .select()
      .single()

    if (stepError) throw stepError

    // Create fields if provided
    if (fields && fields.length > 0) {
      const fieldsWithStepId = fields.map(field => ({
        ...field,
        step_id: stepData.id
      }))

      const { error: fieldsError } = await supabase
        .from('form_step_fields')
        .insert(fieldsWithStepId)

      if (fieldsError) throw fieldsError
    }

    return NextResponse.json(stepData)
  } catch (error) {
    console.error('Error in POST /api/forms/steps:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    const body = await request.json()
    const { id, ...updates } = body

    const { data, error } = await supabase
      .from('form_steps')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in PUT /api/forms/steps:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url)
    const stepId = searchParams.get('id')

    if (!stepId) {
      return NextResponse.json({ error: 'Step ID required' }, { status: 400 })
    }

    const { error } = await supabase
      .from('form_steps')
      .delete()
      .eq('id', stepId)

    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in DELETE /api/forms/steps:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}