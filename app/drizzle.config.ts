import { defineConfig } from "drizzle-kit";
import { POSTGRES_URI } from "./dev_vars";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dbCredentials:{
    url: POSTGRES_URI
  }
});