"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React from "react";

function SignOutButton() {
  const router = useRouter();

  return (
    <div>
      <button
        onClick={() =>
          authClient.signOut().finally(() => {
            router.push("/signup");
          })
        }
      >
        Sign out
      </button>
    </div>
  );
}

export default SignOutButton;
