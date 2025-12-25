const testimonialsList = [
  {
    name: 'Gretchen M.',
    text: 'Jot.Cards changed the way connect with customers. hey can easily find all of my socials, or scroll to the bottom of my page to check out with Venmo or CashApp at my shows. love how easy it is!',
  },
  {
    name: 'Jane Smith',
    text: 'The subscription is totally worth it. It makes my personal brand stand out.',
  },
]

export function Testimonials() {
  return (
    <section className="my-10 py-16 text-center">
      <h2 className="text-3xl font-bold">What Our Users Say</h2>
      <div className="mt-6 flex justify-center gap-6">
        {testimonialsList.map((testimonial) => (
          <div className="w-96 rounded-lg border bg-white p-6 shadow-md">
            <p className="italic">"{testimonial.text}"</p>
            <p className="mt-4 font-semibold">- {testimonial.name}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
