import { z } from "zod";

export const collageSchema = z.object({
  name: z.string().optional().nullable(),
});

export type CollageData = z.infer<typeof collageSchema>;
