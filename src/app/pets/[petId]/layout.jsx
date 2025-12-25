// app/pets/[id]/layout.js
import generateDynamicMetadata from '@/helpers/genDynamicMetadata'
import { supabaseClient as supabase } from '@/config/supabase-client'
import { notFound } from 'next/navigation'

async function getPet(petId) {
  const { data, error } = await supabase
    .from('pets')
    .select('*')
    .eq('id', petId)
    .single()

  if (error) {
    console.warn(error)
    return null
  }
  return data
}

// Theme color could reflect lost status
export async function generateViewport({ params }) {
  const pet = await getPet(params.id)
  return {
    themeColor: pet?.lost ? '#ffcccc' : '#ffffff',
  }
}

export async function generateMetadata({ params }) {
  const pet = await getPet(params.petId)

  const metaData = await generateDynamicMetadata({
    title: pet.name,
    description: `Meet ${pet.name}, a lovely ${pet.type}.`,
    image: pet.photos[0].src,
  })

  return {
    title: `${pet.lost ? 'Lost Pet ' : ''}${pet.name} ${pet.breed ? pet.breed + ' ' : ''}| BoopTag by Jot Pets`,
    description: metaData.description,
    openGraph: metaData.openGraph,
    twitter: metaData.twitter,
  }
}

export default async function PetLayout({ params, children }) {
  const pet = await getPet(params.petId)
  if (!pet) notFound()

  return (
    <div
      id="PET_LAYOUT"
      className="min-h-screen font-sans"
      style={{ backgroundColor: '#fff', color: '#111' }}
    >
      <main>{children}</main>
    </div>
  )
}
