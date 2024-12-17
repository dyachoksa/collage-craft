import { TriangleAlertIcon } from "lucide-react";

import { getCollages } from "~/actions/collages";
import { CollageCard, NewCollage } from "~/components/collages";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import { MAX_COLLAGES_PER_USER } from "~/consts";
import { requireUserId } from "~/hooks";
import { makeSequence } from "~/lib/arrays";

const pageSize = 12;

export default async function Collages({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page: pageStr = "1" } = await searchParams;
  const page = Number(pageStr);

  const userId = await requireUserId();

  const { items: collages, total, totalPages } = await getCollages({ userId, pageSize, page });

  const hasCollages = collages.length > 0;
  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;
  const reachedCollagesLimit = total >= MAX_COLLAGES_PER_USER;

  return (
    <div className="py-16 section-wrapper">
      <div className="flex justify-between items-center">
        <h1 className="h1">My collages</h1>

        {!reachedCollagesLimit && (
          <div>
            <NewCollage />
          </div>
        )}
      </div>

      {reachedCollagesLimit && (
        <Alert className="mt-8">
          <TriangleAlertIcon className="size-4" />
          <AlertTitle className="pt-0.5">Limit reached</AlertTitle>
          <AlertDescription className="text-gray-500">
            You have reached the maximum number of collages.
          </AlertDescription>
        </Alert>
      )}

      {!hasCollages && (
        <div className="mt-8 flex flex-col items-center justify-center min-h-60">
          <p className="text-gray-500">You haven&apos;t created any collages yet.</p>
          <div className="mt-2">
            <NewCollage />
          </div>
        </div>
      )}

      {hasCollages && (
        <>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {collages.map((collage) => (
              <CollageCard key={collage.id} collage={collage} />
            ))}
          </div>

          {total > pageSize && (
            <Pagination className="mt-8">
              <PaginationContent>
                {hasPreviousPage && (
                  <PaginationItem>
                    <PaginationPrevious href={`?page=${page - 1}`} />
                  </PaginationItem>
                )}

                {makeSequence(totalPages).map((item) => (
                  <PaginationItem key={item}>
                    <PaginationLink href={`?page=${item}`} isActive={item === page}>
                      {item}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                {hasNextPage && (
                  <PaginationItem>
                    <PaginationNext href={`?page=${page + 1}`} />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}
    </div>
  );
}
