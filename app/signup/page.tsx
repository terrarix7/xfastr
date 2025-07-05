import React from "react";
import SignUpButton from "./button";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { redirect } from "next/navigation";
import { getToken } from "@convex-dev/better-auth/nextjs";
import { createAuth } from "@/convex/auth";

async function page() {
  const token = await getToken(createAuth);
  const isAuthenticated = await fetchQuery(
    api.auth.isAuthenticated,
    {},
    { token },
  );

  if (isAuthenticated) {
    redirect("/create");
  }

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Create your account
            </h2>
          </div>
          <SignUpButton />
        </div>
      </div>
    </div>
  );
}

export default page;
