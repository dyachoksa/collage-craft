"use client";

import { useForm } from "react-hook-form";
import { useToggle } from "react-use";

import { zodResolver } from "@hookform/resolvers/zod";
import { PencilLine as EditIcon, Loader2Icon } from "lucide-react";

import { updateCollageName } from "~/actions/collages";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useToast } from "~/hooks/use-toast";
import { collageSchema, type CollageData } from "~/schemas/collages";
import type { CollageModel } from "~/types";

interface Props {
  collage: CollageModel;
}

export default function EditableCollageName({ collage }: Props) {
  const [editMode, toggleEditMode] = useToggle(false);

  const { toast } = useToast();

  const form = useForm<CollageData>({
    resolver: zodResolver(collageSchema),
    defaultValues: {
      name: collage.name || "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await updateCollageName(collage.id, data.name || null);

      toggleEditMode(false);
      toast({
        title: "Success",
        description: "Collage name updated successfully",
      });
    } catch (error) {
      console.warn(error);
      toast({
        title: "Something went wrong",
        description: "Failed to update collage name",
        variant: "destructive",
      });
    }
  });

  return (
    <div className="h-12 flex items-center gap-2">
      {!editMode && (
        <>
          <h1 className="h1">{collage.name || "Untitled"}</h1>

          <Button className="mt-1" variant="ghost" size="icon" title="Update collage name" onClick={toggleEditMode}>
            <EditIcon className="size-4" />
          </Button>
        </>
      )}

      {editMode && (
        <>
          <form onSubmit={onSubmit} id="edit-collage-name-form">
            <Input
              className="w-96"
              placeholder="Untitled"
              {...form.register("name")}
              disabled={form.formState.isSubmitting}
            />
          </form>
          <Button form="edit-collage-name-form" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && <Loader2Icon className="h-5 w-5 mr-1 animate-spin" />}
            Save
          </Button>
          <Button variant="ghost" onClick={toggleEditMode} disabled={form.formState.isSubmitting}>
            Cancel
          </Button>
        </>
      )}
    </div>
  );
}
