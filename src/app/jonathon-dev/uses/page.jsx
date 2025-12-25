'use client'

export default function UsesPage() {
  const categories = [
    {
      title: 'Workstation',
      items: [
        {
          name: '16” MacBook Pro, M1 Max, 64GB RAM (2021)',
          description:
            'I was using an Intel-based 16” MacBook Pro prior to this and the difference is night and day. I’ve never heard the fans turn on a single time, even under the incredibly heavy loads I put it through with our various launch simulations.',
        },
        {
          name: 'Apple Pro Display XDR (Standard Glass)',
          description:
            'The only display on the market if you want something HiDPI and bigger than 27”. When you’re working at planetary scale, every pixel you can get counts.',
        },
        {
          name: 'IBM Model M SSK Industrial Keyboard',
          description:
            'They don’t make keyboards the way they used to. I buy these any time I see them go up for sale and keep them in storage in case I need parts or need to retire my main.',
        },
        {
          name: 'Apple Magic Trackpad',
          description:
            'Something about all the gestures makes me feel like a wizard with special powers. I really like feeling like a wizard with special powers.',
        },
        {
          name: 'Herman Miller Aeron Chair',
          description:
            'If I’m going to slouch in the worst ergonomic position imaginable all day, I might as well do it in an expensive chair.',
        },
      ],
    },
    {
      title: 'Development tools',
      items: [
        {
          name: 'Sublime Text 4',
          description:
            'I don’t care if it’s missing all of the fancy IDE features everyone else relies on, Sublime Text is still the best text editor ever made.',
        },
        {
          name: 'iTerm2',
          description:
            'I’m honestly not even sure what features I get with this that aren’t just part of the macOS Terminal but it’s what I use.',
        },
        {
          name: 'TablePlus',
          description:
            'Great software for working with databases. Has saved me from building about a thousand admin interfaces for my various projects over the years.',
        },
      ],
    },
    {
      title: 'Design',
      items: [
        {
          name: 'Figma',
          description:
            'We started using Figma as just a design tool but now it’s become our virtual whiteboard for the entire company. Never would have expected the collaboration features to be the real hook.',
        },
      ],
    },
    {
      title: 'Productivity',
      items: [
        {
          name: 'Alfred',
          description:
            'It’s not the newest kid on the block but it’s still the fastest. The Sublime Text of the application launcher world.',
        },
        {
          name: 'Reflect',
          description:
            'Using a daily notes system instead of trying to keep things organized by topics has been super powerful for me. And with Reflect, it’s still easy for me to keep all of that stuff discoverable by topic even though all of my writing happens in the daily note.',
        },
        {
          name: 'SavvyCal',
          description:
            'Great tool for scheduling meetings while protecting my calendar and making sure I still have lots of time for deep work during the week.',
        },
        {
          name: 'Focus',
          description:
            'Simple tool for blocking distracting websites when I need to just do the work and get some momentum going.',
        },
      ],
    },
  ]

  return (
    <>
      <section className="mx-auto max-w-4xl px-6 py-20">
        <h1 className="text-5xl font-bold text-white sm:text-6xl">Uses</h1>
        <p className="mt-6 max-w-2xl text-lg text-gray-400">
          Software I use, gadgets I love, and other things I recommend.
        </p>
        <p className="mt-2 text-gray-400">
          I get asked a lot about the things I use to build software, stay
          productive, or buy to fool myself into thinking I’m being productive
          when I’m really just procrastinating. Here’s a big list of all of my
          favorite stuff.
        </p>

        <div className="mt-16 space-y-16">
          {categories.map((category, i) => (
            <div key={i}>
              <h2 className="text-2xl font-semibold text-white">
                {category.title}
              </h2>
              <ul className="mt-6 space-y-6">
                {category.items.map((item, j) => (
                  <li key={j} className="border-l-2 border-[#FF3908] pl-4">
                    <h3 className="text-lg font-medium text-white">
                      {item.name}
                    </h3>
                    <p className="mt-2 leading-relaxed text-gray-400">
                      {item.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
