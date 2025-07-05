export function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-200 mt-20 z-10">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <div className="w-6 h-6 bg-blue-600 rounded-full relative">
                  <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-white rounded-full"></div>
                  <div className="absolute top-2 right-1 w-2 h-1 bg-blue-400 rounded-full transform rotate-12"></div>
                </div>
              </div>
              <span className="text-xl font-bold text-gray-800">XFastr</span>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Supercharge your Twitter growth with AI-powered insights and
              automation.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com/xfastr7"
                className="text-gray-400 hover:text-blue-500 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://instagram.com/xfastr7"
                className="text-gray-400 hover:text-pink-500 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781c-.49 0-.928-.438-.928-.928s.438-.928.928-.928.928.438.928.928-.438.928-.928.928zm-3.323 9.781c-2.448 0-4.474-2.026-4.474-4.474s2.026-4.474 4.474-4.474 4.474 2.026 4.474 4.474-2.026 4.474-4.474 4.474z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#features"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Browser Extension
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  API
                </a>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#faq"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="mailto:terrarix7@gmail.com"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Status
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Cookie Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Refund Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © 2024 XFastr. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="text-gray-500 text-sm">Follow us:</span>
            <a
              href="https://twitter.com/xfastr7"
              className="text-gray-400 hover:text-blue-500 transition-colors"
            >
              @xfastr7
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
