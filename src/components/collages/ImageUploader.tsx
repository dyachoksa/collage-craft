"use client";

import { CldUploadButton, CloudinaryUploadWidgetResults } from "next-cloudinary";

import { formatDate } from "date-fns";
import { ImagePlus as PlusIcon } from "lucide-react";

import { addImage } from "~/actions/collages";

const defaultUploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

const appEnv = process.env.NEXT_PUBLIC_APP_ENV!;

const getFolder = () => {
  const baseFolder = process.env.NODE_ENV === "production" ? "collages" : `collages-${appEnv}`;
  const today = new Date();

  return [baseFolder, formatDate(today, "yyyy/MM")].join("/");
};

interface Props {
  collageId: string;
}

/**
 * @see https://cloudinary.com/documentation/upload_widget
 * @see https://cloudinary.com/documentation/image_upload_api_reference#upload_response
 */
export default function ImageUploader({ collageId }: Props) {
  const onSuccessUpload = async (result: CloudinaryUploadWidgetResults) => {
    if (result.event !== "success") return;
    if (typeof result.info !== "object") return;

    const cloudinaryId = result.info.public_id;

    try {
      await addImage({
        collageId,
        cloudinaryId,
        cloudinaryResponse: result.info,
      });
    } catch (error) {
      // todo: add toast notification
      console.warn(error);
    }
  };

  return (
    <CldUploadButton
      className="min-h-32 rounded-md border border-dashed border-primary-500 flex flex-col items-center justify-center gap-4 hover:bg-slate-50"
      signatureEndpoint="/api/sign-cloudinary-params"
      uploadPreset={defaultUploadPreset}
      options={{
        sources: ["local", "instagram", "unsplash"],
        showUploadMoreButton: false,
        singleUploadAutoClose: true,
        multiple: false,
        maxFiles: 5,
        maxFileSize: 5500000, // 5.5MB
        clientAllowedFormats: ["image"],
        folder: getFolder(),
        context: { collageId },
        tags: ["collage-craft", "source", appEnv],
      }}
      onSuccess={onSuccessUpload}
    >
      <PlusIcon className="w-6 h-6 text-primary-500" />
      <span className="text-sm text-primary-500 text-center">Add image</span>
    </CldUploadButton>
  );
}
