// pages/api/events/createEvent.ts

import Event from "@/lib/schema/event";
import connectDB from "@/lib/connect-db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectDB();

    // Extract event data from the request body
    const eventData = await request.json();

    console.log(eventData);

    // Create a new event using the Event model
    const newEvent = await Event.create(eventData);

    return NextResponse.json(
      {
        success: true,
        message: "Event created successfully.",
        newEvent,
      },
      { status: 201 }
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
