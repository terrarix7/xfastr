"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";
import { ApifyClient } from "apify-client";
import { betterAuthComponent } from "./auth";
import { api } from "./_generated/api";
import { Id } from "./_generated/dataModel";
import OpenAI from "openai";

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
interface ApifyMockTweet {
  type: "mock_tweet";
  id: number;
  text: string;
}

type ApifyResponseItem = ApifyTweet | ApifyMockTweet;

const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: process.env.DEEPSEEK_API_KEY!, // Use environment variables for keys!
});

const client = new ApifyClient({
  token: process.env.APIFY_TOKEN!,
});

const systemPrompt = `
You are an expert tweet classifier. Your task is to analyze a list of tweets and assign a concise, 1-2 word category to each that accurately reflects its primary intent.

**Input Format:**
You will receive a list of tweets, each with a unique 'Tweet ID'.

**Output Format:**
Your response MUST be a single valid JSON object. This object should contain one key: "classifications".
The value of "classifications" must be an array of objects.
Each object in the array must have two keys:
1. "id": The original Tweet ID you were given.
2. "category": The 1-2 word classification you determined.

**Example Output:**
{
  "classifications": [
    { "id": "1789...", "category": "Announcement" },
    { "id": "1788...", "category": "Tech Commentary" }
  ]
}

**Classification Guidelines:**
- **Focus on Intent:** Determine the core purpose of the tweet.
- **Conciseness:** Categories must be 1-2 words.
- **Adaptability:** If a tweet's intent doesn't fit the examples, create a new, descriptive category.
- **Inspiration Categories:** Feedback/Suggestion, Product Recommendation, Tech Commentary, Personal Update, Question, Announcement, Response/Reply, Reflection/Opinion, Casual Comment, Link Sharing, Advice, Casual Greeting, Meta Comment.

Do not include any text outside of the JSON object in your response.
`;

/**
 * Classifies a batch of tweets using an AI model.
 * @param tweets An array of ApifyTweet objects to classify.
 * @returns A Map where the key is the tweet ID and the value is its classification.
 */
async function classifyTweetsInBatch(
  tweets: ApifyTweet[],
): Promise<Map<string, string>> {
  if (tweets.length === 0) {
    return new Map();
  }

  // Format the tweets for the AI prompt
  const formattedTweets = tweets
    .map((tweet) => `Tweet ID: ${tweet.id}\nTweet Text: "${tweet.text}"`)
    .join("\n\n---\n\n");

  const userPrompt = `Please classify the following tweets:\n\n${formattedTweets}`;

  try {
    const response = await openai.chat.completions.create({
      model: "deepseek-chat", // or your preferred model
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" }, // Enforce JSON output
      temperature: 0.0, // For deterministic and consistent classification
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error("AI returned empty content.");
    }

    const result = JSON.parse(content);
    if (!result || !Array.isArray(result.classifications)) {
      throw new Error("AI returned malformed JSON.");
    }

    const classificationMap = new Map<string, string>();
    for (const item of result.classifications) {
      if (item.id && item.category) {
        classificationMap.set(String(item.id), item.category);
      }
    }

    // Check if any tweets were missed by the AI
    if (classificationMap.size !== tweets.length) {
      console.warn(
        `AI classified ${classificationMap.size} tweets, but received ${tweets.length}. Some may be unclassified.`,
      );
    }

    return classificationMap;
  } catch (error) {
    console.error("Error during AI tweet classification:", error);
    // Return an empty map on failure so the process can continue,
    // tweets will just be marked as "Unclassified".
    return new Map();
  }
}

export const fetchTweets = action({
  args: {
    userName: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await betterAuthComponent.getAuthUser(ctx);
    if (!user) {
      throw new Error("User not authenticated");
    }

    const existingAuthor = await ctx.runQuery(
      api.apifyFunctions.getByUserName,
      {
        userName: args.userName,
      },
    );

    if (existingAuthor) {
      const existingAssociation = await ctx.runQuery(
        api.apifyFunctions.getByUserAndAuthor,
        {
          userId: user.userId as Id<"users">,
          authorId: existingAuthor._id,
        },
      );

      if (!existingAssociation) {
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

    const now = new Date();
    const fiveDaysAgo = new Date(now);
    fiveDaysAgo.setDate(now.getDate() - 5);

    const startDate = new Date(now);
    startDate.setMonth(now.getMonth() - 2);
    startDate.setDate(startDate.getDate() - 10);

    const formatDate = (date: Date) => {
      return date.toISOString().replace(/\.\d{3}Z$/, "_UTC");
    };

    const input = {
      searchTerms: [
        `from:${args.userName} since:${formatDate(startDate)} until:${formatDate(
          fiveDaysAgo,
        )}`,
      ],
      maxItems: 2000,
      queryType: "Latest",
      lang: "en",
    };

    try {
      const run = await client.actor("CJdippxWmn9uRfooo").call(input);
      const { items } = await client.dataset(run.defaultDatasetId).listItems();
      const realTweets = (items as unknown as ApifyResponseItem[]).filter(
        (item): item is ApifyTweet => item.type === "tweet",
      );

      if (realTweets.length === 0) {
        throw new Error("No real tweets found for this user");
      }

      console.log(`Starting classification for ${realTweets.length} tweets...`);
      const allClassifications = new Map<string, string>();
      const batchSize = 100;

      for (let i = 0; i < realTweets.length; i += batchSize) {
        const batch = realTweets.slice(i, i + batchSize);
        console.log(`Classifying batch ${i / batchSize + 1}...`);
        const batchResults = await classifyTweetsInBatch(batch);
        batchResults.forEach((value, key) =>
          allClassifications.set(key, value),
        );
      }
      console.log("Classification complete.");

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
          firstTweetDate: realTweets[realTweets.length - 1].createdAt,
          lastTweetDate: realTweets[0].createdAt,
        },
      );

      await ctx.runMutation(api.apifyFunctions.createUserAuthor, {
        userId: user.userId as Id<"users">,
        authorId: authorId,
      });

      const uniqueClassifiers = new Set<string>();

      for (const tweet of realTweets) {
        const classification =
          allClassifications.get(tweet.id) || "Unclassified";

        if (classification !== "Unclassified") {
          uniqueClassifiers.add(classification);
        }

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
          classification: classification,
        });
      }

      if (uniqueClassifiers.size > 0) {
        await ctx.runMutation(api.authors.updateAuthorClassifiers, {
          authorId: authorId,
          newClassifiers: Array.from(uniqueClassifiers),
        });
      }

      return {
        success: true,
        message: `Successfully fetched, classified, and stored ${realTweets.length} tweets for ${args.userName}`,
        authorId: authorId,
        tweetsCount: realTweets.length,
      };
    } catch (error) {
      console.error("Error fetching tweets:", error);
      throw new Error(`Failed to fetch tweets: ${error}`);
    }
  },
});
