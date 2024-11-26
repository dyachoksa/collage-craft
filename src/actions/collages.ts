"use server";

import { eq } from "drizzle-orm";

import { db } from "~/database";
import { collages } from "~/database/schema";

export const getCollages = async (userId: string) => {
  return db.select().from(collages).where(eq(collages.userId, userId));
};
