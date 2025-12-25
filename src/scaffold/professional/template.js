export const themeInfo = {
  order: [],
  primary: '#1a5ecb',
  secondary: '#09fbeb',
  tertiary: '#869419',
  quaternary: '6fad25',
  bg_color: '#ffffff',
  foreground_color: '#27272a',
  font_name: 'Playfair_Display',
  font_color: '#000000',
}

export function MakeSections() {
  const Sections = [
    {
      definition: {
        name: 'Jessica Burks',
        line2: 'Business Professional',
        profileImg:
          'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/images/5c1f5463-8b88-4805-b614-c05b0795b5db/1749588435414-lijo_44179_a_business_profesinal_headshot_of_a_woman_wearing_a__0e4e400a-41e1-4792-9459-1937a043b3c5.webp',
      },
      sec_type: 62,
      title: 'ProfileImg2 1',
      status: 'active',
    },
    {
      definition: {
        title: 'LinkedIn',
        rounded: 'none',
        btnColor: '#ffffff',
        fontSize: '2xl',
        fontColor: '#000000',
        fontWeight: 'medium',
        borderColor: '#000000',
        borderWidth: '1',
      },
      sec_type: 63,
      title: 'LinkedIn',
      status: 'active',
    },
    {
      definition: {
        title: 'Facebook',
        rounded: 'none',
        btnColor: '#ffffff',
        fontSize: '2xl',
        fontColor: '#000000',
        fontWeight: 'medium',
        borderColor: '#000000',
        borderWidth: '1',
      },
      sec_type: 63,
      title: 'Facebook',
      status: 'active',
    },
    {
      definition: {
        tiktok: 's',
        twitter: 's',
        facebook: 's',
        instagram: 's',
      },
      sec_type: 53,
      title: 'FooterSocials 1',
      status: 'active',
    },
    {
      definition: {},
      sec_type: 17,
      title: 'Banner Image 1',
      status: 'active',
    },
  ]

  return Sections
}

// Helper function to get a preview with dummy data
export function getPreview() {
  const Sections = [
    {
      definition: {
        name: 'Jessica Burks',
        line2: 'Business Professional',
        profileImg:
          'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/images/5c1f5463-8b88-4805-b614-c05b0795b5db/1749588435414-lijo_44179_a_business_profesinal_headshot_of_a_woman_wearing_a__0e4e400a-41e1-4792-9459-1937a043b3c5.webp',
      },
      sec_type: {
        id: 62,
        name: 'ProfileImg2',
        component_name: 'ProfileImg2',
        status: 'active',
        folder_name: 'digitalBusinessCard',
        icon: 'RectangleStackIcon',
        tags: 'Popular',
        version: 2,
        definition: [
          {
            name: 'profileImg',
            type: 'file',
            title: 'Profile Image',
            value: 'STRING',
          },
          { name: 'name', type: 'string', title: 'Username', value: 'STRING' },
          { name: 'line2', type: 'string', title: 'Line 2', value: 'STRING' },
        ],
      },
      title: 'ProfileImg2 1',
      status: 'active',
    },
    {
      definition: {
        title: 'LinkedIn',
        rounded: 'none',
        btnColor: '#ffffff',
        fontSize: '2xl',
        fontColor: '#000000',
        fontWeight: 'medium',
        borderColor: '#000000',
        borderWidth: '1',
      },
      sec_type: {
        id: 63,
        name: 'Button',
        component_name: 'SuperBtn',
        status: 'active',
        folder_name: 'digitalBusinessCard',
        icon: 'RectangleStackIcon',
        tags: 'Customize',
        version: 2,
        definition: [], // Omitted for brevity — this has over 30 fields
      },
      title: 'LinkedIn',
      status: 'active',
    },
    {
      definition: {
        title: 'Facebook',
        rounded: 'none',
        btnColor: '#ffffff',
        fontSize: '2xl',
        fontColor: '#000000',
        fontWeight: 'medium',
        borderColor: '#000000',
        borderWidth: '1',
      },
      sec_type: {
        id: 63,
        name: 'Button',
        component_name: 'SuperBtn',
        status: 'active',
        folder_name: 'digitalBusinessCard',
        icon: 'RectangleStackIcon',
        tags: 'Customize',
        version: 2,
        definition: [], // Omitted for brevity — same as above
      },
      title: 'Facebook',
      status: 'active',
    },
    {
      definition: {
        tiktok: 's',
        twitter: 's',
        facebook: 's',
        instagram: 's',
      },
      sec_type: {
        id: 53,
        name: 'FooterSocials',
        component_name: 'FooterSocials',
        status: 'active',
        folder_name: 'digitalBusinessCard',
        icon: 'LinkIcon',
        tags: '',
        version: 1,
        definition: [
          { name: 'twitter', type: 'string', title: 'Twitter Profile Link' },
          { name: 'linkedin', type: 'string', title: 'LinkedIn Profile Link' },
          {
            name: 'instagram',
            type: 'string',
            title: 'Instagram Profile Link',
          },
          { name: 'facebook', type: 'string', title: 'Facebook Profile Link' },
          { name: 'tiktok', type: 'string', title: 'TikTok Profile Link' },
          { name: 'github', type: 'string', title: 'GitHub Profile Link' },
          { name: 'spotify', type: 'string', title: 'Spotify Profile Link' },
          { name: 'title', type: 'string', title: 'Section Title' },
        ],
      },
      title: 'FooterSocials 1',
      status: 'active',
    },
    {
      definition: {},
      sec_type: {
        id: 17,
        name: 'Banner Image',
        component_name: 'Banner_1',
        status: 'active',
        folder_name: 'digitalBusinessCard',
        icon: 'RectangleStackIcon',
        tags: 'Popular',
        version: 2,
        definition: [
          {
            name: 'img',
            type: 'file',
            title: 'Banner Image',
            description: 'requires full URL path including https://',
          },
        ],
      },
      title: 'Banner Image 1',
      status: 'active',
    },
  ]

  return Sections
}
