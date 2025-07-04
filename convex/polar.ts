// convex/example.ts
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

  products: {
    basicMonthly: "6b02c53a-33cc-48c9-a5de-f2f3bd176f31",
    basicYearly: "8b6ef10a-7d53-48ee-9f2d-1f07c35b721d",
    proMonthly: "c9e9a6e7-c6a5-4e61-b682-f15430df719d",
    proYearly: "cdaf2e9c-f083-4f4e-a317-014b86c23201",
    premiumPlusMonthly: "ba6ad859-9341-48b9-bd2f-b15fc25bb470",
    premiumPlusYearly: "e91985cd-5988-4bd8-9f07-1d589600dab4",
  },
});

// Export API functions from the Polar client
export const {
  changeCurrentSubscription,
  cancelCurrentSubscription,
  getConfiguredProducts,
  listAllProducts,
  generateCheckoutLink,
  generateCustomerPortalUrl,
} = polar.api();
