// lib/schemas/user.ts

import mongoose, { Document, Schema } from "mongoose";

export interface UserDocument extends Document {
  address: string; // Assuming address is unique
  events: {
    eventId: mongoose.Types.ObjectId;
    status: "approved" | "not_approved" | "pending";
  }[];
}

const userSchema = new Schema<UserDocument>({
  address: { type: String, required: true, unique: true },
  events: [
    {
      eventId: { type: Schema.Types.ObjectId, ref: "Event" },
      status: {
        type: String,
        enum: ["approved", "not_approved", "pending"],
        default: "pending",
      },
    },
  ],
});

const User =
  mongoose.models.User || mongoose.model<UserDocument>("User", userSchema);

export default User;
