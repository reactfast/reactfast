'use client'

import Image from 'next/image'
import Link from 'next/link'

const defaultPosts = [
  {
    id: 1,
    title: 'Launch Day',
    description: 'See how we launched our new feature set.',
    image: '/images/launch.jpg',
    href: '/posts/launch',
  },
  {
    id: 2,
    title: 'Customer Spotlight',
    description: 'How Acme Co grew 300% using our platform.',
    image: '/images/customer.jpg',
    href: '/posts/customer',
  },
  {
    id: 3,
    title: 'Behind the Scenes',
    description: 'Meet the engineers building your favorite tools.',
    image: '/images/team.jpg',
    href: '/posts/team',
  },
  {
    id: 4,
    title: 'New Integrations',
    description: 'Connect to tools you already love.',
    image: '/images/integrations.jpg',
    href: '/posts/integrations',
  },
  {
    id: 5,
    title: "What's Next?",
    description: 'Our roadmap for the future of your workflow.',
    image: '/images/roadmap.jpg',
    href: '/posts/roadmap',
  },
]

export default function SideScrollPosts({ obj, colors, id }) {
  return (
    <div
      id={id}
      className="scrollbar-hide mx-auto flex max-w-5xl snap-x snap-mandatory space-x-4 overflow-x-scroll px-4 py-4"
    >
      {/* Spacer at start */}
      <div className="w-[calc(50vw-100px)] shrink-0 snap-start" />

      {defaultPosts.map((post) => (
        <Link
          key={post.id}
          href={post.href}
          className="group relative h-[300px] w-[200px] shrink-0 snap-start overflow-hidden rounded-xl"
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gray-900 bg-opacity-50" />
          <div className="absolute bottom-4 left-4 z-10 text-white">
            <h3 className="text-lg font-semibold">{post.title}</h3>
            <p className="text-sm">{post.description}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
