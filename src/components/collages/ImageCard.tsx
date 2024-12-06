"use client";

import { useState } from "react";

import { Loader2Icon, Trash2Icon } from "lucide-react";

import { deleteImage } from "~/actions/collages";
import AppImage from "~/components/AppImage";
import { Button } from "~/components/ui/button";

interface Props {
  image: {
    id: string;
    collageId: string;
    cloudinaryId: string;
  };
}

export default function ImageCard({ image }: Props) {
  const [isProcessing, setProcessing] = useState(false);

  const handleDelete = async () => {
    try {
      if (!confirm("Are you sure you want to delete this image?")) {
        return;
      }

      setProcessing(true);
      await deleteImage(image.id, image.collageId);

      // show notification
      // message: "Image deleted successfully. You may consider regenerating the collage to update it."
      // type: "success"
    } catch (error) {
      // todo: add toast notification
      console.warn(error);
      setProcessing(false);
    }
  };

  return (
    <div key={image.id} className="relative rounded-md overflow-hidden hover:scale-105 transition-transform">
      <Button
        className="absolute bottom-1 right-1 z-10"
        variant={isProcessing ? "outline" : "ghost"}
        size="icon"
        title="Delete image"
        onClick={handleDelete}
        disabled={isProcessing}
      >
        {!isProcessing && <Trash2Icon className="text-red-500" />}
        {isProcessing && <Loader2Icon className="h-5 w-5 animate-spin" />}
      </Button>

      <AppImage
        src={image.cloudinaryId}
        width={256}
        height={256}
        crop={[]}
        namedTransformations="thumb_256"
        transformations={[]}
        preserveTransformations={false}
        alt="Collage image"
        unoptimized
      />
    </div>
  );
}
