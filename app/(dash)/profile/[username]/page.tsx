"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { useConvex } from "convex/react";
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
  const convex = useConvex();

  // Get authors from cached query
  const { data: authors } = useQuery(
    convexQuery(api.myFunctions.getUserAuthors, {}),
  );

  // Find the specific author from the cached data
  const author = authors?.find((a) => a.userName === username);

  const {
    data,
    isPending,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["tweets", username, sortBy],
    async queryFn({ pageParam }: { pageParam: string | null }) {
      const result = await convex.query(api.myFunctions.getTweetsByAuthor, {
        username,
        sortBy,
        paginationOptions: {
          cursor: pageParam,
          numItems: 10,
        },
      });
      return result;
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: null,
  });

  const tweets = data?.pages.flatMap((page) => page.items) ?? [];

  // Infinite scroll implementation
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight * 0.8
    ) {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Author Header */}
      {author ? (
        <div className="mb-8 border-b border-gray-700 pb-6">
          <div className="flex items-center gap-4 mb-4">
            {author.profilePicture ? (
              <img
                src={author.profilePicture}
                alt={author.name}
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center">
                <span className="text-gray-300 font-semibold text-xl">
                  {author.name.charAt(0)}
                </span>
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold text-white">{author.name}</h1>
              <p className="text-gray-400 text-lg">@{author.userName}</p>
              <a
                href={`https://twitter.com/${author.userName}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                View Profile on Twitter →
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-8 border-b border-gray-700 pb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 rounded-full bg-gray-700 animate-pulse"></div>
            <div>
              <div className="h-8 bg-gray-700 rounded animate-pulse mb-2 w-48"></div>
              <div className="h-6 bg-gray-700 rounded animate-pulse mb-2 w-32"></div>
              <div className="h-4 bg-gray-700 rounded animate-pulse w-40"></div>
            </div>
          </div>
        </div>
      )}

      {/* Tweet Count and Sorting Options */}
      <div className="mb-6 flex justify-between items-center">
        {tweets ? (
          <p className="text-gray-300">
            {tweets.length} tweet{tweets.length !== 1 ? "s" : ""}
          </p>
        ) : (
          <div className="h-5 bg-gray-700 rounded animate-pulse w-24"></div>
        )}

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-300">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as "date" | "views" | "likes")
            }
            className="px-3 py-1 border border-gray-600 bg-gray-800 text-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="date">Date (Newest First)</option>
            <option value="views">Views (Highest First)</option>
            <option value="likes">Likes (Highest First)</option>
          </select>
        </div>
      </div>

      {/* Tweets */}
      <div className="space-y-4">
        {isPending ? (
          // Show skeleton loading cards
          Array.from({ length: 5 }).map((_, index) => (
            <TweetSkeleton key={index} />
          ))
        ) : tweets && tweets.length > 0 ? (
          <>
            {tweets.map((tweet) => (
              <TweetCard key={tweet._id} tweet={tweet} />
            ))}
            {isFetchingNextPage && (
              <div className="text-center py-4">
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                  <span className="text-gray-300">Loading more tweets...</span>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-300">No tweets found for this author.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function TweetSkeleton() {
  return (
    <div className="border border-gray-700 bg-gray-800 rounded-lg p-4 mb-4 shadow-sm">
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <div className="h-4 bg-gray-700 rounded animate-pulse w-20"></div>
        </div>

        <div className="flex-1">
          <div className="mb-3">
            <div className="h-4 bg-gray-700 rounded animate-pulse mb-2 w-full"></div>
            <div className="h-4 bg-gray-700 rounded animate-pulse mb-2 w-3/4"></div>
            <div className="h-4 bg-gray-700 rounded animate-pulse w-1/2"></div>
          </div>

          <div className="flex items-center gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-4 bg-gray-700 rounded animate-pulse w-8"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TweetCard({ tweet }: { tweet: any }) {
  return (
    <div className="border border-gray-700 bg-gray-800 rounded-lg p-4 mb-4 shadow-sm">
      <div className="flex gap-4">
        <div className="flex-shrink-0 text-gray-400 text-sm">
          {new Date(tweet.createdAt).toLocaleDateString()}
        </div>

        <div className="flex-1">
          <div className="mb-3">
            <p className="text-white whitespace-pre-wrap">{tweet.text}</p>
            {tweet.isReply && tweet.inReplyToUsername && (
              <p className="text-gray-400 text-sm mt-2">
                Replying to @{tweet.inReplyToUsername}
              </p>
            )}
          </div>

          <div className="flex items-center gap-4 text-gray-400 text-sm">
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
              className="text-blue-400 hover:text-blue-300 flex items-center"
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
