'use client'

import Marquee from 'react-fast-marquee'

export default function NewsScroller({ obj = {}, colors = [], id = '' }) {
  const items =
    Array.isArray(obj.items) && obj.items.length
      ? obj.items
      : [
          { message: 'Stay tuned for updates!' },
          { message: 'Welcome to our news scroller.' },
          { message: 'Custom messages will appear here.' },
        ]

  const speed = Number(obj.speed) || 25
  const height = obj.height || '17px'
  const pauseOnHover = obj.pauseOnHover !== false // true unless explicitly false

  return (
    <Marquee
      autofill={true}
      speed={speed}
      style={{ height }}
      pauseOnHover={pauseOnHover}
    >
      {items.map((item, idx) => (
        <ScrollItem key={idx} inner={item.message || 'News item'} />
      ))}
    </Marquee>
  )
}

function ScrollItem({ inner }) {
  return (
    <p
      dangerouslySetInnerHTML={{ __html: inner }}
      style={{
        marginRight: '50px',
        fontSize: 15,
        letterSpacing: 3,
      }}
    ></p>
  )
}
