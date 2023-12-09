// pages/api/users/checkAndInsertUser.ts

import User from "@/lib/schema/user";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/connect-db";
// import { NextApiRequest, NextApiResponse } from "next"; USE THIS IF JSON ERROR IS CAUSING ISSUES

interface RequestBody {
  address: string;
}

export async function POST(request: any) {
  try {
    await connectDB();

    if (!request.body) {
      return NextResponse.json(
        { success: false, message: "Request body is missing." },
        { status: 400 }
      );
    }

    const { address }: any = await request.body.json();

    if (!address) {
      return NextResponse.json(
        { success: false, message: "Address not provided." },
        { status: 401 }
      );
    }
    // Check if a user with the provided address already exists
    const existingUser = await User.findOne({ address });

    if (existingUser) {
      return NextResponse.json({
        success: true,
        message: "User already exists in the database.",
        user: existingUser,
      });
    }

    // If the user doesn't exist, insert a new user
    const newUser = await User.create({ address });

    return NextResponse.json({
      success: true,
      message: "User inserted into the database.",
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error." },
      { status: 500 }
    );
  }
}
