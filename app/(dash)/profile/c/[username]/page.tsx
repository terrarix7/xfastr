"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "@/convex/_generated/api";

interface PageProps {
  params: {
    username: string;
  };
}

function page({ params }: PageProps) {
  const [activeTab, setActiveTab] = React.useState<string>("All");
  const [sortBy, setSortBy] = React.useState<"date" | "views" | "likes">(
    "date",
  );

  const {
    data: tweets,
    isPending,
    error,
  } = useQuery(
    convexQuery(api.myFunctions.getAllTweetsByAuthor, {
      username: params.username,
    }),
  );

  if (isPending) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="text-center">Loading tweets...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="text-center text-red-500">
          Error loading tweets: {error.message}
        </div>
      </div>
    );
  }

  if (!tweets || tweets.length === 0) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="text-center">No tweets found for this user.</div>
      </div>
    );
  }

  // Get unique classifications
  const classifications = Array.from(
    new Set(tweets.map((tweet) => tweet.classifier).filter(Boolean)),
  ) as string[];
  const allTabs = ["All", ...classifications];

  // Filter tweets based on active tab
  const filteredTweets =
    activeTab === "All"
      ? tweets
      : tweets.filter((tweet) => tweet.classifier === activeTab);

  // Sort tweets based on sortBy
  const sortedTweets = [...filteredTweets].sort((a, b) => {
    switch (sortBy) {
      case "views":
        return b.viewCount - a.viewCount;
      case "likes":
        return b.likeCount - a.likeCount;
      case "date":
      default:
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }
  });

  // Calculate total likes and views for each classification
  const getClassificationStats = (classification: string) => {
    const classificationTweets = tweets.filter(
      (t) => t.classifier === classification,
    );
    const totalLikes = classificationTweets.reduce(
      (sum, tweet) => sum + tweet.likeCount,
      0,
    );
    const totalViews = classificationTweets.reduce(
      (sum, tweet) => sum + tweet.viewCount,
      0,
    );
    return { totalLikes, totalViews };
  };

  const getAllStats = () => {
    const totalLikes = tweets.reduce((sum, tweet) => sum + tweet.likeCount, 0);
    const totalViews = tweets.reduce((sum, tweet) => sum + tweet.viewCount, 0);
    return { totalLikes, totalViews };
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Tweet Classifications for @{params.username}
      </h1>

      {/* Sort Options */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Sort by:
        </label>
        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value as "date" | "views" | "likes")
          }
          className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="date">Date (Newest First)</option>
          <option value="views">Views (Highest First)</option>
          <option value="likes">Likes (Highest First)</option>
        </select>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b">
        {allTabs.map((tab) => {
          const stats =
            tab === "All" ? getAllStats() : getClassificationStats(tab);
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                activeTab === tab
                  ? "bg-blue-500 text-white border-b-2 border-blue-500"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <div className="text-center">
                <div>
                  {tab} (
                  {tab === "All"
                    ? tweets.length
                    : tweets.filter((t) => t.classifier === tab).length}
                  )
                </div>
                <div className="text-xs opacity-75">
                  {stats.totalLikes} likes • {stats.totalViews} views
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Tweet content */}
      <div className="space-y-4">
        {sortedTweets.map((tweet) => (
          <div
            key={tweet._id}
            className="border rounded-lg p-4 bg-white shadow-sm"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                {tweet.classifier}
              </span>
              <div className="text-sm text-gray-500">
                {tweet.likeCount} likes • {tweet.viewCount} views
              </div>
            </div>
            <p className="text-gray-800 whitespace-pre-wrap">{tweet.text}</p>
            <div className="mt-2 text-xs text-gray-500">
              {new Date(tweet.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default page;
