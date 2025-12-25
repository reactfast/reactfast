'use client'
import { Stories } from './assets/Stories'

export default function ArticleWidget() {
  return (
    <section className="scrollbar-none scrollbar-thin scrollbar-thumb-[#2D3640] scrollbar-track-transparent relative w-full overflow-x-auto py-8">
      <div className="relative flex gap-8">
        {/* Left spacer: only visible on large screens */}
        <div className="hidden w-[calc((100%-theme(maxWidth.7xl))/2+theme(spacing.8))] flex-shrink-0 lg:flex" />

        {/* Intro card */}
        <PortfolioIntroCard />

        {/* Project cards */}
        {Stories.map((project, index) => (
          <PortfolioCard key={index} project={project} />
        ))}

        {/* Optional right spacer so scrolling feels natural */}
        <div className="w-10 flex-shrink-0" />
      </div>
    </section>
  )
}

// Intro / header card
function PortfolioIntroCard() {
  return (
    <div className="flex max-h-[400px] min-h-[350px] w-[600px] flex-shrink-0 flex-col justify-center rounded-3xl bg-[#191E24] p-8">
      <h3 className="mb-4 text-3xl font-bold text-white">Stories</h3>
      <p className="text-base text-gray-300">
        Explore a handpicked collection of articles and insights — from
        behind-the-scenes creative projects to in-depth technical explorations —
        highlighting design, development, and real-world problem-solving.
      </p>
    </div>
  )
}

function PortfolioCard({ project }) {
  return (
    <div className="group relative max-h-[400px] min-h-[350px] w-[600px] flex-shrink-0 overflow-hidden rounded-3xl bg-[#191E24] transition-all duration-200">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-200 group-hover:scale-105"
        style={{ backgroundImage: `url(${project.image})` }}
      />

      {/* Overlay */}
      <div className="absolute bottom-0 flex w-full flex-col justify-center bg-[#2D3640]/70 p-6 transition-all duration-200 group-hover:bg-[#FF3908] group-hover:bg-opacity-100">
        <h3 className="text-2xl font-semibold leading-snug text-gray-200 transition-colors duration-200 group-hover:text-gray-900">
          {project.title}
        </h3>
        <p className="mt-2 text-base text-gray-300 transition-colors duration-200 group-hover:text-gray-800">
          {project.description}
        </p>
        <span className="mt-2 text-sm text-gray-400 transition-colors duration-200 group-hover:text-gray-900">
          {project.date}
        </span>
      </div>

      {/* Maintains aspect ratio */}
      <div className="pb-[45%]" />
    </div>
  )
}
