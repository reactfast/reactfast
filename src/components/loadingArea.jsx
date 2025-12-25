import { Logo } from '@/components/Logo'
import { CubeTransparentIcon } from '@heroicons/react/24/outline'

export default function Loading() {
  return (
    <>
      <div className="absolute inset-0 z-50 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center space-y-4">
          <CubeTransparentIcon className="inset-shadow-sm 8 h-16 w-16 animate-[spin_2s_linear_infinite] rounded-full border-4 border-t-4 border-solid border-white text-5xl font-black text-primary" />
          <div className="mt-16 flex w-full items-center justify-center py-8">
            <p className="text-xl font-thin uppercase tracking-widest text-primary">
              Loading...
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
