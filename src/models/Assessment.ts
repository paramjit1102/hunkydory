import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAssessment extends Document {
  studentId: string;
  assessmentDate: string;
  academicNotes?: string;
  communicationNotes?: string;
  behaviourNotes?: string;
  sensoryNotes?: string;
  socialNotes?: string;
  dailyLivingNotes?: string;
  recommendations?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AssessmentSchema = new Schema<IAssessment>(
  {
    studentId: { type: String, required: true, index: true },
    assessmentDate: { type: String, required: true },
    academicNotes: { type: String, trim: true },
    communicationNotes: { type: String, trim: true },
    behaviourNotes: { type: String, trim: true },
    sensoryNotes: { type: String, trim: true },
    socialNotes: { type: String, trim: true },
    dailyLivingNotes: { type: String, trim: true },
    recommendations: { type: String, trim: true }
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

export const Assessment: Model<IAssessment> =
  mongoose.models.Assessment ||
  mongoose.model<IAssessment>("Assessment", AssessmentSchema);
export default Assessment;
