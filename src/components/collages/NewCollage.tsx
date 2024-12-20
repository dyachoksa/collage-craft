"use client";

import { useForm } from "react-hook-form";
import { useToggle } from "react-use";

import { zodResolver } from "@hookform/resolvers/zod";
import { Grid2x2Plus as AddIcon, Loader2Icon as LoaderIcon } from "lucide-react";

import { createCollage } from "~/actions/collages";
import { FormInput } from "~/components/forms";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Form } from "~/components/ui/form";
import { useToast } from "~/hooks/use-toast";
import { collageSchema, type CollageData } from "~/schemas/collages";

export default function NewCollage() {
  const [open, toggleOpen] = useToggle(false);

  const { toast } = useToast();

  const form = useForm<CollageData>({
    resolver: zodResolver(collageSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    data.name = data.name?.trim() || null;

    await createCollage(data);

    toast({
      title: "Well done!",
      description: "Collage has been started successfully. Now you can add images to it.",
    });
  });

  const isSubmitting = form.formState.isSubmitting;

  return (
    <>
      <Button variant="default" onClick={toggleOpen}>
        <AddIcon className="h-6 w-6" />
        <span className="ml-2">New collage</span>
      </Button>

      <Dialog
        open={open}
        onOpenChange={(value) => {
          form.reset({ name: "" });
          toggleOpen(value);
        }}
        modal
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a new collage</DialogTitle>
            <DialogDescription>Start from naming your collage and then upload your favorite photos</DialogDescription>
          </DialogHeader>

          <div className="pt-2">
            <Form {...form}>
              <form id="new-collage-form" onSubmit={onSubmit}>
                <FormInput
                  control={form.control}
                  name="name"
                  label="Collage name"
                  hint={<span className="text-gray-500 text-xs">(optional)</span>}
                />
              </form>
            </Form>
          </div>

          <DialogFooter className="sm:justify-start">
            <Button type="submit" form="new-collage-form" disabled={isSubmitting}>
              {isSubmitting && <LoaderIcon className="mr-2 animate-spin" />}
              <span>Start collage</span>
            </Button>

            <DialogClose asChild>
              <Button type="button" variant="ghost" onClick={toggleOpen} disabled={isSubmitting}>
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
