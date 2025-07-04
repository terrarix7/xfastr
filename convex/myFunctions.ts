import { query, action } from "./_generated/server";
import { polar } from "./polar";

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
