import Image from 'next/image'
import { Projects } from './assets/Projects'
import Link from 'next/link'
import { memo } from 'react'

// ✅ Limit number of projects displayed for Safari stability
const MAX_PROJECTS = 3

export default function ProjectsWidget() {
  return (
    <>
      <section className="scrollbar-none scrollbar-thin scrollbar-thumb-[#2D3640] scrollbar-track-transparent relative hidden w-full overflow-x-auto md:inline-block">
        <div className="relative flex gap-6 pl-4">
          {/* Left spacer - simplified */}
          <div className="hidden w-24 flex-shrink-0 lg:flex"></div>

          {/* Cards */}
          <IntroCard />
          {Projects.slice(0, MAX_PROJECTS).map((article) => (
            <ArticlesCard key={article.slug} article={article} />
          ))}

          <div className="w-10 flex-shrink-0"></div>
        </div>
      </section>
    </>
  )
}

// Intro / header card
function IntroCard() {
  return (
    <Link href={'/jonathon-dev/projects'}>
      <div className="group flex min-h-[280px] w-72 flex-shrink-0 flex-col justify-center rounded-2xl bg-[#191E24] p-6 transition-colors duration-300 hover:bg-[#1F242B]">
        <h3 className="mb-2 text-xl font-bold text-white transition-colors duration-300 group-hover:text-[#FF3908]">
          Projects
        </h3>
        <p className="text-sm text-gray-300">
          A collection of personal and professional projects worth highlighting
          — from experiments to production builds.
        </p>
      </div>
    </Link>
  )
}

const ArticlesCard = memo(function ArticlesCard({ article }) {
  return (
    <Link href={'/jonathon-dev/projects/' + article.slug}>
      <div className="group relative min-h-[280px] w-72 flex-shrink-0 overflow-hidden rounded-2xl bg-[#191E24] transition-all duration-200">
        {/* Background Image */}
        <div className="absolute inset-0 overflow-hidden rounded-md">
          <Image
            src={article.image}
            alt={article.title}
            height={96}
            width={96}
            className="h-full w-full object-cover transition-opacity duration-200 group-hover:opacity-90"
          />
        </div>

        {/* Info Overlay */}
        <div className="absolute bottom-0 flex w-full flex-col justify-center bg-[#2D3640]/70 p-3 transition-all duration-200 group-hover:bg-[#FF3908] group-hover:bg-opacity-100">
          <h3 className="text-base font-semibold leading-snug text-gray-200 transition-colors duration-200 group-hover:text-gray-900">
            {article.title}
          </h3>
          <p className="mt-1 text-xs text-gray-300 transition-colors duration-200 group-hover:text-gray-800">
            {article.description}
          </p>
          <span className="mt-1 block text-xs text-gray-400 transition-colors duration-200 group-hover:text-gray-900">
            {article.date}
          </span>
        </div>

        {/* Maintains card aspect ratio */}
        <div className="pb-[66%]" />
      </div>
    </Link>
  )
})
