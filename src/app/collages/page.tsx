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
        <h1 className="scroll-m-20 text-4xl text-gray-900 font-extrabold tracking-tight lg:text-5xl">My collages</h1>

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

      <div>
        {collages.map((collage) => (
          <div key={collage.id}>{collage.name || "Untitled"}</div>
        ))}
      </div>
    </div>
  );
}
