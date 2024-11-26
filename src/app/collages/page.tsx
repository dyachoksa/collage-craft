import { getCollages } from "~/actions/collages";
import { requireUserId } from "~/hooks";

export default async function Collages() {
  const userId = await requireUserId();

  const collages = await getCollages(userId);

  return (
    <div className="pt-16 section-wrapper">
      <h1 className="scroll-m-20 text-4xl text-gray-900 font-extrabold tracking-tight lg:text-5xl">My collages</h1>

      <div>
        {collages.map((collage) => (
          <div key={collage.id}>{collage.name || "Untitled"}</div>
        ))}
      </div>
    </div>
  );
}
