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
    return <div className="text-muted-foreground">Loading...</div>;
  }

  if (userError || authorsError) {
    return <div className="text-muted-foreground">Error loading data</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-foreground">Profile</h1>

      {/* Current User Info */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-foreground">
          User Information
        </h2>
        <div className="bg-accent/30 border border-border/30 p-4 rounded-lg">
          <p className="text-foreground">
            <strong>Name:</strong> {currentUser?.name || "N/A"}
          </p>
          <p className="text-foreground">
            <strong>Email:</strong> {currentUser?.email || "N/A"}
          </p>
          {currentUser?.image && (
            <div className="mt-2">
              <img
                src={currentUser.image}
                alt="Profile"
                className="w-16 h-16 rounded-full border border-border/30"
              />
            </div>
          )}
        </div>
      </div>

      {/* Authors Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-foreground">
          Your Authors
        </h2>
        {authors && authors.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {authors.map((author) => (
              <Link href={`/profile/${author.userName}`} key={author._id}>
                <div className="border border-border/30 bg-accent/30 rounded-lg p-4 shadow-sm hover:bg-accent/50 transition-all">
                  <div className="flex items-center mb-3">
                    {author.profilePicture && (
                      <img
                        src={author.profilePicture}
                        alt={author.name}
                        className="w-12 h-12 rounded-full mr-3 border border-border/30"
                      />
                    )}
                    <div>
                      <h3 className="font-semibold text-lg text-foreground">
                        {author.name}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        @{author.userName}
                      </p>
                    </div>
                  </div>

                  <div className="text-sm text-foreground space-y-1">
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
            <p className="text-muted-foreground">
              No authors found. Add some authors to track their content!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default page;
