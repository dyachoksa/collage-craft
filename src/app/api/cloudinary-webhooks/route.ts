import { NextRequest } from "next/server";

import { getCollageById, updateCollage } from "~/actions/collages";

/**
 * Cloudinary webhook handler
 *
 * @see https://cloudinary.com/documentation/image_collage_generation#asynchronous_handling
 */
export async function POST(req: NextRequest) {
  const collageId = req.nextUrl.searchParams.get("collageId");

  if (!collageId) {
    return Response.json({ error: "Missing collageId" }, { status: 400 });
  }

  const collage = await getCollageById(collageId);
  if (!collage) {
    return Response.json({ error: "Collage not found" }, { status: 404 });
  }

  const data = await req.json();

  await updateCollage(collage.id, {
    cloudinaryId: data.public_id,
    cloudinaryUrl: data.secure_url,
    cloudinaryResponse: data,
    status: "created",
  });

  return Response.json({ success: true });
}
