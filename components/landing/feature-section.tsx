export function FeaturesSection() {
  return (
    <section id="features" className="w-full max-w-6xl mx-auto px-6 pb-20 z-10">
      <div className="text-center mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Still not sure? here are some features
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Everything you need to analyze, optimize, and grow your Twitter
          presence with AI-powered insights
        </p>
      </div>

      <div className="space-y-24">
        {/* Feature 1: Niche Intelligence - Image Left, Text Right */}
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <div className="bg-gradient-to-br from-blue-100 to-indigo-200 rounded-2xl p-8 shadow-xl">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                  <span className="font-semibold text-gray-800">
                    @TopCreator
                  </span>
                  <span className="text-gray-500 text-sm">2h</span>
                </div>
                <p className="text-gray-800 mb-4">
                  Just discovered this amazing growth hack that increased my
                  engagement by 300%! 🚀
                </p>
                <div className="flex items-center space-x-4 text-gray-500 text-sm">
                  <span>💬 124</span>
                  <span>🔄 89</span>
                  <span>❤️ 456</span>
                </div>
              </div>
              <div className="mt-4 bg-blue-500 text-white rounded-lg p-4">
                <div className="text-sm font-medium mb-2">
                  📊 Performance Insights
                </div>
                <div className="text-xs opacity-90">
                  Engagement Rate: +300% above average
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              Niche Intelligence
            </h3>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              Track top accounts in your space and discover the content
              strategies that actually drive engagement and growth.
            </p>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Monitor competitor performance in real-time</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Identify trending topics in your niche</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Discover high-performing content formats</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Feature 2: Account Deep Dive - Image Right, Text Left */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
          <div className="lg:w-1/2">
            <div className="bg-gradient-to-br from-purple-100 to-pink-200 rounded-2xl p-8 shadow-xl">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">2.4K</div>
                    <div className="text-sm text-gray-500">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      +18%
                    </div>
                    <div className="text-sm text-gray-500">Growth</div>
                  </div>
                </div>
                <div className="h-24 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg mb-4 flex items-end justify-around p-2">
                  <div
                    className="w-4 bg-white/80 rounded-t"
                    style={{ height: "60%" }}
                  ></div>
                  <div
                    className="w-4 bg-white/80 rounded-t"
                    style={{ height: "80%" }}
                  ></div>
                  <div
                    className="w-4 bg-white/80 rounded-t"
                    style={{ height: "40%" }}
                  ></div>
                  <div
                    className="w-4 bg-white/80 rounded-t"
                    style={{ height: "90%" }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500">
                  Best posting time: 2-4 PM
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              Account Deep Dive
            </h3>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              Get comprehensive analytics on your Twitter performance with
              insights that reveal exactly what's working and what isn't.
            </p>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Detailed engagement analytics</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Optimal posting time recommendations</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Content performance breakdowns</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Feature 3: Human-Like AI Tweets - Image Left, Text Right */}
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <div className="bg-gradient-to-br from-green-100 to-emerald-200 rounded-2xl p-8 shadow-xl">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full"></div>
                  <span className="font-semibold text-gray-800">
                    @YourAccount
                  </span>
                  <span className="text-green-500 text-xs bg-green-100 px-2 py-1 rounded-full">
                    AI Generated
                  </span>
                </div>
                <p className="text-gray-800 mb-4">
                  Just had a breakthrough moment while debugging. Sometimes the
                  best solutions come when you step away from the screen and
                  think differently. 💡
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-gray-500 text-sm">
                    <span>💬 12</span>
                    <span>🔄 8</span>
                    <span>❤️ 34</span>
                  </div>
                  <div className="text-xs text-green-600 font-medium">
                    100% Human-like
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              Human-Like AI Tweets
            </h3>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              Generate authentic, natural-sounding tweets that blend seamlessly
              with your voice and avoid AI detection.
            </p>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Matches your unique writing style</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Passes AI detection tools</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Contextually relevant content</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Feature 4: Context-Aware Replies - Image Right, Text Left */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
          <div className="lg:w-1/2">
            <div className="bg-gradient-to-br from-orange-100 to-red-200 rounded-2xl p-8 shadow-xl">
              <div className="bg-white rounded-xl p-6 shadow-lg space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
                  <span className="text-sm text-gray-600">@OriginalPoster</span>
                </div>
                <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                  "Struggling with user retention in my SaaS app. Any advice?"
                </p>
                <div className="border-l-2 border-orange-400 pl-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-6 h-6 bg-orange-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-800">
                      @YourReply
                    </span>
                    <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
                      Smart Reply
                    </span>
                  </div>
                  <p className="text-sm text-gray-800">
                    Focus on your onboarding flow first. I've seen 40% retention
                    improvements just by simplifying the first 3 steps. Happy to
                    share some specific tactics that worked for us! 🚀
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              Context-Aware Replies
            </h3>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              Browser extension that reads the full conversation and crafts
              replies that actually contribute to the discussion.
            </p>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span>Understands full conversation context</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span>Suggests meaningful contributions</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span>One-click browser integration</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
