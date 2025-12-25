export default async function generateDynamicMetadata(data) {
  const defaultMetadata = {
    title: data?.title || 'Default Title',
    description: data.description || 'Default description for SEO.',
    image: data?.image || 'https://yourdomain.com/default-image.jpg',
    openGraph: {
      description: data.description,
      url: data?.image || 'https://yourdomain.com/default-image.jpg',
      images: [
        {
          url: data?.image || 'https://yourdomain.com/default-image.jpg',
          width: 1200,
          height: 630,
          alt: data.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      description: data.description,
      image: 'https://yourdomain.com/default-image.jpg',
    },
  }

  return defaultMetadata
}
