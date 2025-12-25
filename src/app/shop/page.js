import Hero from '@/components/hero'
import FeaturedProducts from '@/components/featuredProducts'
import PopularProducts from '@/components/popularProducts'
import CategorySection from '@/components/categorySection'

export const metadata = {
  title: 'About | Jot.Space',
  description:
    'Learn more about Jot.Space — the smart, modern way to create digital business cards and branded link pages.',
  keywords: [
    'Jot.Space',
    'digital business cards',
    'link in bio',
    'NFC cards',
    'QR codes',
    'about jot',
    'smart networking',
  ],
  robots: 'index, follow',
  openGraph: {
    title: 'About | Jot.Space',
    description:
      'Learn more about Jot.Space — the smart, modern way to create digital business cards and branded link pages.',
    url: 'https://www.jot.space/about', // Update per page
    siteName: 'Jot.Space',
    images: [
      {
        url: 'https://www.jot.space/og-image.png', // Replace with your actual OG image
        width: 1200,
        height: 630,
        alt: 'Jot.Space preview image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About | Jot.Space',
    description:
      'Learn more about Jot.Space — the smart, modern way to create digital business cards and branded link pages.',
    images: ['https://www.jot.space/og-image.png'], // Same as Open Graph
    creator: '@jotcards',
  },
  alternates: {
    canonical: 'https://www.jot.space/about', // Match the full URL of this page
  },
}

export default function ShopPage() {
  const categories = [
    {
      title: 'Popular',
      id: '30fc1676-e912-49eb-b874-260e07fd097c',
      num: 4,
    },
    // {
    //   title: 'cards',
    //   id: '7f28b978-10b1-498d-bdf5-59074744372e',
    //   num: 4,
    // },
    // {
    //   title: 'Wearable',
    //   id: 'c118b213-861c-45f4-b4d2-8a0c78118eec',
    //   num: 4,
    // },
  ]

  return (
    <>
      <Hero />
      {categories.map((category) => (
        <CategorySection title={category.title} categoryId={category.id} />
      ))}
    </>
  )
}
