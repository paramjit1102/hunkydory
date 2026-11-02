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
  const user = await store.getUserByEmail(normalizedEmail);

  if (!user) return null;

  const isValid = await verifyPassword(password, user.passwordHash);
  if (!isValid) return null;

  return user;
}
