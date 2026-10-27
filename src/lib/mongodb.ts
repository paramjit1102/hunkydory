import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || process.env.DATABASE_URL;

if (!MONGODB_URI) {
  console.warn("⚠️ MONGODB_URI or DATABASE_URL is not set in environment variables.");
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export async function connectToDatabase(): Promise<typeof mongoose> {
  const uri = process.env.MONGODB_URI || process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/hunky_dory_db";

  if (cached.conn && cached.conn.connection.readyState === 1) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
      dbName: "hunky_dory_db",
      serverSelectionTimeoutMS: 5000
    };

    cached.promise = mongoose
      .connect(uri, opts)
      .then((mongooseInstance) => {
        console.log("✅ Successfully connected to MongoDB database [hunky_dory_db]");
        return mongooseInstance;
      })
      .catch(async (primaryErr) => {
        // In local development, if remote Atlas fails (e.g. IP whitelist), attempt local fallback
        if (process.env.NODE_ENV !== "production" && !uri.includes("127.0.0.1") && !uri.includes("localhost")) {
          console.warn("⚠️ Remote MongoDB connection failed (possible Atlas IP whitelist issue). Attempting local MongoDB connection...");
          try {
            const localInstance = await mongoose.connect("mongodb://127.0.0.1:27017/hunky_dory_db", {
              bufferCommands: false,
              serverSelectionTimeoutMS: 3000
            });
            console.log("✅ Connected to local MongoDB fallback [mongodb://127.0.0.1:27017/hunky_dory_db]");
            return localInstance;
          } catch {
            throw primaryErr;
          }
        }
        throw primaryErr;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectToDatabase;
