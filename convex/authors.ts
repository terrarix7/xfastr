import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const updateAuthorClassifiers = mutation({
  args: {
    authorId: v.id("authors"),
    newClassifiers: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const author = await ctx.db.get(args.authorId);

    if (!author) {
      console.error(`Author with ID ${args.authorId} not found.`);
      return;
    }

    // Combine existing classifiers with new ones, ensuring uniqueness
    const existingClassifiers = new Set(author.classifiers || []);
    args.newClassifiers.forEach((classifier) => {
      existingClassifiers.add(classifier);
    });

    // Update the author document with the merged list
    await ctx.db.patch(args.authorId, {
      classifiers: Array.from(existingClassifiers).sort(), // Sort for consistency
    });
  },
});
