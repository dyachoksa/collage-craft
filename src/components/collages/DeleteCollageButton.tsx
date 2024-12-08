"use client";

import { useState } from "react";

import { Trash2Icon as DeleteIcon, Loader2Icon } from "lucide-react";

import { deleteCollage } from "~/actions/collages";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";

interface Props {
  collageId: string;
}

export default function DeleteCollageButton({ collageId }: Props) {
  const [isProcessing, setProcessing] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const handleDelete = async () => {
    // todo: add toast notification
    try {
      setProcessing(true);

      await deleteCollage(collageId);

      setOpen(false);
    } catch (error) {
      setProcessing(false);
      console.warn(error);
    }
  };

  return (
    <>
      <AlertDialog open={isOpen} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="icon" title="Delete collage">
            <DeleteIcon className="text-red-500" />
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete collage?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this collage? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isProcessing}>Cancel</AlertDialogCancel>
            <Button onClick={handleDelete} disabled={isProcessing}>
              {isProcessing && <Loader2Icon className="mr-2 size-4 animate-spin" />}
              Yes, delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
