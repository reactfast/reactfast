'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FaArrowLeft } from 'react-icons/fa6'

export default function BlogPostTemplate({ params }) {
  // You’ll eventually fetch blog data by slug here
  const { slug } = params

  const blog = {
    title: 'Designing for Delight: Why Microinteractions Matter',
    subtitle:
      'How subtle animations and feedback loops elevate user experiences from good to unforgettable.',
    author: 'Jonathon McClendon',
    date: 'October 10, 2025',
    coverImage:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1600',
    content: `
      ### Introduction

      Have you ever noticed how a tiny animation can make an app *feel* alive?

      Microinteractions are those delightful moments — a heart icon that pops when you like something, a subtle shake when your password is wrong, or a button that glows ever so slightly when you hover over it. These details may seem small, but they carry **massive UX impact**.

      ### The Psychology of Delight

      Humans are wired to notice motion and feedback. When a system acknowledges our input instantly, it builds trust and satisfaction. A smooth animation tells your users: *“I see you.”*

      ### Designing with Intent

      Each microinteraction should have a purpose:
      - Provide feedback  
      - Communicate status  
      - Prevent errors  
      - Add a touch of personality  

      When used thoughtfully, they blend aesthetics with functionality.

      ### Implementation Example

      Tools like **Framer Motion**, **Tailwind**, and **React Spring** make implementing microinteractions simple and expressive. Even a 200ms ease-in transform can make all the difference.

      ### Conclusion

      Details are not just details — they are the design. The best interfaces feel *alive*, not because of flashy visuals, but because they respond to users with care and craft.
    `,
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative mx-auto max-w-6xl px-6 pb-12 pt-20">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-gray-400 transition-colors hover:text-[#FF3908]"
        >
          <FaArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-white md:text-5xl">
            {blog.title}
          </h1>
          <p className="text-lg text-gray-300">{blog.subtitle}</p>
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
            <span>By {blog.author}</span>
            <span className="h-1 w-1 rounded-full bg-gray-500" />
            <span>{blog.date}</span>
          </div>
        </div>

        <div className="relative mt-8 h-96 w-full overflow-hidden rounded-3xl bg-gray-800">
          <Image
            src={blog.coverImage}
            alt={blog.title}
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* Blog Content */}
      <article className="mx-auto max-w-3xl px-6 py-12">
        <div
          className="prose prose-invert prose-lg prose-headings:text-white prose-a:text-[#FF3908] prose-strong:text-white max-w-none text-gray-300"
          dangerouslySetInnerHTML={{ __html: markdownToHtml(blog.content) }}
        />
      </article>

      {/* Related / Footer Section */}
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-8 text-2xl font-semibold text-white">
          Related Articles
        </h2>
        <div className="scrollbar-none flex gap-6 overflow-x-auto">
          {RelatedArticles.map((article, i) => (
            <RelatedCard key={i} article={article} />
          ))}
        </div>
      </div>
    </>
  )
}

// Simulated related content
const RelatedArticles = [
  {
    title: 'The Secret Power of Negative Space in UI Design',
    image:
      'https://images.unsplash.com/photo-1503602642458-232111445657?w=1600',
  },
  {
    title: 'Building Responsive Layouts with Tailwind Grid',
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1600',
  },
  {
    title: 'Next.js + Supabase = The Perfect Developer Stack',
    image:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600',
  },
]

// Helper to convert Markdown → HTML (simple inline, no external lib)
function markdownToHtml(markdown) {
  return markdown
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    .replace(/\n$/gim, '<br />')
    .replace(/\n/g, '<br />')
    .replace(/`([^`]+)`/gim, '<code>$1</code>')
}

// Related Article Card
function RelatedCard({ article }) {
  return (
    <div className="group relative h-64 w-80 flex-shrink-0 overflow-hidden rounded-3xl bg-[#191E24] transition-transform hover:scale-[1.02]">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-200 group-hover:scale-105"
        style={{ backgroundImage: `url(${article.image})` }}
      />
      <div className="absolute inset-0 flex items-end bg-black/60 p-4 transition-colors duration-200 group-hover:bg-[#FF3908]/80">
        <h3 className="font-semibold text-white group-hover:text-gray-900">
          {article.title}
        </h3>
      </div>
    </div>
  )
}
