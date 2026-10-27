import mongoose, { Schema, Document, Model } from "mongoose";

export interface IStudent extends Document {
  studentName: string;
  dateOfBirth?: string;
  age: number;
  gender: string;
  parentName: string;
  phone: string;
  email: string;
  address?: string;
  learningNeeds: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const StudentSchema = new Schema<IStudent>(
  {
    studentName: { type: String, required: true, trim: true },
    dateOfBirth: { type: String, trim: true },
    age: { type: Number, required: true, default: 5 },
    gender: { type: String, default: "Not Specified", trim: true },
    parentName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    address: { type: String, trim: true },
    learningNeeds: { type: String, required: true, trim: true },
    notes: { type: String, trim: true }
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

export const Student: Model<IStudent> =
  mongoose.models.Student || mongoose.model<IStudent>("Student", StudentSchema);
export default Student;
