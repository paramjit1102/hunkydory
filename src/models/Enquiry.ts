import mongoose, { Schema, Document, Model } from "mongoose";
import { EnquiryStatus } from "@/lib/types";

export interface IEnquiry extends Document {
  parentName: string;
  childName: string;
  childAge: number;
  phone: string;
  email: string;
  program: string;
  message: string;
  status: EnquiryStatus;
  createdAt: Date;
  updatedAt: Date;
}

const EnquirySchema = new Schema<IEnquiry>(
  {
    parentName: { type: String, required: true, trim: true },
    childName: { type: String, required: true, trim: true },
    childAge: { type: Number, default: 5 },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    program: { type: String, required: true, trim: true },
    message: { type: String, default: "", trim: true },
    status: {
      type: String,
      enum: ["NEW", "IN_REVIEW", "CONTACTED", "ENROLLED", "CLOSED"],
      default: "NEW"
    }
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

export const Enquiry: Model<IEnquiry> =
  mongoose.models.Enquiry || mongoose.model<IEnquiry>("Enquiry", EnquirySchema);
export default Enquiry;
