'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { FaGithub, FaPlay, FaNpm } from 'react-icons/fa6'
import { XMarkIcon } from '@heroicons/react/24/solid'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { Projects } from '../../assets/Projects'
import { returnProjectBySlug } from '../../assets/projectContent/barrel'

export default function ProjectDetailsPage() {
  const { slug } = useParams()
  const [activeMedia, setActiveMedia] = useState(null)

  // --- Lookup metadata and markdown content ---
  const project = Projects.find((p) => p.slug === slug) // metadata
  const content = returnProjectBySlug(slug)?.content // markdown

  if (!project) {
    return (
      <section className="mx-auto max-w-4xl px-6 py-32 text-center text-gray-400">
        <h1 className="text-3xl font-semibold text-white">Project Not Found</h1>
        <p className="mt-4 text-gray-500">
          We couldn’t find any project matching{' '}
          <span className="font-mono">{slug}</span>.
        </p>
      </section>
    )
  }

  const hasHeaderImage = Boolean(project.headerImage)

  return (
    <>
      {/* Header / Hero */}
      <section
        className={`relative w-full py-24 ${
          hasHeaderImage ? '' : 'bg-[#FF3908]'
        }`}
      >
        {hasHeaderImage && (
          <Image
            src={project.headerImage}
            alt={project.title}
            fill
            className="object-cover opacity-70"
          />
        )}
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <h1 className="text-4xl font-bold text-white md:text-5xl">
            {project.title}
          </h1>
          {project.dateRange && (
            <p className="mt-2 text-gray-200">{project.dateRange}</p>
          )}
          {project.description && (
            <p className="mt-6 max-w-3xl text-lg text-gray-100">
              {project.description}
            </p>
          )}

          {/* Tech badges */}
          {project.technologies?.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              {project.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="rounded-full bg-black/40 px-4 py-1.5 text-sm font-medium text-gray-100 ring-1 ring-white/10"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Optional LiveSite link */}
          {project.liveSite && (
            <Link
              href={project.liveSite}
              target="_blank"
              rel="noopener noreferrer"
              className="mr-3 mt-8 inline-flex items-center gap-2 rounded-full bg-[#10e3dc] px-5 py-3 text-lg font-semibold text-black shadow-md"
            >
              <FaPlay className="h-5 w-5" />
              View Live Site
            </Link>
          )}

          {/* Optional GitHub link */}
          {project.github && (
            <Link
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mr-3 mt-8 inline-flex items-center gap-2 rounded-full bg-[#FF3908] px-5 py-3 text-lg font-semibold text-black shadow-md transition-colors duration-200 hover:bg-[#e63900]"
            >
              <FaGithub className="h-5 w-5" />
              View GitHub Repository
            </Link>
          )}

          {/* Optional NPM link */}
          {project.npm && (
            <Link
              href={project.npm}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#cb0000] px-5 py-3 text-lg font-semibold text-white shadow-md transition-colors duration-200 hover:bg-[#a30000]"
            >
              <FaNpm className="h-5 w-5" />
              View NPM Package
            </Link>
          )}
        </div>
      </section>

      {/* Source (raw HTML, e.g., iframe) */}
      {project.source && (
        <section className="mx-auto max-w-6xl px-6 py-16">
          <div dangerouslySetInnerHTML={{ __html: project.source }} />
        </section>
      )}

      {/* Markdown content */}
      <section className="prose prose-invert prose-lg mx-auto max-w-4xl px-6 py-16">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ node, ...props }) => (
              <h1
                className="mb-4 mt-10 text-3xl font-bold text-white"
                {...props}
              />
            ),
            h2: ({ node, ...props }) => (
              <h2
                className="mb-3 mt-8 text-2xl font-semibold text-white"
                {...props}
              />
            ),
            p: ({ node, ...props }) => (
              <p className="leading-relaxed text-gray-300" {...props} />
            ),
            a: ({ node, ...props }) => (
              <a className="text-[#FF3908] hover:underline" {...props} />
            ),
            ul: ({ node, ...props }) => (
              <ul className="list-disc pl-6 text-gray-300" {...props} />
            ),
          }}
        >
          {content || ''}
        </ReactMarkdown>
      </section>

      {/* Media Gallery */}
      {project.media?.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <h2 className="mb-6 text-2xl font-semibold text-white">
            Project Media
          </h2>
          <div className="scrollbar-none flex gap-8 overflow-x-auto pb-4">
            {project.media.map((item, index) => (
              <button
                key={index}
                onClick={() => setActiveMedia(item)}
                className="group relative h-72 w-96 flex-shrink-0 overflow-hidden rounded-2xl bg-[#191E24] shadow-md transition-transform duration-300 hover:scale-105"
              >
                {item.type === 'image' ? (
                  <Image
                    src={item.src}
                    alt={item.alt || 'Project image'}
                    fill
                    className="object-cover opacity-80 transition-opacity group-hover:opacity-100"
                  />
                ) : item.type === 'vimeo' ? (
                  <div className="relative h-full w-full bg-black">
                    <iframe
                      src={item.src}
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                      className="h-full w-full object-cover opacity-70"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FF3908] bg-opacity-90 shadow-lg transition-transform group-hover:scale-110">
                        <FaPlay className="h-5 w-5 text-black" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative h-full w-full bg-black">
                    <video
                      src={item.src}
                      className="h-full w-full object-cover opacity-70"
                      muted
                      playsInline
                      preload="metadata"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FF3908] bg-opacity-90 shadow-lg transition-transform group-hover:scale-110">
                        <FaPlay className="h-5 w-5 text-black" />
                      </div>
                    </div>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-left">
                  <p className="line-clamp-2 text-sm text-gray-300">
                    {item.caption}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Modal */}
      {activeMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <button
            onClick={() => setActiveMedia(null)}
            className="absolute right-6 top-6 z-50 rounded-full bg-gray-800 p-3 text-gray-300 hover:text-white"
            aria-label="Close modal"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>

          <div className="relative max-h-[90vh] w-full max-w-5xl p-6">
            {activeMedia.type === 'image' ? (
              <Image
                src={activeMedia.src}
                alt={activeMedia.alt || 'Project image'}
                width={1600}
                height={900}
                className="h-auto w-full rounded-2xl object-contain"
              />
            ) : activeMedia.type === 'vimeo' ? (
              <div
                className="relative h-0 w-full"
                style={{ paddingBottom: '56.25%' }}
              >
                <iframe
                  src={activeMedia.src}
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  className="absolute left-0 top-0 h-full w-full rounded-2xl"
                  title="Vimeo video"
                />
              </div>
            ) : (
              <video
                src={activeMedia.src}
                controls
                className="w-full rounded-2xl"
              />
            )}
            {activeMedia.caption && (
              <p className="mt-4 text-center text-sm text-gray-400">
                {activeMedia.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  )
}
