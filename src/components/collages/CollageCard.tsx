import Link from "next/link";

import AppImage from "~/components/AppImage";
import PlaceholderIcon from "~/components/PlaceholderIcon";
import { Badge } from "~/components/ui/badge";
import { capitalize } from "~/lib/strings";
import type { CollageModel } from "~/types";

interface Props {
  collage: CollageModel;
}

export default function CollageCard({ collage }: Props) {
  const hasImage = !!collage.cloudinaryId;

  return (
    <div className="w-full flex flex-col rounded-md border border-gray-200 bg-white overflow-hidden">
      <div className="relative flex-grow flex flex-col">
        <Link
          href={`/collages/${collage.id}`}
          className="w-full flex-grow flex flex-col items-center justify-center rounded-sm overflow-hidden"
        >
          {!hasImage && <PlaceholderIcon className="size-24 text-gray-300" />}

          {hasImage && (
            <AppImage
              src={collage.cloudinaryId!}
              alt={collage.name || "Untitled"}
              width={480}
              height={343}
              crop={[]}
              namedTransformations="thumb_480"
              unoptimized
            />
          )}
        </Link>

        {collage.status !== "created" && (
          <Badge className="absolute top-2 right-2" variant="secondary">
            {capitalize(collage.status)}
          </Badge>
        )}
      </div>

      <div className="p-4">
        <Link href={`/collages/${collage.id}`} className="text-base font-semibold text-gray-900 hover:text-primary-700">
          {collage.name || "Untitled"}
        </Link>
      </div>
    </div>
  );
}
