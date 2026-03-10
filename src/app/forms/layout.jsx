'use client'

import { FaGithub } from 'react-icons/fa'

export default function PageHeader({ children }) {
  return (
    <>
      <header className="bg-gray-900 px-6 py-16 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          {/* Left: Kicker + Title + Description */}
          <div className="flex-1">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-sky-400">
              Docs & Examples
            </p>

            <h1 className="bg-gradient-to-r from-indigo-400 via-sky-400 to-indigo-400 bg-clip-text text-5xl font-extrabold leading-tight text-transparent md:text-6xl">
              Forms that just work
            </h1>

            <p className="mt-4 max-w-2xl text-lg text-slate-300">
              Build dynamic React forms with JSON schemas, subforms, and
              modifiers. Create adaptive, production-ready form systems without
              boilerplate.
            </p>
          </div>

          {/* Right: GitHub button */}
          <div className="flex lg:justify-end">
            <a
              href="https://github.com/reactfast/forms"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-3 transition hover:bg-slate-700"
            >
              <FaGithub className="h-5 w-5 text-white" />
              <span className="font-medium text-white">View on GitHub</span>
            </a>
          </div>
        </div>
      </header>
      <div>{children}</div>
    </>
  )
}
