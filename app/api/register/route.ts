import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

function extractRollDetails(email: string) {
  const regex = /^(\d{2})(b[a-z]{2})(\d+)@iiitdmj\.ac\.in$/;
  const match = email.match(regex);

  if (!match) return null;

  const [_, batch, branchCode, rollNumber] = match;

  return {
    batch,
    branch: branchCode,
    rollNumber,
  };
}

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!email.endsWith("@iiitdmj.ac.in")) {
      return NextResponse.json(
        { message: "Only IIITDMJ email addresses are allowed." },
        { status: 400 },
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists." },
        { status: 400 },
      );
    }

    const rollDetails = extractRollDetails(email);

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        ...(rollDetails
          ? {
            rollNumber: rollDetails.rollNumber,
            batch: rollDetails.batch,
            branch: rollDetails.branch,
          }
          : {}),
      },
    });

    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      { message: "User registered successfully", user: userWithoutPassword },
      { status: 201 },
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "An error occurred during registration." },
      { status: 500 },
    );
  }
}
