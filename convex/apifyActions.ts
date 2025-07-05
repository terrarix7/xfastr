"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";
import { ApifyClient } from "apify-client";
import { betterAuthComponent } from "./auth";
import { api } from "./_generated/api";
import { Id } from "./_generated/dataModel";

// Type definitions for Apify response
interface ApifyAuthor {
  type: string;
  userName: string;
  url: string;
  twitterUrl: string;
  id: string;
  name: string;
  isVerified: boolean;
  isBlueVerified: boolean;
  profilePicture: string;
  coverPicture: string;
  description: string;
  location: string;
  followers: number;
  following: number;
  status: string;
  canDm: boolean;
  canMediaTag: boolean;
  createdAt: string;
  entities: any;
  fastFollowersCount: number;
  favouritesCount: number;
  hasCustomTimelines: boolean;
  isTranslator: boolean;
  mediaCount: number;
  statusesCount: number;
  withheldInCountries: any[];
  affiliatesHighlightedLabel: any;
  possiblySensitive: boolean;
  pinnedTweetIds: string[];
  profile_bio: any;
  isAutomated: boolean;
  automatedBy: any;
}

interface ApifyTweet {
  type: string;
  id: string;
  url: string;
  twitterUrl: string;
  text: string;
  source: string;
  retweetCount: number;
  replyCount: number;
  likeCount: number;
  quoteCount: number;
  viewCount: number;
  createdAt: string;
  lang: string;
  bookmarkCount: number;
  isReply: boolean;
  inReplyToId: string | null;
  conversationId: string;
  inReplyToUserId: string | null;
  inReplyToUsername: string | null;
  isPinned: boolean;
  author: ApifyAuthor;
  extendedEntities: any;
  card: any;
  place: any;
  entities: any;
  reply_to_user_results: any;
  quoted_tweet_results: any;
  quoted_tweet: any;
  retweeted_tweet: any;
  isConversationControlled: boolean;
}

// Mock tweet type for filtering
interface ApifyMockTweet {
  type: "mock_tweet";
  id: number;
  text: string;
}

// Union type for all possible Apify response items
type ApifyResponseItem = ApifyTweet | ApifyMockTweet;

const client = new ApifyClient({
  token: process.env.APIFY_TOKEN!,
});

export const fetchTweets = action({
  args: {
    userName: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if the request is authenticated and the person exists
    const user = await betterAuthComponent.getAuthUser(ctx);
    if (!user) {
      throw new Error("User not authenticated");
    }

    // Check if the author already exists
    const existingAuthor = await ctx.runQuery(
      api.apifyFunctions.getByUserName,
      {
        userName: args.userName,
      },
    );

    if (existingAuthor) {
      // Check if user is already associated with this author
      const existingAssociation = await ctx.runQuery(
        api.apifyFunctions.getByUserAndAuthor,
        {
          userId: user.userId as Id<"users">,
          authorId: existingAuthor._id,
        },
      );

      if (!existingAssociation) {
        // Associate the author with the current user
        await ctx.runMutation(api.apifyFunctions.createUserAuthor, {
          userId: user.userId as Id<"users">,
          authorId: existingAuthor._id,
        });
      }

      return {
        success: true,
        message: "Author already exists and is now associated with user",
      };
    }

    // Calculate date range: last 2 months and 10 days, excluding last 5 days
    const now = new Date();
    const fiveDaysAgo = new Date(now);
    fiveDaysAgo.setDate(now.getDate() - 5);

    const startDate = new Date(now);
    startDate.setMonth(now.getMonth() - 2);
    startDate.setDate(startDate.getDate() - 10);

    const formatDate = (date: Date) => {
      return date
        .toISOString()
        .replace(/\.\d{3}Z$/, "_UTC")
        .replace(/:/g, ":");
    };

    // Prepare Actor input
    const input = {
      searchTerms: [
        `from:${args.userName} since:${formatDate(startDate)} until:${formatDate(fiveDaysAgo)}`,
      ],
      maxItems: 2000,
      queryType: "Latest",
      lang: "en",
      from: args.userName,
      "filter:blue_verified": false,
      "filter:nativeretweets": false,
      "include:nativeretweets": false,
      "filter:replies": false,
      "filter:quote": false,
      "filter:has_engagement": false,
      min_retweets: 0,
      min_faves: 0,
      min_replies: 0,
      "-min_retweets": 0,
      "-min_faves": 0,
      "-min_replies": 0,
      "filter:media": false,
      "filter:twimg": false,
      "filter:images": false,
      "filter:videos": false,
      "filter:native_video": false,
      "filter:vine": false,
      "filter:consumer_video": false,
      "filter:pro_video": false,
      "filter:spaces": false,
      "filter:links": false,
      "filter:mentions": false,
      "filter:news": false,
      "filter:safe": false,
      "filter:hashtags": false,
    };

    try {
      // Run the Actor and wait for it to finish
      const run = await client.actor("CJdippxWmn9uRfooo").call(input);

      // Fetch Actor results from the run's dataset
      const { items } = await client.dataset(run.defaultDatasetId).listItems();

      // Filter out mock tweets and type the results properly
      const realTweets = (items as unknown as ApifyResponseItem[]).filter(
        (item): item is ApifyTweet => item.type === "tweet",
      );

      if (realTweets.length === 0) {
        throw new Error("No real tweets found for this user");
      }

      // Get author info from the first tweet
      const firstTweet = realTweets[0];
      const authorData = firstTweet.author;

      const authorId: Id<"authors"> = await ctx.runMutation(
        api.apifyFunctions.createAuthor,
        {
          userName: authorData.userName,
          url: authorData.url,
          name: authorData.name,
          profilePicture: authorData.profilePicture || undefined,
          coverPicture: authorData.coverPicture || undefined,
          followers: authorData.followers,
          following: authorData.following,
          createdAt: authorData.createdAt,
          firstTweetDate: realTweets[realTweets.length - 1].createdAt, // oldest tweet
          lastTweetDate: realTweets[0].createdAt, // newest tweet
        },
      );

      // Associate the author with the current user
      await ctx.runMutation(api.apifyFunctions.createUserAuthor, {
        userId: user.userId as Id<"users">,
        authorId: authorId,
      });

      // Store all tweets
      for (const tweet of realTweets) {
        await ctx.runMutation(api.apifyFunctions.createTweet, {
          url: tweet.url,
          text: tweet.text,
          retweetCount: tweet.retweetCount,
          replyCount: tweet.replyCount,
          likeCount: tweet.likeCount,
          quoteCount: tweet.quoteCount,
          viewCount: tweet.viewCount,
          bookmarkCount: tweet.bookmarkCount,
          createdAt: tweet.createdAt,
          isReply: tweet.isReply,
          inReplyToUsername: tweet.inReplyToUsername || undefined,
          authorId: authorId,
        });
      }

      return {
        success: true,
        message: `Successfully fetched and stored ${realTweets.length} tweets for ${args.userName}`,
        authorId: authorId,
        tweetsCount: realTweets.length,
      };
    } catch (error) {
      console.error("Error fetching tweets:", error);
      throw new Error(`Failed to fetch tweets: ${error}`);
    }
  },
});
