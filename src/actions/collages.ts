"use server";

import { eq } from "drizzle-orm";

import { db } from "~/database";
import { collages } from "~/database/schema";
import { requireUserId } from "~/hooks";
import type { CollageData } from "~/schemas/collages";

export const getCollages = async (userId: string) => {
  return db.select().from(collages).where(eq(collages.userId, userId));
};

export const createCollage = async (data: CollageData) => {
  const userId = await requireUserId();

  // note: here should be server-side validation using zod 'collageSchema' schema
  return db
    .insert(collages)
    .values({ userId, ...data })
    .returning()
    .then((res) => res[0]);
};
