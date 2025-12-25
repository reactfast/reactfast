import Image from 'next/image'
import Link from 'next/link'
import { Projects } from '../assets/Projects'
import ProjectsGrid from './ProjectsGrid'


export default function ProjectsWrapper() {
  // const featured = {
  //   title: 'BoopTag',
  //   description:
  //     "Smart QR/NFC pet tags e-commerce store and profile builder. Store life saving information about your pet where it wouldn't fit before.",
  //   date: '2025',
  //   image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800',
  //   slug: 'visionary-ai-studio',
  // }

  // Server-side data fetching - no client-side state needed
  const projects = Projects

  return (
    <>
      {/* Featured Project */}
      {/* <section className="mx-auto max-w-6xl px-6 py-20">
        <h1 className="mb-10 text-4xl font-bold text-white md:text-5xl">
          Projects
        </h1>

        <Link href={`/jonathon-dev/projects/${featured.slug}`}>
          <div className="group relative h-[250px] overflow-hidden rounded-3xl bg-[#191E24] sm:h-[350px] md:h-[400px]">
            <Image
              src={featured.image}
              alt={featured.title}
              width={800}
              height={400}
              className="h-full w-full object-cover transition-all duration-300 group-hover:opacity-90"
              loading="lazy"
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 sm:p-8">
              <p className="mb-2 text-sm uppercase tracking-wide text-gray-400">
                Featured Project
              </p>
              <h2 className="mb-2 text-2xl font-semibold text-white sm:text-3xl">
                {featured.title}
              </h2>
              <p className="mb-2 text-sm text-gray-300 sm:text-base">
                {featured.description}
              </p>
              <span className="inline-flex items-center gap-2 font-semibold text-[#FF3908] hover:underline">
                View Project <FaArrowRightLong className="h-4 w-4" />
              </span>
            </div>
          </div>
        </Link>
      </section> */}

      {/* Projects Grid - Server-side rendered wrapper */}
      <div className="mx-auto max-w-6xl px-6 pb-24 pt-36">
        <ProjectsGrid projects={projects} />
      </div>
    </>
  )
}
