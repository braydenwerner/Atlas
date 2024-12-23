"use client";

import { Button } from "@atlas/ui";
import { signIn, signOut, useSession } from "next-auth/react";

export function AuthShowcase() {
  const { data } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {data?.user && (
        <p className="text-center text-2xl">
          {<span>Logged in as {data.user.name}</span>}
        </p>
      )}
      <Button
        className="rounded-full px-10 py-3 font-semibold no-underline transition"
        onClick={data ? () => void signOut() : () => void signIn()}
      >
        {data ? "Sign out" : "Sign in"}
      </Button>
    </div>
  );
}
