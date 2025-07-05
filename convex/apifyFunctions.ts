import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Authors queries
export const getByUserName = query({
  args: {
    userName: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("authors")
      .withIndex("by_userName", (q) => q.eq("userName", args.userName))
      .first();
  },
});

// UserAuthors queries
export const getByUserAndAuthor = query({
  args: {
    userId: v.id("users"),
    authorId: v.id("authors"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("userAuthors")
      .withIndex("by_user_author", (q) =>
        q.eq("userId", args.userId).eq("authorId", args.authorId),
      )
      .first();
  },
});

// Authors mutations
export const createAuthor = mutation({
  args: {
    userName: v.string(),
    url: v.string(),
    name: v.string(),
    profilePicture: v.optional(v.string()),
    coverPicture: v.optional(v.string()),
    followers: v.number(),
    following: v.number(),
    createdAt: v.string(),
    firstTweetDate: v.optional(v.string()),
    lastTweetDate: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("authors", {
      userName: args.userName,
      url: args.url,
      name: args.name,
      profilePicture: args.profilePicture,
      coverPicture: args.coverPicture,
      followers: args.followers,
      following: args.following,
      createdAt: args.createdAt,
      firstTweetDate: args.firstTweetDate,
      lastTweetDate: args.lastTweetDate,
    });
  },
});

// UserAuthors mutations
export const createUserAuthor = mutation({
  args: {
    userId: v.id("users"),
    authorId: v.id("authors"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("userAuthors", {
      userId: args.userId,
      authorId: args.authorId,
      createdAt: Date.now(),
    });
  },
});

// Tweets mutations
export const createTweet = mutation({
  args: {
    url: v.string(),
    text: v.string(),
    retweetCount: v.number(),
    replyCount: v.number(),
    likeCount: v.number(),
    quoteCount: v.number(),
    viewCount: v.number(),
    bookmarkCount: v.number(),
    createdAt: v.string(),
    isReply: v.boolean(),
    inReplyToUsername: v.optional(v.string()),
    authorId: v.id("authors"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("tweets", {
      url: args.url,
      text: args.text,
      retweetCount: args.retweetCount,
      replyCount: args.replyCount,
      likeCount: args.likeCount,
      quoteCount: args.quoteCount,
      viewCount: args.viewCount,
      bookmarkCount: args.bookmarkCount,
      createdAt: args.createdAt,
      isReply: args.isReply,
      inReplyToUsername: args.inReplyToUsername,
      authorId: args.authorId,
    });
  },
});
