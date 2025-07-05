import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-12 pt-40 relative overflow-hidden">
      {/* Hero Text */}
      <div className="text-center mb-8 z-10">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          <span className="text-blue-600">Analyze your niche's</span>
          <br />
          top creators, get AI feedback
          <br />
          on your account
        </h1>

        <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl px-8 py-4 text-lg font-semibold mb-4 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
          Get Started
        </Button>
      </div>
    </div>
  );
}
