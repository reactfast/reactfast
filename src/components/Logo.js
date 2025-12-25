import Image from 'next/image'
import LogoSrc from '@/assets/Logo.svg'

export function Logo({ width, height, ...rest }) {
  return (
    <div className="h-full w-full">
      <Image
        src={LogoSrc}
        alt="Logo"
        layout="responsive"
        width={width || 900} // Default width if none is provided
        height={height || 200} // Default height if none is provided
        objectFit="contain"
        {...rest}
      />
    </div>
  )
}
