// app/api/validate-key/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { key } = await request.json();

    const correctKey = process.env.APP_KEY;

    if (!correctKey) {
      return NextResponse.json(
        { success: false, message: "Configuration error" },
        { status: 500 }
      );
    }

    const isValid = key === correctKey;

    if (isValid) {
      const response = NextResponse.json(
        { success: true, message: "Key valid" },
        { status: 200 }
      );

      response.cookies.set("anniversary-session", "valid", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24,
      });

      return response;
    } else {
      return NextResponse.json(
        { success: false, message: "Invalid key" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Validation error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
