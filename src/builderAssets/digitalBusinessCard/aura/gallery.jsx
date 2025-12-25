export default function Gallery() {
  return (
    <>
      <div>
        {' '}
        <div className="relative z-10 mb-12 flex flex-col items-center justify-center px-4">
          <div className="mt-8 w-full max-w-4xl rounded-xl bg-white/30 p-6 shadow-lg backdrop-blur-sm">
            <h2 className="text-center text-2xl font-thin">Gallery</h2>
            <p className="mt-2 text-center text-sm text-gray-300">
              Check out some snapshots of our work.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              <figure>
                <img
                  src="https://images.unsplash.com/photo-1544717301-9cdcb1f5940f?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Gallery image 1"
                  className="h-48 w-full rounded object-cover"
                />
                <figcaption className="mt-1 text-center text-xs text-gray-300">
                  Happy Clients
                </figcaption>
              </figure>
              <figure>
                <img
                  src="https://plus.unsplash.com/premium_photo-1667238624718-5c5d5deb6829?q=80&w=2737&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Gallery image 2"
                  className="h-48 w-full rounded object-cover"
                />
                <figcaption className="mt-1 text-center text-xs text-gray-300">
                  High Technology
                </figcaption>
              </figure>
              <figure>
                <img
                  src="https://plus.unsplash.com/premium_photo-1661402199896-b7052a1257f0?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Gallery image 3"
                  className="h-48 w-full rounded object-cover"
                />
                <figcaption className="mt-1 text-center text-xs text-gray-300">
                  Effective Communication
                </figcaption>
              </figure>
              <figure>
                <img
                  src="https://images.unsplash.com/photo-1496070242169-b672c576566b?q=80&w=3143&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Gallery image 4"
                  className="h-48 w-full rounded object-cover"
                />
                <figcaption className="mt-1 text-center text-xs text-gray-300">
                  Frog.
                </figcaption>
              </figure>
              <figure>
                <img
                  src="https://plus.unsplash.com/premium_photo-1667239397163-4aac21fd2a61?q=80&w=3165&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Gallery image 5"
                  className="h-48 w-full rounded object-cover"
                />
                <figcaption className="mt-1 text-center text-xs text-gray-300">
                  Time Traveling Cheer
                </figcaption>
              </figure>
              <figure>
                <img
                  src="https://images.unsplash.com/photo-1627936883562-8802dc458767?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Gallery image 6"
                  className="h-48 w-full rounded object-cover"
                />
                <figcaption className="mt-1 text-center text-xs text-gray-300">
                  Modern Design
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const def = [
  {
    name: 'name',
    type: 'string',
    title: 'Name',
  },
]
