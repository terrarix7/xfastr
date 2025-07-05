"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "@/convex/_generated/api";
import { authClient } from "@/lib/auth-client";

function Profile() {
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
      <div>{data?.email}</div>
      <button onClick={() => authClient.signOut()}>Sign out</button>
    </div>
  );
}

export default Profile;
