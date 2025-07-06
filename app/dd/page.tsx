"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import React from "react";

function page() {
  const tweets = useQuery(api.myFunctions.getAllTweetsByAuthor, {
    username: "terrarix7",
  });
  console.log(tweets);
  return (
    <pre className=" p-4 rounded-lg overflow-auto">
      {JSON.stringify(
        tweets?.map((tweet) => ({
          text: tweet.text,
          likes: tweet.likeCount,
          views: tweet.viewCount,
          date: tweet.createdAt,
        })),
        null,
        2,
      )}
    </pre>
  );
}

export default page;
