// Example JSON data
const defaultNavigation = [
  {
    title: 'Solutions',
    type: 'List',
    listItems: [
      { title: 'Marketing', href: '#' },
      { title: 'Analytics', href: '#' },
      { title: 'Automation', href: '#' },
      { title: 'Commerce', href: '#' },
      { title: 'Insights', href: '#' },
    ],
  },
  {
    title: 'Support',
    type: 'List',
    listItems: [
      { title: 'Submit ticket', href: '#' },
      { title: 'Documentation', href: '#' },
      { title: 'Guides', href: '#' },
    ],
  },
  {
    title: 'Company',
    type: 'List',
    listItems: [
      { title: 'About', href: '#' },
      { title: 'Blog', href: '#' },
      { title: 'Jobs', href: '#' },
      { title: 'Press', href: '#' },
    ],
  },
  {
    title: 'Legal',
    type: 'List',
    listItems: [
      { title: 'Terms of service', href: '#' },
      { title: 'Privacy policy', href: '#' },
      { title: 'License', href: '#' },
    ],
  },
  {
    type: 'Socials',
    listItems: [
      { title: 'Facebook', href: '#', icon: 'facebook' },
      { title: 'Instagram', href: '#', icon: 'instagram' },
      { title: 'X', href: '#', icon: 'x' },
      { title: 'GitHub', href: '#', icon: 'github' },
      { title: 'YouTube', href: '#', icon: 'youtube' },
    ],
  },
  {
    type: 'Logo',
    src: 'https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600',
  },
]

export default function NavFooter1({ obj, colors }) {
  const navigation = obj?.navigation
    ? JSON.parse(obj?.navigation)
    : defaultNavigation

  return (
    <footer>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Logo Section */}
          <div className="space-y-8">
            <img
              alt="Company logo"
              src={navigation?.find((item) => item.type === 'Logo')?.src}
              className="h-9"
            />
            <p className="text-sm/6">
              Making the world a better place through constructing elegant
              hierarchies.
            </p>
            <div className="flex gap-x-6">
              {navigation
                .filter((item) => item.type === 'Socials')
                .flatMap((item) => item.listItems)
                .map((social) => (
                  <a
                    key={social.title}
                    href={social.href}
                    className="text-gray-600 hover:brightness-75"
                  >
                    <span className="sr-only">{social.title}</span>
                    {/* Here you could map social icon based on social.icon */}
                    <i className={`icon-${social.icon}`} aria-hidden="true" />
                  </a>
                ))}
            </div>
          </div>

          {/* Main Navigation Sections */}
          <div className="mt-16 grid grid-cols-4 gap-8 xl:col-span-2 xl:mt-0">
            {navigation
              .filter((item) => item.type === 'List')
              .map((section) => (
                <div key={section.title}>
                  <h3 className="text-sm/6 font-semibold">{section.title}</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {section.listItems.map((item) => (
                      <li key={item.title}>
                        <a
                          href={item.href}
                          className="text-sm/6 hover:brightness-75"
                        >
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-sm/6 text-gray-600">
            &copy; 2024 Your Company, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
