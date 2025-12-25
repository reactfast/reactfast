export default function Testimonials1({ obj, colors, id }) {
  const hasValidInput = obj?.quote1 || obj?.username1 || obj?.userimg

  const dynamicTestimonials = Array.from({ length: 6 }).map((_, i) => ({
    body: obj[`quote${i + 1}`],
    author: {
      name: obj[`username${i + 1}`],
      handle: obj[`username${i + 1}`]?.toLowerCase().replace(/\s+/g, '_'),
      imageUrl: Array.isArray(obj.userimg)
        ? obj.userimg[i]
        : obj.userimg || `https://randomuser.me/api/portraits/lego/${i}.jpg`,
    },
  }))

  const defaultTestimonials = [
    {
      body: 'This platform made it incredibly easy to launch my business online. Highly recommend!',
      author: {
        name: 'Alice Johnson',
        handle: 'alice_j',
        imageUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
      },
    },
    {
      body: 'Amazing support and sleek design tools. Couldn’t be happier with the results!',
      author: {
        name: 'Mark Lee',
        handle: 'markl_dev',
        imageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
      },
    },
    {
      body: 'Our whole team loves how intuitive and fast the site builder is.',
      author: {
        name: 'Sandra Miller',
        handle: 'sandraM',
        imageUrl: 'https://randomuser.me/api/portraits/women/68.jpg',
      },
    },
    {
      body: 'This platform made it incredibly easy to launch my business online. Highly recommend!',
      author: {
        name: 'Alice Johnson',
        handle: 'alice_j',
        imageUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
      },
    },
    {
      body: 'Amazing support and sleek design tools. Couldn’t be happier with the results!',
      author: {
        name: 'Mark Lee',
        handle: 'markl_dev',
        imageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
      },
    },
    {
      body: 'Our whole team loves how intuitive and fast the site builder is.',
      author: {
        name: 'Sandra Miller',
        handle: 'sandraM',
        imageUrl: 'https://randomuser.me/api/portraits/women/68.jpg',
      },
    },
  ]

  const testimonials = hasValidInput
    ? dynamicTestimonials.filter((t) => t.body && t.author.name)
    : defaultTestimonials

  return (
    <div id={id} className="">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          <div className="-mt-8 sm:-mx-4 sm:columns-2 sm:text-[0] lg:columns-3">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.author.handle || index}
                className="pt-8 sm:inline-block sm:w-full sm:px-4"
              >
                <figure className="rounded-2xl bg-white p-8 text-sm leading-6 shadow-md">
                  <blockquote className="text-gray-900">
                    <p>{`“${testimonial.body}”`}</p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-x-4">
                    <img
                      alt=""
                      src={testimonial.author.imageUrl}
                      className="size-10 rounded-full bg-gray-100"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">
                        {testimonial.author.name}
                      </div>
                      <div className="text-gray-600">
                        @{testimonial.author.handle}
                      </div>
                    </div>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
