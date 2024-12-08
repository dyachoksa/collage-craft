import { notFound } from "next/navigation";

import { clerkClient } from "@clerk/nextjs/server";

import { getPublicCollage } from "~/actions/collages";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ViewCollage({ params }: Props) {
  const { slug } = await params;

  const collage = await getPublicCollage(slug);
  if (!collage || !collage.cloudinaryUrl) {
    return notFound();
  }

  const client = await clerkClient();
  const user = await client.users.getUser(collage.userId);
  if (!user) {
    return notFound();
  }

  return (
    <div className="py-16 section-wrapper">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-end gap-4">
          <h1 className="h1">{collage.name || "Untitled"}</h1>

          <p className="text-primary-500 text-xl font-medium">by {user.fullName || user.username}</p>
        </div>

        <a
          href={collage.cloudinaryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full h-auto border border-primary-200"
        >
          <img src={collage.cloudinaryUrl} alt={collage.name || "Collage"} loading="lazy" className="w-full h-auto" />
        </a>
      </div>
    </div>
  );
}
