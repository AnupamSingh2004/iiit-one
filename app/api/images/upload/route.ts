import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextAuth]/route";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const image = await prisma.image.create({
      data: {
        userId: session.user.id,
        fileName: file.name,
        fileType: file.type,
        data: buffer,
      },
    });

    return NextResponse.json(
      {
        message: "Image uploaded successfully",
        imageId: image.id,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Image upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
