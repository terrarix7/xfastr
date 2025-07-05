import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Link from "next/link";

export function PricingSection() {
  return (
    <section id="pricing" className="w-full max-w-6xl mx-auto px-6 py-20 z-10">
      <div className="text-center mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Finally let's get started shall we?
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Choose the plan that fits your Twitter growth goals. All plans include
          our core AI features.
        </p>
      </div>

      {/* Billing Toggle */}
      <Tabs defaultValue="monthly" className="w-full">
        <div className="flex items-center justify-center mb-12">
          <TabsList className="bg-white rounded-xl shadow-lg border border-gray-200 px-2 py-6">
            <TabsTrigger
              value="monthly"
              className="px-6 py-4 rounded-lg font-medium data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md text-gray-600 hover:text-gray-800"
            >
              Monthly
            </TabsTrigger>
            <TabsTrigger
              value="yearly"
              className="px-6 py-4 rounded-lg font-medium data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md text-gray-600 hover:text-gray-800"
            >
              Yearly
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="monthly">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* XFastr Basic */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-200">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  XFastr Basic
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                  Perfect for getting started
                </p>
                <div className="text-3xl font-bold text-gray-900 mb-1">$2</div>
                <div className="text-sm text-gray-500">/month</div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">2 Account Analysis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">200 AI Tweets</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">500 AI Replies</span>
                </div>
              </div>

              <Link href="/signup">
                <Button className="w-full bg-gray-100 text-gray-800 hover:bg-gray-200 rounded-xl py-3 font-medium">
                  Choose Basic
                </Button>
              </Link>
            </div>

            {/* XFastr Pro - Most Popular */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-blue-500 p-6 hover:shadow-xl transition-shadow duration-200 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  XFastr Pro
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                  Best value for growth
                </p>
                <div className="text-3xl font-bold text-gray-900 mb-1">$8</div>
                <div className="text-sm text-gray-500">/month</div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">5 Account Analysis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">500 AI Tweets</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">1000 AI Replies</span>
                </div>
              </div>

              <Link href="/signup">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 rounded-xl py-3 font-medium shadow-lg hover:shadow-xl transition-all duration-200">
                  Choose Pro
                </Button>
              </Link>
            </div>

            {/* XFastr Premium - Lifetime Deal */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-orange-400 p-6 hover:shadow-xl transition-shadow duration-200 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                🔥 Lifetime Deal
              </div>

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  XFastr Premium
                </h3>
                <p className="text-gray-500 text-sm mb-4">For power users</p>
                <div className="flex items-center justify-center space-x-2 mb-1">
                  <div className="text-lg text-gray-400 line-through">$20</div>
                  <div className="text-3xl font-bold text-orange-600">$12</div>
                </div>
                <div className="text-sm text-gray-500">/month</div>
                <div className="text-xs text-orange-600 font-bold mt-1 bg-orange-100 px-2 py-1 rounded-full inline-block">
                  LIFETIME PRICE
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-600">10 Account Analysis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-600">1000 AI Tweets</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-600">5000 AI Replies</span>
                </div>
              </div>

              <Link href="/signup">
                <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 rounded-xl py-3 font-medium shadow-lg hover:shadow-xl transition-all duration-200">
                  Get Lifetime Deal
                </Button>
              </Link>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="yearly">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* XFastr Basic */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-200">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  XFastr Basic
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                  Perfect for getting started
                </p>
                <div className="text-3xl font-bold text-gray-900 mb-1">$20</div>
                <div className="text-sm text-gray-500">/year</div>
                <div className="text-xs text-green-600 font-medium mt-1">
                  Save $4/year
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">2 Account Analysis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">200 AI Tweets</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">500 AI Replies</span>
                </div>
              </div>

              <Link href="/signup">
                <Button className="w-full bg-gray-100 text-gray-800 hover:bg-gray-200 rounded-xl py-3 font-medium">
                  Choose Basic
                </Button>
              </Link>
            </div>

            {/* XFastr Pro - Most Popular */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-blue-500 p-6 hover:shadow-xl transition-shadow duration-200 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  XFastr Pro
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                  Best value for growth
                </p>
                <div className="text-3xl font-bold text-gray-900 mb-1">$80</div>
                <div className="text-sm text-gray-500">/year</div>
                <div className="text-xs text-green-600 font-medium mt-1">
                  Save $16/year
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">5 Account Analysis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">500 AI Tweets</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">1000 AI Replies</span>
                </div>
              </div>

              <Link href="/signup">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 rounded-xl py-3 font-medium shadow-lg hover:shadow-xl transition-all duration-200">
                  Choose Pro
                </Button>
              </Link>
            </div>

            {/* XFastr Premium - Lifetime Deal */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-orange-400 p-6 hover:shadow-xl transition-shadow duration-200 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                🔥 Lifetime Deal
              </div>

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  XFastr Premium
                </h3>
                <p className="text-gray-500 text-sm mb-4">For power users</p>
                <div className="flex items-center justify-center space-x-2 mb-1">
                  <div className="text-lg text-gray-400 line-through">$240</div>
                  <div className="text-3xl font-bold text-orange-600">$120</div>
                </div>
                <div className="text-sm text-gray-500">/year</div>
                <div className="text-xs text-orange-600 font-bold mt-1 bg-orange-100 px-2 py-1 rounded-full inline-block">
                  LIFETIME PRICE
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-600">10 Account Analysis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-600">1000 AI Tweets</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-600">5000 AI Replies</span>
                </div>
              </div>

              <Link href="/signup">
                <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 rounded-xl py-3 font-medium shadow-lg hover:shadow-xl transition-all duration-200">
                  Get Lifetime Deal
                </Button>
              </Link>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
