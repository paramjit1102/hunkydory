import mongoose from "mongoose";
import fs from "fs";
import path from "path";

// Read environment variables from .env
const envPath = path.resolve(process.cwd(), ".env");
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, "utf-8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const [key, ...values] = trimmed.split("=");
    if (key && values.length > 0) {
      const val = values.join("=").replace(/^["']|["']$/g, "").trim();
      if (process.env[key.trim()] === undefined) {
        process.env[key.trim()] = val;
      }
    }
  }
}

const MONGODB_URI =
  process.env.MONGODB_URI ||
  process.env.DATABASE_URL ||
  "mongodb://127.0.0.1:27017/hunky_dory_db";

async function seed() {
  console.log(`Connecting to MongoDB (${MONGODB_URI.includes("mongodb+srv") ? "Atlas Cloud" : "Local"})...`);
  try {
    await mongoose.connect(MONGODB_URI, { dbName: "hunky_dory_db", serverSelectionTimeoutMS: 5000 });
  } catch (err) {
    if (!MONGODB_URI.includes("127.0.0.1") && !MONGODB_URI.includes("localhost")) {
      console.warn("⚠️ Remote Atlas connection timed out. Falling back to local MongoDB...");
      await mongoose.connect("mongodb://127.0.0.1:27017/hunky_dory_db", { serverSelectionTimeoutMS: 3000 });
    } else {
      throw err;
    }
  }
  console.log("Connected successfully to hunky_dory_db!");

  console.log("ℹ️ Static demo users have been removed.");
  console.log("👉 To create your SuperAdmin account, run: npm run create-superadmin");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
