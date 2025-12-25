'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FaArrowRightLong } from 'react-icons/fa6'
import { Stories } from '../assets/Stories'

export default function BlogIndexPage() {
  const featured = {
    title: 'Designing for Delight: Why Microinteractions Matter',
    description:
      'How subtle animations and feedback loops elevate user experiences from good to unforgettable.',
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1600',
    slug: 'microinteractions-matter',
    date: 'October 10, 2025',
  }

  const posts = Stories

  return (
    <>
      {/* Featured Story */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h1 className="mb-10 text-4xl font-bold text-white md:text-5xl">
          Blog
        </h1>

        <div className="relative overflow-hidden rounded-3xl bg-[#191E24]">
          <div className="relative h-[400px] w-full">
            <Image
              src={featured.image}
              alt={featured.title}
              fill
              className="object-cover opacity-70 transition-all duration-300 hover:opacity-90"
            />
          </div>

          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/30 to-transparent p-8">
            <div className="max-w-3xl">
              <p className="mb-2 text-sm uppercase tracking-wide text-gray-400">
                Featured Story
              </p>
              <h2 className="mb-3 text-3xl font-semibold text-white">
                {featured.title}
              </h2>
              <p className="mb-4 text-gray-300">{featured.description}</p>
              <Link
                href={`/blog/${featured.slug}`}
                className="inline-flex items-center gap-2 font-semibold text-[#FF3908] hover:underline"
              >
                Read Article <FaArrowRightLong className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="relative mx-auto max-w-4xl px-6 pb-24">
        <div className="absolute left-6 top-0 h-full w-[2px] bg-gradient-to-b from-[#FF3908] via-[#FF3908]/40 to-transparent md:left-1/2 md:-translate-x-1/2" />

        <div className="space-y-16">
          {posts.map((post, i) => (
            <div
              key={i}
              className={`relative flex flex-col md:flex-row md:items-center ${
                i % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Connector dot */}
              <div className="absolute left-[22px] top-6 z-10 h-4 w-4 rounded-full bg-[#FF3908] shadow-md md:left-1/2 md:-translate-x-1/2" />

              {/* Image */}
              <div className="relative h-60 w-full overflow-hidden rounded-2xl bg-gray-800 shadow-md md:w-1/2">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Text */}
              <div
                className={`mt-6 md:mt-0 md:w-1/2 md:px-10 ${
                  i % 2 === 0 ? 'md:text-left' : 'md:text-right'
                }`}
              >
                <p className="text-sm text-gray-400">{post.date}</p>
                <h3 className="mt-2 text-2xl font-semibold text-white">
                  {post.title}
                </h3>
                <p className="mt-2 text-gray-300">{post.description}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-4 inline-flex items-center gap-2 font-semibold text-[#FF3908] hover:underline"
                >
                  Read more <FaArrowRightLong className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
