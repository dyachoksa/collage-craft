import Link from "next/link";

import { getCollages } from "~/actions/collages";
import { NewCollage } from "~/components/collages";
import { requireUserId } from "~/hooks";

export default async function Collages() {
  const userId = await requireUserId();

  const collages = await getCollages(userId);

  const hasCollages = collages.length > 0;

  return (
    <div className="pt-16 section-wrapper">
      <div className="flex justify-between items-center">
        <h1 className="h1">My collages</h1>

        <div>
          <NewCollage />
        </div>
      </div>

      {!hasCollages && (
        <div className="mt-8 flex flex-col items-center justify-center min-h-60">
          <p className="text-gray-500">You haven&apos;t created any collages yet.</p>
          <div className="mt-2">
            <NewCollage />
          </div>
        </div>
      )}

      <div className="mt-8">
        {collages.map((collage) => (
          <div key={collage.id}>
            <Link
              href={`/collages/${collage.id}`}
              className="text-lg font-medium text-gray-800 hover:text-primary-700 hover:underline"
            >
              {collage.name || "Untitled"}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
