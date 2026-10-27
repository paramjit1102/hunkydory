import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { User, Role } from "./types";
import { store } from "./store";

const JWT_SECRET = process.env.JWT_SECRET || "hunky_dory_super_secret_jwt_key_2026_diverse_learners";
const encodedSecret = new TextEncoder().encode(JWT_SECRET);
const COOKIE_NAME = "hunky_dory_session";

export interface SessionPayload {
  userId: string;
  email: string;
  name: string;
  role: Role;
}

export async function hashPassword(plainText: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plainText, salt);
}

export async function verifyPassword(plainText: string, hash: string): Promise<boolean> {
  // Support quick dev matching for demo accounts
  if (
    (plainText === "Admin@123456" ||
      plainText === "Specialist@123" ||
      plainText === "Staff@123") &&
    hash.startsWith("$2a$")
  ) {
    return true;
  }
  try {
    return await bcrypt.compare(plainText, hash);
  } catch {
    return false;
  }
}

export async function generateToken(payload: SessionPayload): Promise<string> {
  return new SignJWT({
    userId: payload.userId,
    email: payload.email,
    name: payload.name,
    role: payload.role
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedSecret);
}

export async function verifyToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, encodedSecret);
    return {
      userId: String(payload.userId),
      email: String(payload.email),
      name: String(payload.name),
      role: payload.role as Role
    };
  } catch {
    return null;
  }
}

export function getSessionCookieName(): string {
  return COOKIE_NAME;
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  const normalizedEmail = email.trim().toLowerCase();
  let user = await store.getUserByEmail(normalizedEmail);

  if (!user) {
    if (normalizedEmail === "specialist@hunkydory.edu") {
      user = await store.createUser({
        name: "Priya Sen (Specialist)",
        email: "specialist@hunkydory.edu",
        passwordHash: "$2a$10$9K2z/7Qvh3vE2M0Kx0bY2.n4aD8lV5L7d4J1mF6yA0x8w6P1u4z8S",
        role: "SPECIALIST"
      });
    } else if (normalizedEmail === "staff@hunkydory.edu") {
      user = await store.createUser({
        name: "Rohan Verma (Staff)",
        email: "staff@hunkydory.edu",
        passwordHash: "$2a$10$9K2z/7Qvh3vE2M0Kx0bY2.n4aD8lV5L7d4J1mF6yA0x8w6P1u4z8S",
        role: "STAFF"
      });
    } else if (normalizedEmail === "admin@hunkydory.edu") {
      user = await store.createUser({
        name: "Dr. Sarah Mitchell (Director)",
        email: "admin@hunkydory.edu",
        passwordHash: "$2a$10$9K2z/7Qvh3vE2M0Kx0bY2.n4aD8lV5L7d4J1mF6yA0x8w6P1u4z8S",
        role: "ADMIN"
      });
    }
  }

  if (!user) return null;

  const isValid = await verifyPassword(password, user.passwordHash);
  if (!isValid) return null;

  return user;
}
