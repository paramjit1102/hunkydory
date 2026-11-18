import mongoose, { Schema, Document, Model } from "mongoose";
import { FullSEOData } from "@/lib/seo-types";

export interface ISEOConfig extends Document {
  key: string;
  data: FullSEOData;
  updatedAt: Date;
}

const SEOConfigSchema = new Schema<ISEOConfig>(
  {
    key: { type: String, required: true, unique: true, default: "global_seo" },
    data: { type: Schema.Types.Mixed, required: true }
  },
  {
    timestamps: true
  }
);

export const SEOConfigModel: Model<ISEOConfig> =
  mongoose.models.SEOConfig || mongoose.model<ISEOConfig>("SEOConfig", SEOConfigSchema);

export default SEOConfigModel;
