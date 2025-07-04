import { v } from "convex/values";
import { query, mutation, action } from "./_generated/server";
import { api } from "./_generated/api";
import { betterAuthComponent } from "./auth";
import { polar } from "./polar";

// Write your Convex functions in any file inside this directory (`convex`).
// See https://docs.convex.dev/functions for more.

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
    const products = await polar.listProducts(ctx);
    console.log(products);
    return products;
  },
});
