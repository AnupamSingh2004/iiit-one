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

    const buffer = Buffer.from(image.data);

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": image.fileType,
        "Content-Disposition": `inline; filename="${image.fileName}"`,
        "Cache-Control": "public, max-age=31536000",
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
