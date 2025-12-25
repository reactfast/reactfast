import { supabaseClient as supabase } from '@/config/supabase-client'

export async function getProduct(productId) {
  const { data, error } = await supabase
    .from('vendor_products')
    .select('*')
    .eq('id', productId)
    .single()

  if (error) {
    console.error('Error fetching product:', error)
    return null
  } else {
    return data
  }
}

export async function getProductCategory(categoryId) {
  const { data, error } = await supabase
    .from('vendor_categories')
    .select('*')
    .eq('id', categoryId)
    .single()

  if (error) {
    console.error('Error fetching product category:', error)
    return null
  } else {
    return data
  }
}
