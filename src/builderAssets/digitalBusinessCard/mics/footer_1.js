'use client'

export default function Footer_1({ linksColumn1, linksColumn2 }) {
  // Default fallback values
  const defaultLinksColumn1 = [
    { text: 'Home', href: '#' },
    { text: 'About Us', href: '#' },
    { text: 'Services', href: '#' },
    { text: 'Contact', href: '#' },
  ]

  const defaultLinksColumn2 = [
    { text: 'Blog', href: '#' },
    { text: 'Privacy Policy', href: '#' },
    { text: 'Terms of Service', href: '#' },
    { text: 'Help', href: '#' },
  ]

  const column1 =
    linksColumn1 && linksColumn1.length ? linksColumn1 : defaultLinksColumn1
  const column2 =
    linksColumn2 && linksColumn2.length ? linksColumn2 : defaultLinksColumn2

  return (
    <footer className="py-8 text-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-row justify-center">
          <div className="mx-8 mb-8">
            <h3 className="mb-4 text-xl font-bold">Column 1</h3>
            <ul>
              {column1.map((link, index) => (
                <li key={index} className="mb-2">
                  <a href={link.href} className="hover:underline">
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="mx-8 mb-8">
            <h3 className="mb-4 text-xl font-bold">Column 2</h3>
            <ul>
              {column2.map((link, index) => (
                <li key={index} className="mb-2">
                  <a href={link.href} className="hover:underline">
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
