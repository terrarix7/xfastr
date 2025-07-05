"use client";

import React from "react";
import SignOutButton from "./button";
import { useQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "@/convex/_generated/api";

function page() {
  const { data, isPending, error } = useQuery(
    convexQuery(api.auth.getCurrentUser, {}),
  );

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default page;
