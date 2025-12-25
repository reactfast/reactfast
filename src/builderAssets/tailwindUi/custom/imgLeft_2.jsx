import Image from 'next/image'
import { CheckIcon } from '@heroicons/react/20/solid'

export default function ImgLeft_1({ obj, colors }) {
  return (
    <>
      <div className="grid w-full grid-cols-12">
        <div className="col-span-12 p-8 md:p-24 lg:col-span-6">
          {' '}
          <div className="aspect-h-1 relative mx-auto aspect-square w-full bg-blue-900">
            <Image
              src={'https://placehold.co/600x400'}
              alt="Description of image"
              fill
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        </div>
        <div className="col-span-12 p-8 md:p-24 lg:col-span-6">
          <h2
            style={colors && { color: colors[0] }}
            className="text-5xl font-bold"
          >
            {obj?.title ? obj.title : 'Enrich your career'}
          </h2>
          <p className="pt-12 text-lg">
            {obj?.content ? obj.content : 'Content goes here'}
          </p>
        </div>
      </div>
    </>
  )
}
