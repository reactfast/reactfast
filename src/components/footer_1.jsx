import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaXTwitter,
  FaLinkedin,
} from 'react-icons/fa6'
import LogoSvg from './logoSvg'
import { Logo } from './Logo'

const footerNavigation = {
  products: [
    { name: 'Cards', href: '/shop/category/all' },
    { name: 'Popular', href: '/shop/category/all' },
    { name: 'Accessories', href: '/shop/category/all' },
    { name: 'Marketing Materials', href: '/shop/category/all' },
  ],
  company: [
    { name: 'Who we are', href: '/about' },
    { name: 'Sustainability', href: '/help/sustainability' },
    { name: 'Terms & Conditions', href: '/help/terms' },
    { name: 'Privacy', href: '/help/privacy' },
  ],
  customerService: [
    { name: 'Contact', href: '/help/contact' },
    { name: 'Shipping', href: '/help/shipping-info' },
    { name: 'Returns', href: '/help/return-policy' },
    { name: 'Warranty', href: '/help/warranty' },
    { name: 'Secure Payments', href: '/help/secure-payments' },
    { name: 'FAQ', href: '/help/faq' },
  ],
}

export default function Footer1() {
  return (
    <footer aria-labelledby="footer-heading" className="bg-white">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200 py-20">
          <div className="grid grid-cols-1 md:grid-flow-col md:auto-rows-min md:grid-cols-12 md:gap-x-8 md:gap-y-16">
            {/* Sitemap sections */}
            <div className="col-span-6 mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-8 md:col-start-3 md:row-start-1 md:mt-0 lg:col-span-6 lg:col-start-2">
              <div className="grid grid-cols-1 gap-y-12 sm:col-span-2 sm:grid-cols-2 sm:gap-x-8">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    Products
                  </h3>
                  <ul role="list" className="mt-6 space-y-6">
                    {footerNavigation.products.map((item) => (
                      <li key={item.name} className="text-sm">
                        <a
                          href={item.href}
                          className="text-gray-500 hover:text-gray-600"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Company</h3>
                  <ul role="list" className="mt-6 space-y-6">
                    {footerNavigation.company.map((item) => (
                      <li key={item.name} className="text-sm">
                        <a
                          href={item.href}
                          className="text-gray-500 hover:text-gray-600"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  Customer Service
                </h3>
                <ul role="list" className="mt-6 space-y-6">
                  {footerNavigation.customerService.map((item) => (
                    <li key={item.name} className="text-sm">
                      <a
                        href={item.href}
                        className="text-gray-500 hover:text-gray-600"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Socials section */}
            <div className="mt-12 md:col-span-8 md:col-start-3 md:row-start-2 md:mt-0 lg:col-span-4 lg:col-start-9 lg:row-start-1">
              <div className="col-span-1 md:col-span-2 lg:col-start-1 lg:row-start-1">
                <div className="mb-4 w-40">
                  <Logo className="h-8 w-auto" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-900">Follow Us</h3>
              <p className="mt-6 text-sm text-gray-500">
                Stay connected and see how teams use Jot every day.
              </p>
              <div className="mt-4 flex space-x-6 text-gray-400">
                <a
                  href="https://www.facebook.com/profile.php?id=61575092863310"
                  aria-label="Facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook className="h-5 w-5 hover:text-gray-600" />
                </a>
                <a
                  href="https://www.instagram.com/jot.space/"
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram className="h-5 w-5 hover:text-gray-600" />
                </a>
                <a href="#" aria-label="TikTok">
                  <FaTiktok className="h-5 w-5 hover:text-gray-600" />
                </a>
                <a href="#" aria-label="X / Twitter">
                  <FaXTwitter className="h-5 w-5 hover:text-gray-600" />
                </a>
                <a href="#" aria-label="LinkedIn">
                  <FaLinkedin className="h-5 w-5 hover:text-gray-600" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 py-10 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Jot Space, Inc. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
