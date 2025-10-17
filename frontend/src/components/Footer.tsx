import { Code2Icon, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-gray-50 mt-10">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row md:justify-between gap-8 text-sm text-gray-700">
        {/* --- Brand + Description --- */}
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-xl  font-semibold mb-2 text-gray-900">
            Property Guru
          </h2>
          <p className="text-gray-600">
            A platform to find, rent, or sell properties with ease. Built with
            ❤️ using React, Node.js, and PostgreSQL.
          </p>
        </div>

        {/* --- Quick Links --- */}
        <div className="text-center lg:text-left">
          <h3 className="font-semibold mb-3 text-gray-900">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-blue-600 transition-colors">
                Home
              </a>
            </li>
            <li>
              <a
                href="/listings"
                className="hover:text-blue-600 transition-colors"
              >
                Listings
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-blue-600 transition-colors">
                About Us
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-blue-600 transition-colors">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* --- Support --- */}
        <div className="text-center lg:text-left">
          <h3 className="font-semibold mb-3 text-gray-900">Support</h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-blue-600 transition-colors">
                FAQ
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-blue-600 transition-colors">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-blue-600 transition-colors">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>

        {/* --- Social Media --- */}
        <div className="text-center lg:text-left">
          <h3 className="font-semibold mb-3 text-gray-900">Follow Us</h3>
          <div className="flex gap-4 justify-center lg:justify-start">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors"
            >
              <Code2Icon className="h-5 w-5" />
            </a>
            <a
              href="mailto:info@propertyguru.com"
              className="hover:text-blue-600 transition-colors"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      {/* --- Bottom Line --- */}
      <div className="border-t border-gray-200 text-center py-4 text-xs text-gray-500 bg-gray-100">
        © {new Date().getFullYear()} Property Guru. All rights reserved.
      </div>
    </footer>
  );
}
