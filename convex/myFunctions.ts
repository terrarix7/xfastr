import { query, action } from "./_generated/server";
import { polar } from "./polar";
import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";

export const listProducts = query({
  args: {},
  handler: async (ctx) => {
    const products = await polar.listProducts(ctx);
    console.log(products);
    return products;
  },
});

export const syncProducts = action({
  args: {},
  handler: async (ctx) => {
    const products = await polar.syncProducts(ctx);
    console.log(products);
    return products;
  },
});

export const getUserAuthors = query({
  args: {},
  handler: async (ctx) => {
    // Get the current user
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("User not authenticated");
    }

    // Find the user record
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), identity.email))
      .unique();

    if (!user) {
      throw new Error("User not found");
    }

    // Get all userAuthors records for this user
    const userAuthors = await ctx.db
      .query("userAuthors")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();

    // Get all authors for this user
    const authors = await Promise.all(
      userAuthors.map(async (userAuthor) => {
        const author = await ctx.db.get(userAuthor.authorId);
        return author;
      }),
    );

    // Filter out any null authors (in case of deleted records)
    return authors.filter((author) => author !== null);
  },
});

export const getTweetsByAuthor = query({
  args: {
    paginationOptions: v.object({
      cursor: v.union(v.string(), v.null()),
      numItems: v.optional(v.number()),
    }),
    username: v.string(),
    sortBy: v.optional(
      v.union(v.literal("date"), v.literal("views"), v.literal("likes")),
    ),
  },
  handler: async (
    ctx,
    { paginationOptions: { cursor, numItems }, username, sortBy },
  ) => {
    // First find the author by username
    const author = await ctx.db
      .query("authors")
      .withIndex("by_userName", (q) => q.eq("userName", username))
      .unique();

    if (!author) {
      throw new Error(`Author with username ${username} not found`);
    }

    // Get all tweets for this author first (since we need to sort before paginating)
    const allTweets = await ctx.db
      .query("tweets")
      .withIndex("by_author", (q) => q.eq("authorId", author._id))
      .collect();

    // Transform tweets to include author info
    const tweetsWithAuthor = allTweets.map((tweet) => ({
      _id: tweet._id,
      text: tweet.text,
      url: tweet.url,
      retweetCount: tweet.retweetCount,
      replyCount: tweet.replyCount,
      likeCount: tweet.likeCount,
      quoteCount: tweet.quoteCount,
      viewCount: tweet.viewCount,
      bookmarkCount: tweet.bookmarkCount,
      createdAt: tweet.createdAt,
      isReply: tweet.isReply,
      inReplyToUsername: tweet.inReplyToUsername,
      author: {
        _id: author._id,
        userName: author.userName,
        name: author.name,
        profilePicture: author.profilePicture,
        url: author.url,
      },
    }));

    // Sort tweets based on the sortBy parameter (default to date)
    const sortOption = sortBy || "date";
    switch (sortOption) {
      case "views":
        tweetsWithAuthor.sort((a, b) => b.viewCount - a.viewCount);
        break;
      case "likes":
        tweetsWithAuthor.sort((a, b) => b.likeCount - a.likeCount);
        break;
      case "date":
      default:
        tweetsWithAuthor.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        break;
    }

    // Manual pagination since we sorted the results
    const itemsPerPage = numItems ?? 24;
    const startIndex = cursor ? parseInt(cursor) : 0;
    const endIndex = startIndex + itemsPerPage;
    const page = tweetsWithAuthor.slice(startIndex, endIndex);
    const hasMore = endIndex < tweetsWithAuthor.length;

    return {
      items: page,
      nextCursor: hasMore ? endIndex.toString() : undefined,
    };
  },
});

export const getAllTweetsByAuthor = query({
  args: {
    username: v.string(),
  },
  handler: async (ctx, args) => {
    const author = await ctx.db
      .query("authors")
      .withIndex("by_userName", (q) => q.eq("userName", args.username))
      .unique();

    if (!author) {
      throw new Error(`Author with username ${args.username} not found`);
    }

    const tweets = await ctx.db
      .query("tweets")
      .withIndex("by_author", (q) => q.eq("authorId", author._id))
      .collect();

    const tweetsWithAuthor = tweets.map((tweet) => ({
      _id: tweet._id,
      text: tweet.text,
      url: tweet.url,
      retweetCount: tweet.retweetCount,
      replyCount: tweet.replyCount,
      likeCount: tweet.likeCount,
      quoteCount: tweet.quoteCount,
      viewCount: tweet.viewCount,
      bookmarkCount: tweet.bookmarkCount,
      createdAt: tweet.createdAt,
      isReply: tweet.isReply,
      inReplyToUsername: tweet.inReplyToUsername,
      classifier: tweet.classification,
      author: {
        _id: author._id,
        userName: author.userName,
        name: author.name,
        profilePicture: author.profilePicture,
        url: author.url,
        classifiers: author.classifiers,
      },
    }));

    tweetsWithAuthor.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    return tweetsWithAuthor;
  },
});
