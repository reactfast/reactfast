import Link from 'next/link'
import Image from 'next/image'
import { Projects as projs } from './assets/Projects'
import { memo } from 'react'

export default function ProjectsGridWidget() {
  // Take the first 3 projects
  const projects = projs.slice(0, 3)

  return (
    <section className="grid grid-cols-2 gap-4 px-4 md:hidden">
      {/* First card: Intro / header */}
      <IntroCard />

      {/* Remaining 3 project cards */}
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </section>
  )
}

// Mobile Project Card
const ProjectCard = memo(function ProjectCard({ project }) {
  return (
    <Link href={`/jonathon-dev/projects/${project.slug}`}>
      <div className="relative flex min-h-[200px] flex-col overflow-hidden rounded-2xl bg-[#191E24]">
        <div className="absolute inset-0 overflow-hidden rounded-2xl">
          <Image
            src={project.image}
            alt={project.title}
            width={96}
            height={96}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute bottom-0 w-full bg-[#2D3640]/70 p-3">
          <h3 className="text-sm font-semibold text-gray-200">
            {project.title}
          </h3>
          <p className="mt-1 text-xs text-gray-300">{project.description}</p>
          <span className="mt-1 block text-xs text-gray-400">
            {project.date}
          </span>
        </div>
        <div className="pb-[50%]" /> {/* maintain aspect ratio */}
      </div>
    </Link>
  )
})

// Intro / header card
function IntroCard() {
  return (
    <Link href={'/jonathon-dev/projects'}>
      <div className="group flex min-h-[200px] flex-col justify-center rounded-2xl bg-[#191E24] p-4 transition-colors duration-300 hover:bg-[#1F242B]">
        <h3 className="mb-2 text-lg font-bold text-white transition-colors duration-300 group-hover:text-[#FF3908]">
          Projects
        </h3>
        <p className="text-xs text-gray-300">
          A collection of personal and professional projects worth highlighting
          — from experiments to production builds.
        </p>
      </div>
    </Link>
  )
}
