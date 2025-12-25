export const themeInfo = {
  order: [],
  primary: '#0e52be',
  secondary: '',
  tertiary: '',
  quaternary: '',
  bg_color: '#1f1f1f',
  foreground_color: '#ebebeb',
  font_name: 'Inter',
  font_color: '#ffffff',
  bg_image:
    'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/images/5c1f5463-8b88-4805-b614-c05b0795b5db/1739672945544-01.jpg',
}

export function MakeSections({ formData, socialLinks, vCardFilePath }) {
  const Sections = [
    {
      sec_type: 15,
      definition: {
        profilePhoto: formData.profile_image || '',
      },
      status: 'active',
    },
    {
      sec_type: 24,
      definition: {
        skills: formData.skills || '',
      },
      status: 'active',
    },
    {
      title: 'My Personal Info',
      sec_type: 11,
      definition: {
        bio: formData.bio || '',
        name: `${formData.first_name} ${formData.last_name}`,
        email: formData.primary_email,
        website: formData.website,
        phoneNumber: formData.primary_phone,
        websiteLabel: formData.website_label || 'My Website',
      },
      status: 'active',
    },
    {
      sec_type: 16,
      definition: {
        threads: socialLinks.threads || '',
        twitter: socialLinks.twitter || '',
        linkedin: socialLinks.linkedin || '',
        instagram: socialLinks.instagram || '',
      },
      status: 'active',
    },
    {
      sec_type: 23,
      definition: {
        desc1: formData.desc1 || '',
        desc2: formData.desc2 || '',
        desc3: formData.desc3 || '',
        desc4: formData.desc4 || '',
        desc5: formData.desc5 || '',
        desc6: formData.desc6 || '',
        title1: formData.title1 || '',
        title2: formData.title2 || '',
        title3: formData.title3 || '',
        title4: formData.title4 || '',
        title5: formData.title5 || '',
        title6: formData.title6 || '',
      },
      status: 'active',
    },
    { sec_type: 6, definition: {}, status: 'active' },
    { sec_type: 8, definition: {}, status: 'active' },
    { sec_type: 10, definition: {}, status: 'active' },
  ]

  return Sections
}
