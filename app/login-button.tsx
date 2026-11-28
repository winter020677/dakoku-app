"use client";
import { authClient } from "@/lib/auth-client";

export default function LoginButton() {
  return (
    <button onClick={() => authClient.signIn.social({ provider: "google" })}>
      Googleでログイン
    </button>
  );
}
