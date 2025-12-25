import Image from 'next/image'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import backgroundImage from '@/images/background-call-to-action.jpg'

export default function CTA_1({ obj, colors, id }) {
  return (
    <section id={id} className="relative overflow-hidden bg-blue-600 py-24">
      <Image
        className="absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
        src={backgroundImage}
        alt=""
        width={2347}
        height={1244}
        unoptimized
      />
      <Container className="relative">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
            {obj?.title ? obj.title : 'Get started today'}
          </h2>
          <p className="mt-4 text-lg tracking-tight text-white">
            {obj?.content
              ? obj.content
              : 'It’s time to take control of your books. Buy our software so you can feel like you’re doing something productive.'}
          </p>
          <Button
            href={obj.url}
            target="_blank"
            color="white"
            className="mt-10"
          >
            {obj?.btnText ? obj.btnText : 'Get 6 months free'}
          </Button>
        </div>
      </Container>
    </section>
  )
}

export const def = [
  {
    name: 'title',
    type: 'string',
    title: 'Call To Action Title',
  },
  {
    name: 'content',
    type: 'string',
    title: 'Tag Line',
  },
  {
    name: 'url',
    type: 'string',
    title: 'Button Link',
    description: 'requires full URL path including https://',
  },
  {
    name: 'title',
    type: 'string',
    title: 'Button Text',
  },
]
