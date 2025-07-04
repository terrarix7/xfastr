import { Polar } from "@convex-dev/polar";
import { api, components } from "./_generated/api";
import { betterAuthComponent } from "./auth";
import { query } from "./_generated/server";

export const getCurrentUser = query({
  handler: async (ctx) => {
    const user = await betterAuthComponent.getAuthUser(ctx);
    if (!user) {
      throw new Error(`User not found: ${user} ${JSON.stringify(ctx)}`);
    }
    return {
      userId: user.userId,
      email: user.email,
    };
  },
});

export const polar = new Polar(components.polar, {
  getUserInfo: async (ctx) => {
    const user: {
      userId: string;
      email: string;
    } = await ctx.runQuery(api.polar.getCurrentUser);
    return {
      userId: user.userId,
      email: user.email,
    };
  },
});

// Export API functions from the Polar client
export const {
  changeCurrentSubscription,
  cancelCurrentSubscription,
  listAllProducts,
  generateCheckoutLink,
  generateCustomerPortalUrl,
} = polar.api();
