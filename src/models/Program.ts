import mongoose, { Schema, Document, Model } from "mongoose";
import { ProgramStatus } from "@/lib/types";

export interface IProgram extends Document {
  name: string;
  slug: string;
  description: string;
  category?: string;
  image?: string;
  status: ProgramStatus;
  badge?: string;
  iconName?: string;
  features?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ProgramSchema = new Schema<IProgram>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: { type: String, trim: true },
    image: { type: String, trim: true },
    status: { type: String, enum: ["ACTIVE", "INACTIVE"], default: "ACTIVE" },
    badge: { type: String, trim: true },
    iconName: { type: String, trim: true },
    features: [{ type: String, trim: true }]
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret: any) => {
        ret.id = ret._id.toString();
        delete ret.__v;
        return ret;
      }
    }
  }
);

export const Program: Model<IProgram> =
  mongoose.models.Program || mongoose.model<IProgram>("Program", ProgramSchema);
export default Program;
