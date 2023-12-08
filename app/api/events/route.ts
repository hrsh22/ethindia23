// route.ts
import Event, { EventDocument } from "@/lib/schema/event";
import connectDB from "@/lib/connect-db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Extract query parameters
    const eventId = request.nextUrl.searchParams.get("eventId");
    const creator = request.nextUrl.searchParams.get("creator");
    const sortField = request.nextUrl.searchParams.get("sortField");
    const sortOrder = request.nextUrl.searchParams.get("sortOrder");

    // Define the filter object based on the creator
    const filter: any = {};
    if (creator) {
      filter.creator = creator;
    }

    if (eventId) {
      filter._id = eventId;
    }

    // Define the sort options based on the sort parameters
    const sortOptions: any = {};
    if (sortField && sortOrder) {
      sortOptions[sortField] = sortOrder === "asc" ? 1 : -1; // 1 for ascending, -1 for descending
    }

    // Use Mongoose to get filtered and optionally sorted events
    const response = await Event.find(filter).sort(sortOptions).exec();

    if (response.length === 0) {
      return NextResponse.json(
        { success: false, message: "Event not found." },
        { status: 201 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Events retrieved successfully.",
        response,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error." },
      { status: 500 }
    );
  }
}
