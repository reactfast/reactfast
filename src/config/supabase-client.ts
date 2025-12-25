import { createClient } from '@supabase/supabase-js'

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseAnonKey: string = process.env
  .NEXT_PUBLIC_SUPABASE_ANON_KEY as string
const supabaseServiceRole: string | undefined =
  process.env.SUPABASE_SERVICE_ROLE

// Public client (RLS enforced)
export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)

// Admin client (bypasses RLS) - Only use on the backend!
export const apiCreateClient = supabaseServiceRole
  ? createClient(supabaseUrl, supabaseServiceRole, {
      auth: { persistSession: false },
    })
  : null

if (!supabaseServiceRole) {
  console.warn(
    'SUPABASE_SERVICE_ROLE is not set! Admin client will not be created.',
  )
}
