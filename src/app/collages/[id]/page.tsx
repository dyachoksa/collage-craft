import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowLeftIcon, TriangleAlertIcon } from "lucide-react";

import { getCollageDetails } from "~/actions/collages";
import {
  DeleteCollageButton,
  EditableCollageName,
  GenerateCollageButton,
  ImageCard,
  ImageUploader,
  ProcessingIndicator,
} from "~/components/collages";
import PlaceholderIcon from "~/components/PlaceholderIcon";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { MAX_IMAGES_PER_COLLAGE } from "~/consts";
import { requireUserId } from "~/hooks";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function CollageDetails({ params }: Props) {
  const id = (await params).id;
  const userId = await requireUserId();

  const collage = await getCollageDetails(id, userId);

  if (!collage) {
    return notFound();
  }

  const canGenerate = collage.images.length >= 2;
  const canAddImages = collage.images.length < MAX_IMAGES_PER_COLLAGE;

  return (
    <div className="pt-16 section-wrapper">
      <div className="flex items-center gap-4">
        <Link href="/collages" className="block text-gray-700 hover:text-primary-700">
          <ArrowLeftIcon className="size-8 md:size-10" />
        </Link>

        <EditableCollageName collage={collage} />

        <div className="ml-auto">
          <DeleteCollageButton collageId={collage.id} />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-5 gap-4">
        <div className="col-span-2 pr-4 py-4 border-r border-gray-200">
          <div className="grid grid-cols-3 gap-4">
            {collage.images.map((image) => (
              <ImageCard key={image.id} image={image} />
            ))}

            {canAddImages && <ImageUploader collageId={collage.id} />}
          </div>

          {!canAddImages && (
            <div className="mt-8">
              <Alert>
                <TriangleAlertIcon className="size-4" />
                <AlertTitle className="pt-0.5">Limit reached</AlertTitle>
                <AlertDescription className="text-gray-500">
                  You have reached the maximum number of images per collage.
                </AlertDescription>
              </Alert>
            </div>
          )}
        </div>

        <div className="col-span-3 my-4">
          {!collage.cloudinaryId && (
            <div className="relative min-h-60 h-full p-8 flex items-center justify-center gap-4">
              <PlaceholderIcon className="block text-gray-200 fixed h-72" />
              {canGenerate && <GenerateCollageButton collageId={collage.id} />}
            </div>
          )}

          {collage.status === "draft" && <ProcessingIndicator />}

          <div>
            {collage.cloudinaryUrl && collage.status === "created" && (
              <a
                href={collage.cloudinaryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-auto border border-gray-200"
              >
                <img
                  src={collage.cloudinaryUrl}
                  alt={collage.name || "Collage"}
                  loading="lazy"
                  className="w-full h-auto"
                />
              </a>
            )}

            <div className="mt-4 flex flex-row items-center gap-4">
              <div>
                {canGenerate && collage.cloudinaryUrl && collage.status === "created" && (
                  <GenerateCollageButton collageId={collage.id} label="Re-generate" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
