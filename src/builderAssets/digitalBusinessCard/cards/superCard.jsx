export default function SuperCard({ obj, id }) {
  const {
    // Content
    title = 'Card',
    url,
    download = false,
    textAlign = 'center', // left, center, right

    // Background & Visual Style
    btnColor = '#4F46E5', // keep naming consistent with SuperButton
    backgroundImage,
    backgroundSize = 'cover', // auto, cover, contain
    backgroundPosition = 'center', // left, center, right, top, bottom
    backgroundRepeat = 'no-repeat', // no-repeat, repeat, repeat-x, repeat-y

    // Spacing
    padding, // number (px) or string (e.g., '16px')
    paddingX,
    paddingY,
    marginTop,
    marginBottom,

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
  const roundedClass = borderRadius ? '' : tailwindRoundedMap[rounded] || 'rounded-md'

  const linkProps = download ? { download: true } : {}

  const cardStyles = {
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
    textAlign,
    padding: padding !== undefined ? (typeof padding === 'number' ? `${padding}px` : padding) : undefined,
    paddingLeft:
      paddingX !== undefined ? (typeof paddingX === 'number' ? `${paddingX}px` : paddingX) : undefined,
    paddingRight:
      paddingX !== undefined ? (typeof paddingX === 'number' ? `${paddingX}px` : paddingX) : undefined,
    paddingTop:
      paddingY !== undefined ? (typeof paddingY === 'number' ? `${paddingY}px` : paddingY) : undefined,
    paddingBottom:
      paddingY !== undefined ? (typeof paddingY === 'number' ? `${paddingY}px` : paddingY) : undefined,
  }

  const wrapperStyles = {
    boxShadow: boxShadow ? boxShadow : shadowColor ? `10px 10px 0 ${shadowColor}` : undefined,
    borderColor,
    borderWidth: borderWidth + 'px',
    borderStyle: borderWidth !== '0' ? 'solid' : undefined,
    borderRadius: borderRadius,
    backdropFilter: backdropBlur ? backdropBlur : undefined,
    WebkitBackdropFilter: backdropBlur ? backdropBlur : undefined,
    marginTop: marginTop !== undefined ? (typeof marginTop === 'number' ? `${marginTop}px` : marginTop) : undefined,
    marginBottom:
      marginBottom !== undefined ? (typeof marginBottom === 'number' ? `${marginBottom}px` : marginBottom) : undefined,
  }

  const Inner = (
    <div className={`w-full ${fontSizeClass} ${fontWeightClass} ${roundedClass} transition-colors`} style={{ ...cardStyles }}>
      {title}
    </div>
  )

  return (
    <div id={id} className="w-full px-2">
      <div className="mx-auto mt-2">
        <div className="mx-auto w-full max-w-2xl p-[2px]" style={{ ...wrapperStyles }}>
          {url ? (
            <a href={url} target="_blank" rel="noopener noreferrer" {...linkProps} className="block">
              {Inner}
            </a>
          ) : (
            Inner
          )}
        </div>
      </div>
    </div>
  )
}


