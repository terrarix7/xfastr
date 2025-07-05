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
    paginationOpts: paginationOptsValidator,
    username: v.string(),
  },
  handler: async (ctx, args) => {
    // First find the author by username
    const author = await ctx.db
      .query("authors")
      .withIndex("by_userName", (q) => q.eq("userName", args.username))
      .unique();

    if (!author) {
      throw new Error(`Author with username ${args.username} not found`);
    }

    // Get tweets for this author with pagination, ordered by creation date (newest first)
    const results = await ctx.db
      .query("tweets")
      .withIndex("by_author", (q) => q.eq("authorId", author._id))
      .order("desc")
      .paginate(args.paginationOpts);

    return {
      ...results,
      page: results.page.map((tweet) => ({
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
      })),
    };
  },
});

export const getAllTweetsByAuthor = query({
  args: {
    username: v.string(),
    sortBy: v.optional(
      v.union(v.literal("views"), v.literal("likes"), v.literal("date")),
    ),
  },
  handler: async (ctx, args) => {
    // First find the author by username
    const author = await ctx.db
      .query("authors")
      .withIndex("by_userName", (q) => q.eq("userName", args.username))
      .unique();

    if (!author) {
      throw new Error(`Author with username ${args.username} not found`);
    }

    // Get all tweets for this author
    const tweets = await ctx.db
      .query("tweets")
      .withIndex("by_author", (q) => q.eq("authorId", author._id))
      .collect();

    // Transform tweets to include author info
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
      author: {
        _id: author._id,
        userName: author.userName,
        name: author.name,
        profilePicture: author.profilePicture,
        url: author.url,
      },
    }));

    // Sort tweets based on the sortBy parameter
    const sortBy = args.sortBy || "date";
    switch (sortBy) {
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

    return tweetsWithAuthor;
  },
});
