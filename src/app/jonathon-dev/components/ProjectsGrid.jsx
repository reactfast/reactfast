'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function ProjectsGrid({ projects }) {
  // Save props as state for safe handling
  const [projectsState, setProjectsState] = useState(projects || [])

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projectsState.map((project) => (
        <Link
          key={project?.slug || Math.random()} // Safe key handling
          href={`/jonathon-dev/projects/${project?.slug || '#'}`}
          className="group relative overflow-hidden rounded-3xl bg-[#191E24] shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          {/* Image */}
          <div className="relative h-48 w-full overflow-hidden">
            {project?.image ? (
              <Image
                src={project.image}
                alt={project?.title || 'Project image'}
                width={96}
                height={96}
                className="h-auto w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-800 text-gray-400">
                No Image
              </div>
            )}
          </div>

          {/* Overlay */}
          <div className="space-y-1 p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-[#FF3908]">
              {project?.title || 'Untitled Project'}
            </h3>
            <p className="text-xs text-gray-400">
              {project?.date || 'No date'}
            </p>
            <p className="line-clamp-2 text-sm text-gray-300">
              {project?.description || project?.content?.slice(0, 100) || 'No description available'}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}
