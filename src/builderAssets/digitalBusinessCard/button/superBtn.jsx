export default function SuperButton({ obj, id }) {
  const {
    title = 'Button',
    url,
    download = false,

    // Background & Visual Style
    btnColor = '#4F46E5', // fallback if no Tailwind class used
    backgroundImage,
    backgroundSize = 'cover', // auto, cover, contain
    backgroundPosition = 'center', // left, center, right, top, bottom
    backgroundRepeat = 'no-repeat', // no-repeat, repeat, repeat-x, repeat-y

    // Typography
    fontColor = '#FFFFFF',
    fontFamily, // direct font family name
    fontSize = 'md', // xs, sm, md, lg, xl
    fontWeight = 'bold', // thin, extralight, light, normal, medium, semibold, bold, extrabold, black
    letterSpacing,
    lineHeight,

    // Borders & Effects
    rounded = 'md', // none, md, xl, full
    borderRadius,
    borderColor,
    borderWidth = '0',
    boxShadow,
    shadowColor,
    backdropBlur,
  } = obj

  const tailwindFontSizeMap = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
    '5xl': 'text-5xl',
  }

  const tailwindFontWeightMap = {
    thin: 'font-thin',
    extralight: 'font-extralight',
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    extrabold: 'font-extrabold',
    black: 'font-black',
  }

  const tailwindRoundedMap = {
    none: ' ',
    sm: 'rounded-sm',
    md: 'rounded-md',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
    '4xl': 'rounded-4xl',
    full: 'rounded-full',
  }

  const fontSizeClass = tailwindFontSizeMap[fontSize] || 'text-base'
  const fontWeightClass = tailwindFontWeightMap[fontWeight] || 'font-bold'
  const roundedClass = borderRadius
    ? ''
    : tailwindRoundedMap[rounded] || 'rounded-md'

  const linkProps = download ? { download: true } : {}

  const buttonStyles = {
    backgroundColor: backgroundImage ? undefined : btnColor,
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
    backgroundSize,
    backgroundPosition,
    backgroundRepeat,
    color: fontColor,
    fontFamily,
    fontWeight,
    fontSize,
    letterSpacing,
    lineHeight,
  }

  const wrapperStyles = {
    boxShadow: boxShadow
      ? boxShadow
      : shadowColor
        ? `10px 10px 0 ${shadowColor}`
        : undefined,
    borderColor,
    borderWidth: borderWidth + 'px',
    borderStyle: borderWidth !== '0' ? 'solid' : undefined,
    borderRadius: borderRadius,
    backdropFilter: backdropBlur ? backdropBlur : undefined,
    WebkitBackdropFilter: backdropBlur ? backdropBlur : undefined,
  }

  return (
    <div id={id} className="w-full px-2">
      <div className="mx-auto mt-2 text-center">
        <a href={url} target="_blank" rel="noopener noreferrer" {...linkProps}>
          <div className="mx-auto w-full max-w-2xl p-[2px]">
            <button
              className={`w-full py-4 transition-colors ${fontSizeClass} ${fontWeightClass} ${roundedClass}`}
              style={{ ...buttonStyles, ...wrapperStyles }}
            >
              {title}
            </button>
          </div>
        </a>
      </div>
    </div>
  )
}
