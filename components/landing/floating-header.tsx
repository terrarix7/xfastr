import { Button } from "@/components/ui/button";
import Link from "next/link";

export function FloatingHeader() {
  return (
    <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-4xl px-6">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              {/* Blue Bird Logo */}
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <div className="w-6 h-6 bg-blue-600 rounded-full relative">
                  <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-white rounded-full"></div>
                  <div className="absolute top-2 right-1 w-2 h-1 bg-blue-400 rounded-full transform rotate-12"></div>
                </div>
              </div>
              <span className="text-xl font-bold text-gray-800">XFastr</span>
            </div>

            <nav className="hidden md:flex items-center space-x-6">
              <a
                href="#features"
                className="text-gray-600 hover:text-gray-800 cursor-pointer font-medium transition-colors"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="text-gray-600 hover:text-gray-800 cursor-pointer font-medium transition-colors"
              >
                Pricing
              </a>
              <a
                href="#faq"
                className="text-gray-600 hover:text-gray-800 cursor-pointer font-medium transition-colors"
              >
                FAQ
              </a>
            </nav>
          </div>

          <div className="flex items-center space-x-3">
            <Link href="/signup">
              <Button
                variant="ghost"
                className="text-gray-600 hover:text-gray-800 font-medium"
              >
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 rounded-xl px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-200 font-medium">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
