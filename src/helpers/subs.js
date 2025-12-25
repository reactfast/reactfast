import { supabaseClient as supabase } from '@/config/supabase-client' // Adjust import path as needed

export async function getUserSubscription(userId) {
  if (!userId) return null

  try {
    // Fetch user subscription with associated subscription type data
    const { data, error } = await supabase
      .from('subscriptions')
      .select('subscription_type(*)') // Join subscription_type data
      .eq('user_id', userId)
      .single() // Assuming a user has only one active subscription

    return data.subscription_type
  } catch (error) {
    // If no subscription exists, fetch the free tier subscription type

    const { data: freeTier, error: freeTierError } = await supabase
      .from('subscription_type')
      .select('*')
      .eq('id', 1)
      .single()

    if (freeTierError) {
      console.error('Error fetching free tier:', freeTierError)
      return null
    }

    return freeTier
  }
}
