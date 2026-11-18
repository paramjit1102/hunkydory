import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
import readline from "readline";

// 1. Load environment variables from .env
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
      console.warn("⚠️ Remote Atlas connection failed. Trying local MongoDB fallback...");
      await mongoose.connect("mongodb://127.0.0.1:27017/hunky_dory_db", {
        serverSelectionTimeoutMS: 3000
      });
      console.log("✅ Connected to local MongoDB fallback.");
    } else {
      throw err;
    }
  }
}

async function main() {
  console.log("==================================================");
  console.log("🔐  Hunky Dory - Admin Password Reset Tool");
  console.log("==================================================");

  await connectDb();

  const allUsers = await User.find({}, "name email role");
  if (allUsers.length === 0) {
    console.log("❌ No users found in database! Run 'npm run create-superadmin' to create one.");
    process.exit(1);
  }

  console.log("\nCurrent registered accounts:");
  allUsers.forEach((u, i) => {
    console.log(`  ${i + 1}. ${u.email} (${u.name} - [${u.role}])`);
  });

  const args = process.argv.slice(2);
  let email = args[0];
  let newPassword = args[1];

  if (!email) {
    const defaultEmail = allUsers[0]?.email;
    email = await prompt(`\n📧 Enter email of account to change password [Default: ${defaultEmail}]: `, defaultEmail);
  }

  const normalizedEmail = email.trim().toLowerCase();
  const user = await User.findOne({ email: normalizedEmail });

  if (!user) {
    console.log(`❌ No account found with email: ${normalizedEmail}`);
    process.exit(1);
  }

  if (!newPassword) {
    newPassword = await prompt("🔑 Enter New Password (min 6 characters): ");
  }

  while (!newPassword || newPassword.length < 6) {
    console.log("❌ Password must be at least 6 characters.");
    newPassword = await prompt("🔑 Enter New Password: ");
  }

  const salt = await bcrypt.genSalt(10);
  user.passwordHash = await bcrypt.hash(newPassword, salt);
  await user.save();

  console.log("\n==================================================");
  console.log("✅ PASSWORD UPDATED SUCCESSFULLY!");
  console.log("==================================================");
  console.log(`User:      ${user.name}`);
  console.log(`Email:     ${user.email}`);
  console.log(`Role:      ${user.role}`);
  console.log(`Login URL: https://www.hunkydory.co.in/admin/login`);
  console.log("==================================================\n");

  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Error updating password:", err.message || err);
  process.exit(1);
});
