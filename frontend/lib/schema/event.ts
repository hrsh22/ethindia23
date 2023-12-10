// lib/schemas/event.ts

import mongoose, { Document, Schema } from "mongoose";

export interface EventDocument extends Document {
  name: string;
  description: string;
  creator: string;
  startDate: Date;
  endDate: Date;
  location: string;
  link: string;
  capacity: number;
  attendees: {
    address: string;
    status: "approved" | "not_approved" | "pending";
  }[];
  requireApproval: boolean;
}

const eventSchema = new Schema<EventDocument>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  location: { type: String, required: false },
  link: { type: String, required: false },
  capacity: { type: Number, required: false },
  creator: { type: String, required: true },
  attendees: [
    {
      address: { type: String, ref: "User", required: true },
      status: {
        type: String,
        enum: ["approved", "not_approved", "pending"],
        default: "pending",
      },
    },
  ],
  requireApproval: { type: Boolean, default: false },
});

const Event =
  mongoose.models.Event || mongoose.model<EventDocument>("Event", eventSchema);

export default Event;
