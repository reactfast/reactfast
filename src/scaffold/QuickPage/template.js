export const themeInfo = {
  order: [],
  primary: '#AB00C2',
  secondary: '#CC0000',
  tertiary: '#E06500',
  quaternary: '#F1F505',
  bg_color: '#212121',
  foreground_color: '#27272a',
  font_name: 'Montserrat',
  font_color: '#ffffff',
  bg_image: '',
}

export function MakeSections({ formData, socialLinks, vCardFilePath }) {
  const fullName =
    `${formData.first_name || ''} ${formData.last_name || ''}`.trim()

  const Sections = [
    {
      definition: {
        title: formData.title || formData.bio || '',
        username: fullName || 'Unnamed User',
        businessName: formData.business_name || '',
        profileImageUrl: formData.profile_image || '',
      },
      sec_type: 35, // EthProfile
      title: 'Profile',
      status: 'active',
    },
    {
      definition: {
        img: formData.business_logo || '',
      },
      sec_type: 37, // EthImgCard
      title: 'Brand Logo',
      status: 'active',
    },
    {
      definition: {
        href: vCardFilePath || '',
        btnText: 'Download Contact',
        download: true,
      },
      sec_type: 32, // EthBtnAlt
      title: 'Download Contact Card',
      status: 'active',
    },
    {
      definition: {
        email: formData.primary_email || '',
        phone: formData.primary_phone || '',
        location: formData.location || formData.city_state || '',
      },
      sec_type: 33, // EthContact
      title: 'Contact Info',
      status: 'active',
    },
    {
      definition: {
        href: formData.website || '',
        btnText: formData.website_label || 'Visit Website',
        download: false,
      },
      sec_type: 31, // EthBtn
      title: 'Website Link',
      status: 'active',
    },
    {
      definition: {
        linkedin: socialLinks.linkedin || '',
        instagram: socialLinks.instagram || '',
        twitter: socialLinks.twitter || '',
        threads: socialLinks.threads || '',
        titleColor: '#ffffff',
        iconBg: '#000000',
      },
      sec_type: 16, // Assuming EthSocial type
      title: 'Social Profiles',
      status: 'active',
    },
  ]

  return Sections
}

// Helper function to get a preview with dummy data
export function getPreview() {
  const Sections = [
    {
      id: 2,
      created_at: '2025-03-22T00:00:00.000Z',
      page: 1,
      definition: {
        title: 'Sample Title',
        username: 'Jane Smith',
        businessName: 'Sample Business Inc.',
        profileImageUrl:
          'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics//lijo_44179_a_business_profesinal_headshot_of_a_man_wearing_a_su_3af26eac-9dff-48a8-86fc-246af164842d.webp',
      },
      sec_type: {
        id: 2,
        num: '',
        icon: 'RectangleStackIcon',
        name: 'Profile Card with Banner',
        tags: null,
        type: '',
        status: 'active',
        version: 2,
        created_at: '2025-03-22T00:00:00.000Z',
        definition: [
          { name: 'username', type: 'string', title: 'Username' },
          { name: 'title', type: 'string', title: 'Title' },
          { name: 'businessName', type: 'string', title: 'Business Name' },
          { name: 'profileImageUrl', type: 'file', title: 'Profile Image URL' },
          {
            name: 'profileImageAltText',
            type: 'string',
            title: 'Profile Image Alt Text',
          },
          { name: 'bannerImageUrl', type: 'file', title: 'Banner Image URL' },
          {
            name: 'bannerImageAltText',
            type: 'string',
            title: 'Banner Image Alt Text',
          },
        ],
        folder_name: 'digitalBusinessCard',
        preview_url: '',
        component_name: 'EthProfile',
      },
      title: 'Eth Profile Sample',
      status: 'active',
      user_id: 'user-123',
    },
    {
      id: 3,
      created_at: '2025-03-22T00:00:00.000Z',
      page: 1,
      definition: {
        img: 'https://example.com/path/to/logo.png',
      },
      sec_type: {
        id: 3,
        num: '',
        icon: 'RectangleStackIcon',
        name: 'Image Card',
        tags: null,
        type: '',
        status: 'active',
        version: 2,
        created_at: '2025-03-22T00:00:00.000Z',
        definition: [
          { name: 'img', type: 'file', title: 'Image' },
          { name: 'opacity', type: 'number', title: 'Opacity' },
          { name: 'bgBlur', type: 'number', title: 'Blur Effect %' },
        ],
        folder_name: 'digitalBusinessCard',
        preview_url: '',
        component_name: 'EthImgCard',
      },
      title: 'Eth Image Card Sample',
      status: 'active',
      user_id: 'user-123',
    },
    {
      id: 4,
      created_at: '2025-03-23T00:00:00.000Z',
      page: 1,
      definition: {
        href: 'https://example.com/sample.vcf',
        btnText: 'Download Contact',
        download: true,
      },
      sec_type: {
        id: 4,
        num: '',
        icon: 'RectangleStackIcon',
        name: 'Gradient Button',
        tags: 'Theme',
        type: '',
        status: 'active',
        version: 2,
        created_at: '2025-03-22T00:00:00.000Z',
        definition: [
          { name: 'btnText', type: 'string', title: 'Button Text' },
          { name: 'href', type: 'string', title: 'Button Link' },
          { name: 'download', type: 'boolean', title: 'Download Button' },
        ],
        folder_name: 'digitalBusinessCard',
        preview_url: '',
        component_name: 'EthBtnAlt',
      },
      title: 'Eth Button Alt Sample',
      status: 'active',
      user_id: 'user-123',
    },
    {
      id: 5,
      created_at: '2025-03-22T00:00:00.000Z',
      page: 1,
      definition: {
        email: 'example@example.com',
        phone: '123-456-7890',
        location: 'Sample City, ST',
      },
      sec_type: {
        id: 5,
        num: '',
        icon: 'RectangleStackIcon',
        name: 'Contact Card',
        tags: null,
        type: '',
        status: 'active',
        version: 2,
        created_at: '2025-03-22T00:00:00.000Z',
        definition: [
          { name: 'title', type: 'string', title: 'Section Title' },
          { name: 'email', type: 'string', title: 'Email Address' },
          { name: 'phone', type: 'string', title: 'Phone Number' },
          { name: 'location', type: 'string', title: 'Location' },
          { name: 'opacity', type: 'number', title: 'Opacity' },
          { name: 'bgBlur', type: 'number', title: 'Blur Effect %' },
        ],
        folder_name: 'digitalBusinessCard',
        preview_url: '',
        component_name: 'EthContact',
      },
      title: 'Eth Contact Sample',
      status: 'active',
      user_id: 'user-123',
    },
    {
      id: 6,
      created_at: '2025-03-22T00:00:00.000Z',
      page: 1,
      definition: {
        href: 'https://example.com',
        btnText: 'Visit Our Website',
        download: false,
      },
      sec_type: {
        id: 6,
        num: '',
        icon: 'RectangleStackIcon',
        name: 'Gradient Border Button',
        tags: 'color,rounded,theme',
        type: '',
        status: 'active',
        version: 2,
        created_at: '2025-03-22T00:00:00.000Z',
        definition: [
          { name: 'btnText', type: 'string', title: 'Button Text' },
          { name: 'href', type: 'string', title: 'Button Link' },
          { name: 'download', type: 'boolean', title: 'Download Button' },
          { name: 'opacity', type: 'number', title: 'Opacity' },
          { name: 'bgBlur', type: 'number', title: 'Blur Effect %' },
        ],
        folder_name: 'digitalBusinessCard',
        preview_url: '',
        component_name: 'EthBtn',
      },
      title: 'Eth Button Sample',
      status: 'active',
      user_id: 'user-123',
    },
  ]

  return Sections
}
