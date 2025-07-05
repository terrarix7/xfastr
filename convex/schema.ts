import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    name: v.string(),
    image: v.optional(v.string()),
    createdAt: v.optional(v.number()),
    updatedAt: v.optional(v.number()),
  }),

  authors: defineTable({
    userName: v.string(),
    url: v.string(),
    name: v.string(),
    profilePicture: v.optional(v.string()),
    coverPicture: v.optional(v.string()),
    followers: v.number(),
    following: v.number(),
    createdAt: v.string(),
    firstTweetDate: v.optional(v.string()), // date of first tracked tweet
    lastTweetDate: v.optional(v.string()), // date of most recent tracked tweet
  }).index("by_userName", ["userName"]),

  userAuthors: defineTable({
    userId: v.id("users"),
    authorId: v.id("authors"),
    createdAt: v.optional(v.number()),
  })
    .index("by_user", ["userId"])
    .index("by_author", ["authorId"])
    .index("by_user_author", ["userId", "authorId"]),

  tweets: defineTable({
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
  })
    .index("by_author", ["authorId"])
    .index("by_createdAt", ["createdAt"]),

  dailyFollowerCounts: defineTable({
    authorId: v.id("authors"),
    date: v.string(), // YYYY-MM-DD format
    followerCount: v.number(),
    followingCount: v.number(),
    followerChange: v.number(), // change from previous day
    followingChange: v.number(), // change from previous day
  })
    .index("by_author_date", ["authorId", "date"])
    .index("by_date", ["date"]),
});
