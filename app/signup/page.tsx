"use client";

import {
  Authenticated,
  Unauthenticated,
  AuthLoading,
  useQuery,
} from "convex/react";
import { authClient } from "@/lib/auth-client";
import { api } from "@/convex/_generated/api";

export default function App() {
  return (
    <>
      <AuthLoading>
        <div>Loading...</div>
      </AuthLoading>
      <Unauthenticated>
        <SignIn />
      </Unauthenticated>
      <Authenticated>
        <Dashboard />
      </Authenticated>
    </>
  );
}

function Dashboard() {
  const user = useQuery(api.auth.getCurrentUser);
  return (
    <div>
      <div>Hello {user?.name}!</div>
      <button onClick={() => authClient.signOut()}>Sign out</button>
    </div>
  );
}

function SignIn() {
  const handleGoogleSignUp = async () => {
    await authClient.signIn.social(
      {
        provider: "google",
      },
      {
        onError: (ctx) => {
          window.alert(ctx.error.message);
        },
      },
    );
  };

  return (
    <div>
      <button onClick={handleGoogleSignUp}>Continue with Google</button>
    </div>
  );
}
