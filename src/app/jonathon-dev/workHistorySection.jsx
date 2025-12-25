'use client'
import Link from 'next/link'
import { WorkAndProjectHistory } from './assets/WorkAndProjectHistory'

export default function WorkHistorySection() {
  const items = [...WorkAndProjectHistory].sort((a, b) =>
    a.date < b.date ? 1 : -1,
  )

  return (
    <>
      <div className="mb-20 mt-60 w-full text-center text-3xl font-black">
        <h1>Work History</h1>
      </div>
      <section className="relative mx-auto max-w-5xl px-6 py-20">
        {/* Center timeline line */}
        <div className="absolute left-1/2 top-0 h-full w-[3px] -translate-x-1/2 bg-[#FF3908]" />
        <div className="relative flex flex-col gap-20">
          {items.map((item, index) => (
            <div
              key={index}
              className="relative flex flex-col md:flex-row md:justify-between"
            >
              {/* Left = Work, Right = Project */}
              {item.type === 'work' ? (
                <div className="md:w-[45%] md:pr-12">
                  <div className="mb-6 rounded-xl bg-[#191E24] p-6 text-gray-200 shadow-md transition-all duration-200 hover:shadow-lg">
                    <h3 className="text-xl font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-400">{item.role}</p>
                    <p className="mt-3 text-gray-300">{item.description}</p>
                    {item.tech?.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.tech.map((tech, i) => (
                          <span
                            key={i}
                            className="rounded-full bg-[#2D3640] px-3 py-1 text-xs font-medium text-gray-200 transition-colors duration-200 hover:bg-[#FF3908] hover:text-black"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="md:ml-auto md:w-[45%] md:pl-12">
                  <Link href={item.href}>
                    {/* group wrapper for hover effect */}
                    <div
                      className="group mb-6 rounded-xl border-4 border-dashed border-white p-2 text-gray-200 transition-all duration-300 hover:border-[#FF3908]"
                      style={{
                        // border: '3px dashed white',
                        borderRadius: '0.75rem',
                      }}
                    >
                      <div
                        className="rounded-xl bg-[#191E24] p-6 text-gray-200 transition-all duration-300"
                        style={{
                          borderRadius: '0.30rem',
                        }}
                      >
                        {/* title */}
                        <h3 className="text-xl font-semibold text-white transition-colors duration-300 group-hover:text-[#FF3908]">
                          {item.title}
                        </h3>

                        {/* description */}
                        <p className="mt-3 text-gray-300">{item.description}</p>

                        {/* tech tags */}
                        {item.tech?.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {item.tech.map((tech, i) => (
                              <span
                                key={i}
                                className="rounded-full bg-[#2D3640] px-3 py-1 text-xs font-medium text-gray-200 transition-colors duration-200 hover:bg-[#FF3908] hover:text-black"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              )}

              {/* Center date marker */}
              <div className="absolute left-1/2 top-0 -translate-x-1/2">
                <span className="rounded-full bg-[#FF3908] px-3 py-1 text-sm font-semibold text-black shadow">
                  {item.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Button */}
      <div className="relative mx-auto mt-8 flex max-w-6xl flex-col items-center pb-60">
        <button
          type="button"
          className="flex w-full max-w-xs items-center justify-center gap-2 rounded-full bg-[#FF3908] px-5 py-3 text-lg font-semibold text-black shadow-md transition-colors duration-200 hover:bg-[#e63900]"
        >
          Show Older Work
        </button>

        {/* Download link */}
        <a
          href="/resume.pdf"
          download="Jonathon_McClendon_Resume.pdf"
          className="mt-4 text-center text-[#FF3908] underline hover:text-[#e63900] md:absolute md:left-[75%] md:mt-[10px] md:-translate-x-1/2 md:transform"
        >
          Download CV
        </a>
      </div>
    </>
  )
}
