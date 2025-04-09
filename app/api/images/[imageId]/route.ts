// app/api/images/[imageId]/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { imageId: string } },
) {
  try {
    const imageId = params.imageId;

    const image = await prisma.image.findUnique({
      where: { id: imageId },
    });

    if (!image) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    // Convert Bytes back to Buffer if needed
    const buffer = Buffer.from(image.data);

    // Create appropriate response with correct content type
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": image.fileType,
        "Content-Disposition": `inline; filename="${image.fileName}"`,
        "Cache-Control": "public, max-age=31536000", // Cache for a year
      },
    });
  } catch (error) {
    console.error("Image retrieval error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve image" },
      { status: 500 },
    );
  }
}
