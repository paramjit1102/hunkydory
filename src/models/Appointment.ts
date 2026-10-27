import mongoose, { Schema, Document, Model } from "mongoose";
import { AppointmentStatus } from "@/lib/types";

export interface IAppointment extends Document {
  parentName: string;
  childName: string;
  phone: string;
  email: string;
  appointmentDate: string;
  appointmentTime: string;
  program: string;
  notes?: string;
  status: AppointmentStatus;
  createdAt: Date;
  updatedAt: Date;
}

const AppointmentSchema = new Schema<IAppointment>(
  {
    parentName: { type: String, required: true, trim: true },
    childName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    appointmentDate: { type: String, required: true, trim: true },
    appointmentTime: { type: String, required: true, trim: true },
    program: { type: String, required: true, trim: true },
    notes: { type: String, trim: true },
    status: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"],
      default: "PENDING"
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

export const Appointment: Model<IAppointment> =
  mongoose.models.Appointment ||
  mongoose.model<IAppointment>("Appointment", AppointmentSchema);
export default Appointment;
