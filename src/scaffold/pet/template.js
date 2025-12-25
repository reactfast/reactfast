export const themeInfo = {
  order: [],
  primary: '#020df9', // Signature blue - used sparingly
  secondary: '#4A4A4A', // Dark gray for body text
  tertiary: '#6B6B6B', // Medium gray for supporting text
  quaternary: '#E8E8E8', // Soft gray for subtle backgrounds
  bg_color: '#ffffff', // Pure white - primary background
  foreground_color: '#FAFAFA', // Off-white - secondary background
  font_name: 'Inter',
  font_color: '#1A1A1A', // Near black - primary text
  bg_image: '',
}

function makeGallerySection(images = [], id) {
  return {
    id: id,
    definition: {
      photos: images.map((image) => ({
        src: image.src,
        alt: image.alt || 'Pet Image',
      })),
    },
    sec_type: 87,
    title: 'Gallery',
    status: 'active',
  }
}

function makeFieldSection(title, profile_fields = [], id = 0) {
  // Filter out fields with no meaningful value
  const filteredFields = profile_fields.filter(field => {
    // Skip if value is null, undefined, empty string, or default placeholders
    if (!field.value || 
        field.value === 'Unknown' || 
        field.value === 'None' || 
        field.value === '' ||
        field.value === 'No') {
      return false
    }
    return true
  })

  // Don't create section if no fields have values
  if (filteredFields.length === 0) {
    return null
  }

  const sec = {
    id: id,
    definition: {
      sectionTitle: title,
      profile_fields: filteredFields.map((field) => ({
        label: field.label,
        value: field.value,
      })),
    },
    sec_type: 83,
    title: `${title} Section`,
  }

  return sec
}

export function MakeSections(pet) {
  const profile = [
    { label: 'Age', value: pet?.age },
    { label: 'Gender', value: pet?.gender },
    { label: 'Size', value: pet?.size },
    { label: 'Hair Length', value: pet?.hair_length },
    { label: 'Hair Color', value: pet?.hair_color },
    { label: 'Breed', value: pet?.breed },
    { label: 'Weight', value: pet?.weight },
    { label: 'Eye Color (Left)', value: pet?.eye_color_left || pet?.eye_color },
    { label: 'Eye Color (Right)', value: pet?.eye_color_right },
  ]

  const behavior = [
    { label: 'House Trained', value: pet?.house_trained === true ? 'Yes' : null },
    { label: 'Good with Kids', value: pet?.good_with_kids === true ? 'Yes' : null },
    { label: 'Good with Cats', value: pet?.good_with_cats === true ? 'Yes' : null },
    { label: 'Good with Dogs', value: pet?.good_with_dogs === true ? 'Yes' : null },
    { label: 'Good with Men', value: pet?.good_with_men === true ? 'Yes' : null },
    { label: 'Good with Women', value: pet?.good_with_women === true ? 'Yes' : null },
    { label: 'Favorite Foods', value: pet?.favorite_food || pet?.favorite_snack },
    { label: 'No Pet Zones', value: pet?.no_pet_zones },
    { label: 'Favorite Petting Spot', value: pet?.fav_petting_spot },
    { label: 'Known Commands', value: pet?.known_commands },
  ]

  const medicalSocial = [
    { label: 'Spayed/Neutered', value: pet?.spayed_neutered === true ? 'Yes' : null },
    { label: 'Vaccinated', value: pet?.vaccinated === true ? 'Yes' : null },
    { label: 'Last Vet Visit', value: pet?.last_vet_visit },
    { label: 'Dietary Restrictions', value: pet?.dietary_restrictions },
    { label: 'Allergies', value: pet?.allergies },
    { label: 'Hypoallergenic', value: pet?.hypoallergenic === true ? 'Yes' : null },
    { label: 'Service Animal', value: pet?.service_animal === true ? 'Yes' : null },
    { label: 'Medical Notes', value: pet?.medical_notes },
    { label: 'Medications', value: pet?.medications },
    { label: 'Medical Alerts', value: pet?.medical_alerts },
    { label: 'Primary Veterinarian', value: pet?.primary_vet_info },
  ]

  const ChipId = [{ label: 'Microchip', value: pet?.chip_id }]

  // Create sections and filter out nulls
  const sections = [
    {
      id: 1,
      page: 107,
      definition: {
        name: pet?.name,
        breed: pet?.breed,
        type: pet?.type,
        color: pet?.hair_color,
        lost: pet?.lost,
        gender: pet.gender,
        age: pet?.age,
        size: pet?.size,
        weight: pet?.weight,
        about: pet?.about || 'No description provided.',
        image:
          pet?.photos && pet.photos.length > 0
            ? pet.photos[0].src
            : 'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/images/5c1f5463-8b88-4805-b614-c05b0795b5db/1752943065222-lijo_44179_a_3d_simple_style_bitmoji_dog_cartoon_rounded_white__b7508e76-ab3f-43a8-a019-0cafd474c0d8.webp',
      },
      sec_type: 85,
      title: 'Social Header',
      status: 'active',
    },
    {
      id: 2,
      page: 107,
      definition: {},
      sec_type: 86,
      title: 'Menu Buttons',
      status: 'active',
    },
    makeGallerySection(pet?.photos, 3),
    makeFieldSection('Profile', profile, 4),
    makeFieldSection('Behavioral', behavior, 5),
    makeFieldSection('Medical', medicalSocial, 6),
    makeFieldSection('Chip ID', ChipId, 7),
  ]

  // Filter out null sections (sections with no data)
  return sections.filter(section => section !== null)
}

export function getPreview() {
  const pet = {
    name: 'Lucy',
    breed: 'Pomeranian',
    size: 'sm',
    weight: '10.5lb',
    likes_men: 'No',
    likes_women: 'Yes',
    likes_kids: 'Yes',
    spayed_neutered: 'Yes',
    Microchipped: 'Yes',
    photos: [
      {
        src: 'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics/placeholders/IMG_3082%202.jpg',
      },
      {
        src: 'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics/placeholders/IMG_3083%202.jpg',
      },
      {
        src: 'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics/placeholders/IMG_3084%202.jpg',
      },
      {
        src: 'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics/placeholders/IMG_3085%202.jpg',
      },
      {
        src: 'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics/placeholders/IMG_3086%202.jpg',
      },
      {
        src: 'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics/placeholders/IMG_3087%203.jpg',
      },
      {
        src: 'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics/placeholders/IMG_3088%202.jpg',
      },
      {
        src: 'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics/placeholders/IMG_3089%202.jpg',
      },
    ],
  }

  const sections = MakeSections(pet)

  return sections
}
