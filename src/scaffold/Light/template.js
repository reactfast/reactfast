export const themeInfo = {
  order: [],
  primary: '#0e52be',
  secondary: '',
  tertiary: '',
  quaternary: '',
  bg_color: '#1f1f1f',
  foreground_color: '#ebebeb',
  font_name: 'Inter',
  font_color: '#000000',
  bg_image:
    'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/images/jot-backgrounds/03.jpg',
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

// Helper function to get a preview with dummy data
export function getPreview() {
  const Sections = [
    {
      id: 51,
      created_at: '2025-01-24T21:52:00.892765+00:00',
      page: 18,
      definition: {
        profilePhoto:
          'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/images/5c1f5463-8b88-4805-b614-c05b0795b5db/1738638410718-IMG_3589%201.png',
      },
      sec_type: {
        id: 15,
        num: null,
        icon: 'RectangleStackIcon',
        name: 'Profile',
        tags: null,
        type: null,
        status: 'active',
        version: 2,
        created_at: '2024-12-28T21:03:51.359259+00:00',
        definition: [
          {
            name: 'profilePhoto',
            type: 'file',
            title: 'Profile Photo',
            description: 'requires full URL path including https://',
          },
          {
            name: 'backgroundImage',
            type: 'file',
            title: 'Background Image',
            description: 'requires full URL path including https://',
          },
          {
            name: 'backgroundPositionX',
            type: 'number',
            title: 'Background Position X',
            description: 'Enter a number for X position',
          },
          {
            name: 'backgroundPositionY',
            type: 'number',
            title: 'Background Position Y',
            description: 'Enter a number for Y position',
          },
        ],
        folder_name: 'digitalBusinessCard',
        preview_url: null,
        component_name: 'Header_1',
      },
      title: 'Profile Image',
      status: 'active',
      user_id: '5c1f5463-8b88-4805-b614-c05b0795b5db',
    },
    {
      id: 106,
      created_at: '2025-02-18T03:42:37.045625+00:00',
      page: 18,
      definition: {
        skills: 'Node.js;NEXT.js;SQL',
      },
      sec_type: {
        id: 24,
        num: '',
        icon: 'RectangleStackIcon',
        name: 'Simple Skills',
        tags: null,
        type: '',
        status: 'active',
        version: 1,
        created_at: '2025-02-18T03:41:36.946347+00:00',
        definition: [
          {
            name: 'skills',
            type: 'string',
            title: 'Skills',
            description: 'separate each skill with ;',
          },
        ],
        folder_name: 'digitalBusinessCard',
        preview_url: '',
        component_name: 'SimpleSkills',
      },
      title: 'Skills List',
      status: 'active',
      user_id: '5c1f5463-8b88-4805-b614-c05b0795b5db',
    },
    {
      id: 35,
      created_at: '2025-01-11T22:29:09.496596+00:00',
      page: 18,
      definition: {
        bio: 'From Hollywood to high-tech, Jonathon McClendon has spent his life mastering storytelling and innovation.\n\nFrom ages 10-24, he starred on Disney, Nickelodeon, NCIS, and Days of Our Lives. By 20, he pivoted to software engineering, channeling his creativity into building digital experiences. Now, as the founder of Jot.Space, he’s redefining how people connect and share their identities online.\n\nBlending entertainment and technology, Jonathon turns ideas into impactful, seamless experiences—both on-screen and in code.',
        name: 'Jonathon McClendon',
        email: 'jonathonsmcclendon@gmail.com',
        title: '(Jot Founder)',
        website: 'https://jonathon-dev.vercel.app/',
        phoneNumber: '(817) 395-8344',
        websiteLabel: 'JonathonDev Website',
      },
      sec_type: {
        id: 11,
        num: null,
        icon: 'RectangleStackIcon',
        name: 'User Info 1',
        tags: null,
        type: null,
        status: 'active',
        version: 2,
        created_at: '2024-12-28T00:16:53.943062+00:00',
        definition: [
          {
            name: 'name',
            type: 'string',
            title: 'Name',
          },
          {
            name: 'title',
            type: 'string',
            title: 'Title',
          },
          {
            name: 'email',
            type: 'string',
            title: 'Email',
          },
          {
            name: 'phoneNumber',
            type: 'string',
            title: 'Phone Number',
          },
          {
            name: 'bio',
            type: 'text',
            title: 'Bio',
          },
          {
            name: 'website',
            type: 'string',
            title: 'Website URL',
            description: 'requires full URL path including https://',
          },
          {
            name: 'websiteLabel',
            type: 'string',
            title: 'Website Label',
          },
        ],
        folder_name: 'digitalBusinessCard',
        preview_url: null,
        component_name: 'InfoSection1',
      },
      title: 'Contact Info',
      status: 'active',
      user_id: '5c1f5463-8b88-4805-b614-c05b0795b5db',
    },
    {
      id: 58,
      created_at: '2025-01-27T22:15:25.261768+00:00',
      page: 18,
      definition: {
        iconBg: '#ffffff',
        threads: '',
        twitter: '#',
        linkedin: '#',
        instagram: '#',
      },
      sec_type: {
        id: 16,
        num: null,
        icon: 'LinkIcon',
        name: 'Social Apps',
        tags: null,
        type: null,
        status: 'active',
        version: 2,
        created_at: '2025-01-06T19:55:59.052892+00:00',
        definition: [
          {
            name: 'twitter',
            type: 'string',
            title: 'twitter',
            description: 'requires full URL path including https://',
          },
          {
            name: 'linkedin',
            type: 'string',
            title: 'linkedin',
            description: 'requires full URL path including https://',
          },
          {
            name: 'instagram',
            type: 'string',
            title: 'instagram',
            description: 'requires full URL path including https://',
          },
          {
            name: 'threads',
            type: 'string',
            title: 'threads',
            description: 'requires full URL path including https://',
          },
          {
            name: 'facebook',
            type: 'string',
            title: 'facebook',
            description: 'requires full URL path including https://',
          },
          {
            name: 'tiktok',
            type: 'string',
            title: 'tiktok',
            description: 'requires full URL path including https://',
          },
          {
            name: 'github',
            type: 'string',
            title: 'github',
            description: 'requires full URL path including https://',
          },
          {
            name: 'spotify',
            type: 'string',
            title: 'spotify',
            description: 'requires full URL path including https://',
          },
          {
            name: 'showTitles',
            type: 'boolean',
            title: 'Show Titles',
            description: 'Show titles below the icons',
          },
          {
            name: 'titleColor',
            type: 'color',
            title: 'Title Color',
            description: 'Color of the titles below the icons',
          },
          {
            name: 'iconBg',
            type: 'color',
            title: 'Icon Background Color',
            description: 'Background color of the icons',
          },
        ],
        folder_name: 'digitalBusinessCard',
        preview_url: null,
        component_name: 'socials_1',
      },
      title: 'Social Links',
      status: 'active',
      user_id: '5c1f5463-8b88-4805-b614-c05b0795b5db',
    },
  ]

  return Sections
}
