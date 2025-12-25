'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Dialog } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import SocialHeader from '@/builderAssets/digitalBusinessCard/header/socialHeader'

const fallbackImage = '/placeholder.png'

export default function PetProfile({ pet }) {
  const [selectedImage, setSelectedImage] = useState(null)
  const mainImage = pet?.photos?.[0]?.photo || fallbackImage

  return (
    <div className="min-h-screen w-full bg-white text-gray-800">
      {/* Header */}
      <SocialHeader
        obj={{ image: mainImage }}
        colors={['#1f2937', '#ffffff']} // Example colors
      />

      <div className="px-4 pb-8 pt-16">
        <h1 className="text-2xl font-bold">{pet?.name || 'Unnamed Pet'}</h1>
        <p className="text-sm text-gray-500">
          {pet?.breed || 'Unknown Breed'} • {pet?.type || 'Unknown Type'}
        </p>
      </div>

      <div className="px-4 pb-8 pt-16">
        {/* Sections */}
        <Section title="Profile">
          <Field label="Type" value={pet?.type} />
          <Field label="Gender" value={pet?.gender} />
          <Field label="Age" value={pet?.age} />
          <Field label="Size" value={pet?.size} />
          <Field
            label="Weight"
            value={pet?.weight ? pet?.weight + ' lbs' : null}
          />
          <Field label="Hair Length" value={pet?.hair_length} />
          <Field label="Hair Color" value={pet?.hair_color} />
          <Field label="Eye Color (Left)" value={pet?.eye_color} />
          <Field label="Eye Color (Right)" value={pet?.eye_color_right} />
        </Section>

        <Section title="Behavior">
          <Field label="Favorite Food" value={pet?.favorite_food} />
          <Field label="Favorite Petting Spot" value={pet?.fav_petting_spot} />
          <Field label="No Pet Zones" value={pet?.no_pet_zones} />
          <Field label="Known Commands" value={pet?.known_commands} />
          <Field
            label="House Trained?"
            value={
              pet?.house_trained === true
                ? 'Yes'
                : pet?.house_trained === false
                  ? 'No'
                  : null
            }
          />
        </Section>

        <Section title="Medical & Social">
          <Field label="Chip ID" value={pet?.chip_id} />
          <Field
            label="Hypoallergenic?"
            value={pet?.hypoallergenic ? 'Yes' : 'No'}
          />
          <Field
            label="Service Animal?"
            value={pet?.service_animal ? 'Yes' : 'No'}
          />
          <Field
            label="Good w/ Kids?"
            value={pet?.good_with_kids ? 'Yes' : 'No'}
          />
          <Field
            label="Good w/ Women?"
            value={pet?.good_with_women ? 'Yes' : 'No'}
          />
          <Field
            label="Good w/ Men?"
            value={pet?.good_with_men ? 'Yes' : 'No'}
          />
          <Field
            label="Good w/ Dogs?"
            value={pet?.good_with_dogs ? 'Yes' : 'No'}
          />
          <Field
            label="Good w/ Cats?"
            value={pet?.good_with_cats ? 'Yes' : 'No'}
          />
          <Field label="Medical Notes" value={pet?.medical_notes} />
        </Section>
      </div>

      {/* Modal */}
      <Dialog
        open={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex items-center justify-center bg-black/70">
          <Dialog.Panel className="relative mx-4 w-full max-w-sm">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute right-2 top-2 rounded-full bg-white p-1 shadow"
            >
              <XMarkIcon className="h-5 w-5 text-gray-800" />
            </button>
            <Image
              src={selectedImage || fallbackImage}
              alt="Selected"
              width={500}
              height={500}
              className="h-auto w-full rounded-lg object-cover"
            />
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div className="mt-8">
      <h2 className="mb-3 border-b border-gray-200 pb-1 text-lg font-semibold text-slate-800">
        {title}
      </h2>
      <div className="grid grid-cols-1 gap-2">{children}</div>
    </div>
  )
}

function Field({ label, value }) {
  return (
    <div className="flex justify-between rounded-md border bg-gray-50 px-4 py-3 text-sm text-gray-700">
      <span className="font-medium">{label}</span>
      <span className="text-right font-semibold">{value || '—'}</span>
    </div>
  )
}
