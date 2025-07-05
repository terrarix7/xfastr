"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "@/convex/_generated/api";
import Link from "next/link";

function page() {
  const {
    data: currentUser,
    isPending: userPending,
    error: userError,
  } = useQuery(convexQuery(api.auth.getCurrentUser, {}));

  const {
    data: authors,
    isPending: authorsPending,
    error: authorsError,
  } = useQuery(convexQuery(api.myFunctions.getUserAuthors, {}));

  if (userPending || authorsPending) {
    return <div>Loading...</div>;
  }

  if (userError || authorsError) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Profile</h1>

      {/* Current User Info */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">User Information</h2>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p>
            <strong>Name:</strong> {currentUser?.name || "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {currentUser?.email || "N/A"}
          </p>
          {currentUser?.image && (
            <div className="mt-2">
              <img
                src={currentUser.image}
                alt="Profile"
                className="w-16 h-16 rounded-full"
              />
            </div>
          )}
        </div>
      </div>

      {/* Authors Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Your Authors</h2>
        {authors && authors.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {authors.map((author) => (
              <Link href={`/profile/${author.userName}`} key={author._id}>
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <div className="flex items-center mb-3">
                    {author.profilePicture && (
                      <img
                        src={author.profilePicture}
                        alt={author.name}
                        className="w-12 h-12 rounded-full mr-3"
                      />
                    )}
                    <div>
                      <h3 className="font-semibold text-lg">{author.name}</h3>
                      <p className="text-gray-600 text-sm">
                        @{author.userName}
                      </p>
                    </div>
                  </div>

                  <div className="text-sm text-gray-700 space-y-1">
                    <p>
                      <strong>Followers:</strong>{" "}
                      {author.followers.toLocaleString()}
                    </p>
                    <p>
                      <strong>Following:</strong>{" "}
                      {author.following.toLocaleString()}
                    </p>
                    {author.firstTweetDate && (
                      <p>
                        <strong>First Tweet:</strong>{" "}
                        {new Date(author.firstTweetDate).toLocaleDateString()}
                      </p>
                    )}
                    {author.lastTweetDate && (
                      <p>
                        <strong>Last Tweet:</strong>{" "}
                        {new Date(author.lastTweetDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">
              No authors found. Add some authors to track their content!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default page;
