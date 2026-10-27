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
      const val = values.join("=").replace(/^["']|["']$/g, "");
      if (process.env[key.trim()] === undefined) {
        process.env[key.trim()] = val;
      }
    }
  }
}

const MONGODB_URI = process.env.MONGODB_URI || process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/hunky_dory_db";

// Schemas
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["ADMIN", "SPECIALIST", "STAFF"], default: "STAFF" }
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

async function seed() {
  console.log(`Connecting to MongoDB (${MONGODB_URI.includes("mongodb+srv") ? "Atlas" : "Local"})...`);
  try {
    await mongoose.connect(MONGODB_URI, { dbName: "hunky_dory_db", serverSelectionTimeoutMS: 5000 });
  } catch (err) {
    if (!MONGODB_URI.includes("127.0.0.1") && !MONGODB_URI.includes("localhost")) {
      console.warn("⚠️ Remote Atlas connection timed out (IP might not be whitelisted on Atlas). Falling back to local MongoDB...");
      await mongoose.connect("mongodb://127.0.0.1:27017/hunky_dory_db", { serverSelectionTimeoutMS: 3000 });
    } else {
      throw err;
    }
  }
  console.log("Connected successfully to hunky_dory_db!");

  // Ensure default Admin user
  const adminEmail = "admin@hunkydory.edu";
  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    await User.create({
      name: "Dr. Sarah Mitchell (Director)",
      email: adminEmail,
      // Default bcrypt hash for "Admin@123456"
      passwordHash: "$2a$10$9K2z/7Qvh3vE2M0Kx0bY2.n4aD8lV5L7d4J1mF6yA0x8w6P1u4z8S",
      role: "ADMIN"
    });
    console.log(`✅ Created default Admin user: ${adminEmail} (Password: Admin@123456)`);
  } else {
    console.log(`ℹ️ Admin user already exists: ${adminEmail}`);
  }

  // Ensure Specialist & Staff demo users
  const specialistEmail = "specialist@hunkydory.edu";
  const existingSpec = await User.findOne({ email: specialistEmail });
  if (!existingSpec) {
    await User.create({
      name: "Priya Sen (Specialist)",
      email: specialistEmail,
      passwordHash: "$2a$10$9K2z/7Qvh3vE2M0Kx0bY2.n4aD8lV5L7d4J1mF6yA0x8w6P1u4z8S",
      role: "SPECIALIST"
    });
    console.log(`✅ Created Specialist user: ${specialistEmail}`);
  }

  const staffEmail = "staff@hunkydory.edu";
  const existingStaff = await User.findOne({ email: staffEmail });
  if (!existingStaff) {
    await User.create({
      name: "Rohan Verma (Staff)",
      email: staffEmail,
      passwordHash: "$2a$10$9K2z/7Qvh3vE2M0Kx0bY2.n4aD8lV5L7d4J1mF6yA0x8w6P1u4z8S",
      role: "STAFF"
    });
    console.log(`✅ Created Staff user: ${staffEmail}`);
  }

  console.log("🎉 Database seeding complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
