"use client";

import { CldImage, type CldImageProps } from "next-cloudinary";

export default function AppImage(props: CldImageProps) {
  return <CldImage {...props} />;
}
