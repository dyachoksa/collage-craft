"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { and, desc, eq } from "drizzle-orm";
import { ulid } from "ulid";

import { db } from "~/database";
import { collages, images, SelectCollage } from "~/database/schema";
import { requireUserId } from "~/hooks";
import { makeSequence, shuffleArray } from "~/lib/arrays";
import cloudinary from "~/lib/cloudinary";
import { buildTemplate } from "~/lib/collages/binarySplit";
import type { CollageData } from "~/schemas/collages";
import type { AddImageData } from "~/types";

const appEnv = process.env.NEXT_PUBLIC_APP_ENV!;

const getCloudinaryFolder = () => {
  const baseFolder = process.env.NODE_ENV === "production" ? "collages" : `collages-${appEnv}`;
  return [baseFolder, new Date().getFullYear().toString()].join("/");
};

export const getCollages = async ({
  userId,
  page = 1,
  pageSize = 12,
}: {
  page?: number;
  pageSize?: number;
  userId?: string;
}): Promise<{
  items: Omit<SelectCollage, "userId" | "cloudinaryResponse">[];
  total: number;
  totalPages: number;
  page: number;
  pageSize: number;
}> => {
  if (!userId) {
    userId = await requireUserId();
  }

  const itemsPromise = db.query.collages.findMany({
    columns: {
      userId: false,
      cloudinaryResponse: false,
    },
    where: eq(collages.userId, userId),
    orderBy: desc(collages.createdAt),
    limit: pageSize,
    offset: (page - 1) * pageSize,
  });
  const totalPromise = db.$count(collages, eq(collages.userId, userId));

  const [items, total] = await Promise.all([itemsPromise, totalPromise]);

  const totalPages = Math.ceil(total / pageSize);

  return { items, total, totalPages, page, pageSize };
};

export const getCollageById = async (id: string) => {
  return db.query.collages.findFirst({
    where: eq(collages.id, id),
  });
};

export const getCollageDetails = async (id: string, userId?: string) => {
  if (!userId) {
    userId = await requireUserId();
  }

  return db.query.collages.findFirst({
    where: and(eq(collages.userId, userId), eq(collages.id, id)),
    with: {
      images: {
        columns: {
          userId: false,
          cloudinaryResponse: false,
        },
      },
    },
  });
};

export const createCollage = async (data: CollageData) => {
  const userId = await requireUserId();

  // note: here should be server-side validation using zod 'collageSchema' schema
  const collage = await db
    .insert(collages)
    .values({ userId, ...data })
    .returning()
    .then((res) => res[0]);

  redirect(`/collages/${collage.id}`);
};

export const updateCollageName = async (id: string, name: string | null, userId?: string) => {
  if (!userId) {
    userId = await requireUserId();
  }

  const updatedCollage = await db
    .update(collages)
    .set({ name })
    .where(and(eq(collages.userId, userId), eq(collages.id, id)))
    .returning()
    .then((res) => res[0]);

  revalidatePath(`/collages/${updatedCollage.id}`);

  return updatedCollage;
};

export const updateCollage = async (id: SelectCollage["id"], data: Partial<Omit<SelectCollage, "id" | "userId">>) => {
  return db
    .update(collages)
    .set(data)
    .where(eq(collages.id, id))
    .returning()
    .then((res) => res[0]);
};

export const addImage = async (data: AddImageData, userId?: string) => {
  if (!userId) {
    userId = await requireUserId();
  }

  const { cloudinaryResponse: _, ...image } = await db
    .insert(images)
    .values({ userId, ...data })
    .returning()
    .then((res) => res[0]);

  revalidatePath(`/collages/${image.collageId}`);

  return image;
};

export const generateCollage = async (collageId: string, userId?: string) => {
  if (!userId) {
    userId = await requireUserId();
  }

  const collage = await getCollageDetails(collageId, userId);

  if (!collage) {
    throw new Error("Collage not found");
  }

  const cloudinaryId = collage.cloudinaryId || `${getCloudinaryFolder()}/${ulid().toLowerCase()}`;
  const images = shuffleArray(collage.images);

  // todo: add randomization
  const template = buildTemplate(makeSequence(images.length), false);

  const manifest = {
    template,
    // 13x18 (5x7) in landscape
    width: 2100,
    height: 1500,
    columns: template[0].length,
    rows: template.length,
    spacing: 16, // 16px
    color: "white",
    assetDefaults: { kind: "upload", crop: "fill", gravity: "auto" },
    assets: images.map((image) => ({ media: image.cloudinaryId })),
  };

  const timestamp = Math.round(new Date().getTime() / 1000);

  const params = {
    timestamp,
    public_id: cloudinaryId,
    manifest_json: JSON.stringify(manifest),
    upload_preset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!,
    overwrite: true,
    notification_url: process.env.CLOUDINARY_NOTIFICATION_URL! + `?collageId=${collageId}`,
  };

  const config = cloudinary.config();
  const apiUrl = cloudinary.utils.api_url("create_collage");
  const signature = cloudinary.utils.api_sign_request(params, config.api_secret!);

  const data = new FormData();
  data.append("timestamp", timestamp.toString());
  data.append("resource_type", "image");
  data.append("public_id", params.public_id);
  data.append("manifest_json", params.manifest_json);
  data.append("upload_preset", params.upload_preset);
  data.append("overwrite", params.overwrite.toString());
  data.append("notification_url", params.notification_url);
  data.append("api_key", config.api_key!);
  data.append("signature", signature);

  const res = await fetch(apiUrl, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${config.api_key}:${config.api_secret}`).toString("base64")}`,
    },
    body: data,
  });

  const cloudinaryResponse = await res.json();

  if (!res.ok) {
    throw new Error("Failed to generate collage");
  }

  await db
    .update(collages)
    .set({ cloudinaryId, lastGeneratedAt: new Date(), status: "draft" })
    .where(eq(collages.id, collageId));

  revalidatePath(`/collages/${collageId}`);

  return cloudinaryResponse;
};
