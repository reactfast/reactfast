import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/solid";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-16">
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row justify-between space-y-6 md:space-y-0">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold">Contact Us</h2>
            <p className="mt-4">123 Main St</p>
            <p>Springfield, IL 62701</p>
            <div className="mt-2 flex items-center">
              <PhoneIcon className="w-5 h-5 mr-2" />
              <span>(555) 555-5555</span>
            </div>
            <div className="flex items-center">
              <EnvelopeIcon className="w-5 h-5 mr-2" />
              <span>email@example.com</span>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-semibold">About Us</h2>
            <p className="mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-semibold">Quick Links</h2>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="/faqs" className="hover:underline">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Microcredential Programs
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Degree Programs
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-semibold">Follow Us</h2>
            <p className="mt-4">
              Stay up to date with our latest news and promotions.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="hover:opacity-75">
                <img src="/facebook.svg" alt="Facebook" className="w-6 h-6" />
              </a>
              <a href="#" className="hover:opacity-75">
                <img src="/twitter.svg" alt="Twitter" className="w-6 h-6" />
              </a>
              {/* Add more social media icons as needed */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
