import { CheckCircleIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import ProjectWidget from './projectWidget'
import WorkHistorySection from './workHistorySection'
import {
  FaGithub,
  FaInstagram,
  FaXTwitter,
  FaMedium,
  FaLinkedin,
  FaThreads,
} from 'react-icons/fa6'
import { dev } from './assets/Developer'
import MobileProjectWidget from './mobileProjectWidget'

export default function page() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-3">
          {/* Image + Button + Socials */}
          <div className="order-first flex flex-col items-center gap-6 md:order-last md:col-span-1">
            {/* Image Wrapper */}
            <div className="relative h-[500px] w-full overflow-hidden rounded-2xl sm:h-[500px] md:h-full">
              <Image
                src={
                  'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/images/5c1f5463-8b88-4805-b614-c05b0795b5db/portfolio/ProfileImg.png'
                }
                alt="Jonathon McClendon"
                height={96}
                width={96}
                className="h-auto w-full object-cover"
                priority
              />
            </div>

            {/* Button */}
            <a
              type="button"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#FF3908] px-5 py-3 text-lg font-semibold text-black shadow-md transition-colors duration-200 hover:bg-[#e63900]"
              href="/resume.pdf"
              download="Jonathon_McClendon_Resume.pdf"
            >
              <CheckCircleIcon className="h-6 w-6" />
              Download CV
            </a>

            {/* Socials */}
            <div className="mt-6 flex gap-4">
              <a href={dev.github} target="_blank" rel="noopener noreferrer">
                <FaGithub className="h-6 w-6 text-gray-300 transition-colors hover:text-[#FF3908]" />
              </a>
              <a href={dev.medium} target="_blank" rel="noopener noreferrer">
                <FaMedium className="h-6 w-6 text-gray-300 transition-colors hover:text-[#FF3908]" />
              </a>
              <a href={dev.instagram} target="_blank" rel="noopener noreferrer">
                <FaInstagram className="h-6 w-6 text-gray-300 transition-colors hover:text-[#FF3908]" />
              </a>
              <a href={dev.twitter} target="_blank" rel="noopener noreferrer">
                <FaXTwitter className="h-6 w-6 text-gray-300 transition-colors hover:text-[#FF3908]" />
              </a>
              <a href={dev.threads} target="_blank" rel="noopener noreferrer">
                <FaThreads className="h-6 w-6 text-gray-300 transition-colors hover:text-[#FF3908]" />
              </a>
              <a href={dev.linkedIn} target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="h-6 w-6 text-gray-300 transition-colors hover:text-[#FF3908]" />
              </a>
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-6 md:col-span-2">
            <h1 className="text-4xl font-bold text-white md:text-5xl">
              Software Engineer, Product Designer, and Avid Gamer.
            </h1>
            <p className="text-lg font-medium text-gray-300">
              I traded my early high school graduation cap for a laptop and dove
              headfirst into the world of coding. My journey began with HTML,
              CSS, and JavaScript on platforms like Udemy, Zenva, and YouTube.
              Realizing I had found my true calling, I honed my skills at
              Flatiron School, mastering Ruby, Sinatra, Rails, SQL, Node, and
              React.
            </p>
            <p className="text-lg font-medium text-gray-300">
              Since then, I’ve been the secret sauce behind countless production
              builds in Rails, Next, and even Laravel. I specialize in turning
              offshore code into silky smooth syntactical sugar and thrive in
              the startup hustle and bustle. No matter where I land, I cultivate
              a fun and collaborative environment, driving productivity through
              the roof.
            </p>
            <p className="text-lg font-medium text-gray-300">
              When I'm not coding, you’ll find me indulging my obsession with
              video games. Getting big wins on battle royale, cozying up with
              Animal Crossing, or picking a chill fishing spot on World of
              Warcraft. Whether I’m reeling in the catch of the day or debugging
              code, I bring dedication and enthusiasm to everything I do. Let’s
              build something amazing together!
            </p>
          </div>
        </div>
      </section>
      <ProjectWidget />
      <MobileProjectWidget />
      <WorkHistorySection />
      {/* <ArticleWidget /> */}
    </>
  )
}
