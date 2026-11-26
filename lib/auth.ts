import { db } from "@/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg" }),
  user: {
    additionalFields: {
      isGuest: {
        type: "boolean",
        required: false,
        defaultValue: false,
        input: false,
      },
    },
  },
});
