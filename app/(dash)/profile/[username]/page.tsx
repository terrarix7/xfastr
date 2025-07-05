"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "../../../../convex/_generated/api";
import {
  ExternalLink,
  Eye,
  Heart,
  MessageCircle,
  Quote,
  Repeat2,
} from "lucide-react";

function ProfilePage() {
  const params = useParams();
  const username = params.username as string;
  const [sortBy, setSortBy] = useState<"date" | "views" | "likes">("date");

  const {
    data: tweets,
    isPending,
    error,
  } = useQuery(
    convexQuery(api.myFunctions.getAllTweetsByAuthor, {
      username,
      sortBy,
    }),
  );

  if (tweets === undefined) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">@{username}</h1>
          <p className="text-gray-600">Loading tweets...</p>
        </div>
      </div>
    );
  }

  if (!tweets || tweets.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">@{username}</h1>
          <p className="text-gray-600">No tweets found for this author.</p>
        </div>
      </div>
    );
  }

  // Get author info from the first tweet
  const author = tweets[0]?.author;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Author Header */}
      {author && (
        <div className="mb-8 border-b pb-6">
          <div className="flex items-center gap-4 mb-4">
            {author.profilePicture ? (
              <img
                src={author.profilePicture}
                alt={author.name}
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-gray-600 font-semibold text-xl">
                  {author.name.charAt(0)}
                </span>
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {author.name}
              </h1>
              <p className="text-gray-500 text-lg">@{author.userName}</p>
              <a
                href={author.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700"
              >
                View Profile on Twitter →
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Tweet Count and Sorting Options */}
      <div className="mb-6 flex justify-between items-center">
        <p className="text-gray-600">
          {tweets.length} tweet{tweets.length !== 1 ? "s" : ""}
        </p>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as "date" | "views" | "likes")
            }
            className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="date">Date (Newest First)</option>
            <option value="views">Views (Highest First)</option>
            <option value="likes">Likes (Highest First)</option>
          </select>
        </div>
      </div>

      {/* Tweets */}
      <div className="space-y-4">
        {tweets.map((tweet) => (
          <TweetCard key={tweet._id} tweet={tweet} />
        ))}
      </div>
    </div>
  );
}

function TweetCard({ tweet }: { tweet: any }) {
  return (
    <div className="border rounded-lg p-4 mb-4 shadow-sm">
      <div className="flex gap-4">
        <div className="flex-shrink-0 text-gray-100 text-sm">
          {new Date(tweet.createdAt).toLocaleDateString()}
        </div>

        <div className="flex-1">
          <div className="mb-3">
            <p className="text-gray-200 whitespace-pre-wrap">{tweet.text}</p>
            {tweet.isReply && tweet.inReplyToUsername && (
              <p className="text-gray-500 text-sm mt-2">
                Replying to @{tweet.inReplyToUsername}
              </p>
            )}
          </div>

          <div className="flex items-center gap-4 text-gray-100 text-sm">
            <span className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              {tweet.replyCount}
            </span>
            <span className="flex items-center gap-1">
              <Repeat2 className="w-4 h-4" />
              {tweet.retweetCount}
            </span>
            <span className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              {tweet.likeCount}
            </span>
            <span className="flex items-center gap-1">
              <Quote className="w-4 h-4" />
              {tweet.quoteCount}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {tweet.viewCount}
            </span>
            <a
              href={tweet.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-200 hover:text-blue-300 flex items-center"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
