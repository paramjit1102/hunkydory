import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProgressReport extends Document {
  studentId: string;
  reportDate: string;
  goals: string;
  progress: string;
  strengths: string;
  areasForImprovement: string;
  recommendations: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProgressReportSchema = new Schema<IProgressReport>(
  {
    studentId: { type: String, required: true, index: true },
    reportDate: { type: String, required: true },
    goals: { type: String, required: true, trim: true },
    progress: { type: String, required: true, trim: true },
    strengths: { type: String, required: true, trim: true },
    areasForImprovement: { type: String, required: true, trim: true },
    recommendations: { type: String, required: true, trim: true }
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

export const ProgressReport: Model<IProgressReport> =
  mongoose.models.ProgressReport ||
  mongoose.model<IProgressReport>("ProgressReport", ProgressReportSchema);
export default ProgressReport;
