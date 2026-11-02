import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
import readline from "readline";

// 1. Load environment variables from .env if present
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

// 2. Define User Schema
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ["SUPERADMIN", "ADMIN", "SPECIALIST", "STAFF"],
      default: "SUPERADMIN",
      required: true
    }
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

// Helper for interactive terminal input
function prompt(question, defaultValue = "") {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      const val = answer.trim();
      resolve(val || defaultValue);
    });
  });
}

async function connectDb() {
  console.log(`\n🔌 Connecting to MongoDB (${MONGODB_URI.includes("mongodb+srv") ? "Atlas Cloud" : "Local"})...`);
  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: "hunky_dory_db",
      serverSelectionTimeoutMS: 5000
    });
    console.log("✅ Connected to MongoDB successfully.");
  } catch (err) {
    if (!MONGODB_URI.includes("127.0.0.1") && !MONGODB_URI.includes("localhost")) {
      console.warn("⚠️ Remote Atlas connection failed (likely IP whitelist). Trying local MongoDB fallback...");
      await mongoose.connect("mongodb://127.0.0.1:27017/hunky_dory_db", {
        serverSelectionTimeoutMS: 3000
      });
      console.log("✅ Connected to local MongoDB fallback [mongodb://127.0.0.1:27017/hunky_dory_db].");
    } else {
      throw err;
    }
  }
}

async function main() {
  console.log("==================================================");
  console.log("👑  Hunky Dory - SuperAdmin Account Creator");
  console.log("==================================================");

  await connectDb();

  // CLI Arguments support: node scripts/create-superadmin.mjs <email> <password> [name]
  const args = process.argv.slice(2);
  let email = args[0];
  let password = args[1];
  let name = args[2];

  // If arguments not provided via CLI, prompt interactively
  if (!email) {
    email = await prompt("📧 Enter SuperAdmin Email: ");
  }

  while (!email || !email.includes("@")) {
    console.log("❌ Please enter a valid email address.");
    email = await prompt("📧 Enter SuperAdmin Email: ");
  }

  if (!password) {
    password = await prompt("🔑 Enter SuperAdmin Password (min 6 characters): ");
  }

  while (!password || password.length < 6) {
    console.log("❌ Password must be at least 6 characters long.");
    password = await prompt("🔑 Enter SuperAdmin Password: ");
  }

  if (!name) {
    name = await prompt("👤 Enter Full Name [Default: Super Administrator]: ", "Super Administrator");
  }

  const normalizedEmail = email.trim().toLowerCase();
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  // Check if user already exists
  const existingUser = await User.findOne({ email: normalizedEmail });

  if (existingUser) {
    existingUser.name = name.trim();
    existingUser.passwordHash = passwordHash;
    existingUser.role = "SUPERADMIN";
    await existingUser.save();
    console.log(`\n🔄 Updated existing account [${normalizedEmail}] to SUPERADMIN.`);
  } else {
    await User.create({
      name: name.trim(),
      email: normalizedEmail,
      passwordHash,
      role: "SUPERADMIN"
    });
    console.log(`\n🎉 SuperAdmin account created successfully!`);
  }

  // Ask to clean up legacy static demo users if any exist
  const demoEmails = ["admin@hunkydory.edu", "specialist@hunkydory.edu", "staff@hunkydory.edu"];
  const demoUsersCount = await User.countDocuments({ email: { $in: demoEmails } });

  if (demoUsersCount > 0) {
    const shouldClean = (await prompt(`\n🧹 Found ${demoUsersCount} legacy demo users (admin@hunkydory.edu, etc.). Remove them now? (Y/n): `, "Y")).toLowerCase();
    if (shouldClean === "y" || shouldClean === "yes") {
      const res = await User.deleteMany({ email: { $in: demoEmails } });
      console.log(`✅ Removed ${res.deletedCount} static demo user accounts.`);
    }
  }

  console.log("\n==================================================");
  console.log("📋 SUPERADMIN CREDENTIALS SUMMARY");
  console.log("==================================================");
  console.log(`Name:     ${name}`);
  console.log(`Email:    ${normalizedEmail}`);
  console.log(`Role:     SUPERADMIN`);
  console.log(`Portal:   http://localhost:3000/admin/login`);
  console.log("==================================================\n");

  process.exit(0);
}

main().catch((err) => {
  console.error("\n❌ Error creating SuperAdmin:", err.message || err);
  process.exit(1);
});

