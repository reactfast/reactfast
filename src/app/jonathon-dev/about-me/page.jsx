'use client'

import Link from 'next/link'
import { FaGithub, FaInstagram, FaXTwitter, FaLinkedin } from 'react-icons/fa6'

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-4xl px-6 py-20">
        <h1 className="text-5xl font-bold text-white sm:text-6xl">
          I’m Jonathon McClendon.
        </h1>
        <p className="mt-4 text-lg text-gray-400">
          I live in the Dallas, Fort Worth Metroplex, where I design the future.
        </p>

        <div className="mt-10 space-y-6 text-lg leading-relaxed text-gray-300">
          <p>
            I've loved making things for as long as I can remember, and I wrote
            my first program when I was 8 years old, just two weeks after my mom
            gave me her old Dell. It wasn't two days later that I completely
            fried that computer by overloading it. Sorry mom...
          </p>
          <p>
            Growing up in the Dallas-Fort Worth metroplex, the only thing I
            liked more than making games was playing games. When I was 10, I
            finished my first playthrough of Jack 3 (the last of the Jack &
            Daxter series) and I cried my eyes out. I didn't realize it then but
            that's when I realized my love for code. Computers and games had the
            ability to affect us as humans as much as one another.
          </p>
          <p>
            By the time I hit high school (and graduated early), I had broken 5
            more computers and written a handful of new programs. I dove into
            HTML, CSS, and JavaScript on platforms like Udemy, Zenva, and
            YouTube. Deciding this was my future, I refined my skills at
            Flatiron School, mastering Ruby, Sinatra, Rails, SQL, Node, and
            React.
          </p>
          <p>
            Since then, I’ve been the secret sauce behind countless production
            builds in Rails, Next, and even Laravel. I specialize in turning
            offshore code into silky smooth syntactical sugar and thrive in the
            startup hustle and bustle. No matter where I land, I cultivate a fun
            and collaborative environment, driving productivity through the
            roof.
          </p>
          <p>
            When I'm not coding, you’ll find me indulging my obsession with
            video games: getting big wins on battle royale, cozying up with
            Animal Crossing, or picking a chill fishing spot on World of
            Warcraft. Whether I’m reeling in the catch of the day or debugging
            code, I bring dedication and enthusiasm to everything I do. Let’s
            build something amazing together!
          </p>
        </div>

        {/* Social Links */}
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="https://x.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 transition-colors hover:text-[#FF3908]"
          >
            <FaXTwitter className="h-6 w-6" />
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 transition-colors hover:text-[#FF3908]"
          >
            <FaInstagram className="h-6 w-6" />
          </a>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 transition-colors hover:text-[#FF3908]"
          >
            <FaGithub className="h-6 w-6" />
          </a>
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 transition-colors hover:text-[#FF3908]"
          >
            <FaLinkedin className="h-6 w-6" />
          </a>
        </div>

        {/* Contact Email */}
        <div className="mt-6">
          <a
            href="mailto:jonathonsmcclendon@gmail.com"
            className="font-semibold text-[#FF3908] hover:underline"
          >
            JONATHONSMCCLENDON@GMAIL.COM
          </a>
        </div>
      </section>
    </>
  )
}
