import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismaclient";

export async function POST(request: NextRequest) {
  try {
    const { identifier } = await request.json();

    const validator = await prisma.verificationToken.findFirst({
      where: {
        identifier,
      },
    });

    if (!validator) {
      return NextResponse.json(
        {
          message: "Invalid Verification Link",
          status: 400,
        },
        { status: 400 },
      );
    }

    const user = await prisma.user.update({
      where: {
        id: validator.userID || "",
      },
      data: {
        emailVerified: true,
      },
    });

    const del = await prisma.verificationToken.delete({
      where: {
        id: validator.id,
      },
    });

    return NextResponse.json(
      {
        message: "Email is Verified",
        status: 200,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Can't verify Email",
        status: 500,
      },
      { status: 500 },
    );
  }
}
