export interface AddImageData {
  collageId: string;
  cloudinaryId: string;
  cloudinaryResponse: Record<string, unknown>;
}

export interface CollageModel {
  id: string;
  name: string | null;
  status: "new" | "draft" | "created";
  cloudinaryId: string | null;
  cloudinaryUrl: string | null;
  lastGeneratedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
