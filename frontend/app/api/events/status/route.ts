// route.ts
import Event, { EventDocument } from "@/lib/schema/event";
import User, { UserDocument } from "@/lib/schema/user";
import connectDB from "@/lib/connect-db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    await connectDB();

    // Extract parameters from the request body
    const eventId = request.nextUrl.searchParams.get("eventId");
    const address = request.nextUrl.searchParams.get("address");
    const newStatus = request.nextUrl.searchParams.get("newStatus");

    // Validate that required parameters are provided
    if (!eventId || !address || !newStatus) {
      return NextResponse.json(
        { success: false, message: "Missing required parameters." },
        { status: 400 }
      );
    }

    // Find the event by eventId
    const event: EventDocument | null = await Event.findById(eventId);

    if (!event) {
      return NextResponse.json(
        { success: false, message: "Event not found." },
        { status: 404 }
      );
    }

    // // Find the user by address
    // const user: UserDocument | null = await User.findOne({ address });

    // if (!user) {
    //   return NextResponse.json(
    //     { success: false, message: "User not found." },
    //     { status: 404 }
    //   );
    // }

    // Update the status in the event's attendees array
    const attendeeIndex = event.attendees.findIndex(
      (attendee) => attendee.address === address
    );

    if (attendeeIndex !== -1) {
      event.attendees[attendeeIndex].status = newStatus as
        | "approved"
        | "not_approved"
        | "pending";
    } else {
      return NextResponse.json(
        { success: false, message: "Attendee not found in the event." },
        { status: 404 }
      );
    }

    // Update the status in the user's events array
    // const eventIndex = user.events.findIndex(
    //   (userEvent) => userEvent.eventId.toString() === eventId
    // );

    // if (eventIndex !== -1) {
    //   user.events[eventIndex].status = newStatus as
    //     | "approved"
    //     | "not_approved"
    //     | "pending";
    // } else {
    //   return NextResponse.json(
    //     { success: false, message: "Event not found in the user's events." },
    //     { status: 404 }
    //   );
    // }

    // Save the changes to both the event and user
    await event.save();
    // await user.save();

    return NextResponse.json(
      { success: true, message: "Attendee status updated successfully." },
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
