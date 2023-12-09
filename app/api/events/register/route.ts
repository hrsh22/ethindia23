// pages/api/events/registerEvent.ts

import Event from "@/lib/schema/event";
import connectDB from "@/lib/connect-db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectDB();

    // Extract event data from the request body
    const eventData = await request.json();

    // Assuming the user address is sent in the request body
    const userAddress = eventData.userAddress;

    // Extract event ID from the request query
    const eventId = eventData.eventId;

    // Find the event by ID
    const event = await Event.findById(eventId);

    if (!event) {
      return NextResponse.json(
        {
          success: false,
          message: "Event not found.",
        },
        { status: 404 }
      );
    }

    const isUserRegistered = event.attendees.some(
      (attendee) => attendee.address === userAddress
    );

    // Check if the event requires approval
    if (!isUserRegistered) {
      if (event.requireApproval) {
        // Add the user to attendees with pending status
        event.attendees.push({ address: userAddress, status: "pending" });
      } else {
        // Add the user to attendees with approved status
        event.attendees.push({ address: userAddress, status: "approved" });
      }
    }
    // Save the updated event
    await event.save();

    return NextResponse.json(
      {
        success: true,
        message: "User registered for the event.",
        event,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error.",
        error: error.message,
      },
      { status: 501 }
    );
  }
}
