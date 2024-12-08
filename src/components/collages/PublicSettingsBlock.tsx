"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { z } from "zod";

import { updateCollageVisibility } from "~/actions/collages";
import { FormInput, FormSwitch } from "~/components/forms";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { useToast } from "~/hooks/use-toast";
import type { CollageModel } from "~/types";

interface Props {
  collage: CollageModel;
}

const schema = z.object({
  isPublic: z.boolean(),
  publicSlug: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const origin = process.env.NEXT_PUBLIC_APP_URL;

export default function PublicSettingsBlock({ collage }: Props) {
  const { toast } = useToast();

  const form = useForm<FormData>({
    defaultValues: { isPublic: collage.isPublic, publicSlug: collage.publicSlug || "" },
    resolver: zodResolver(schema),
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await updateCollageVisibility({
        id: collage.id,
        isPublic: data.isPublic,
        publicSlug: data.publicSlug || null,
      });

      toast({
        title: "Success",
        description: "Collage visibility updated successfully",
      });
    } catch (error) {
      console.warn(error);
      toast({
        title: "Error",
        description: "Cannot update collage visibility now. Please try again later.",
        variant: "destructive",
      });
    }
  });

  const isPublic = form.watch("isPublic", collage.isPublic);
  const publicSlug = form.watch("publicSlug", collage.publicSlug || collage.id);

  const submitDisabled = !form.formState.isValid || form.formState.isSubmitting || !form.formState.isDirty;

  return (
    <>
      <Form {...form}>
        <form id="public-settings-form" onSubmit={onSubmit}>
          <div className="flex flex-col gap-4">
            <FormSwitch
              control={form.control}
              name="isPublic"
              label="Allow public access"
              description="Allow other users to view this collage"
            />

            {isPublic && (
              <>
                <FormInput
                  control={form.control}
                  name="publicSlug"
                  label="Public slug"
                  description={
                    <p className="text-xs overflow-hidden truncate">
                      <span>Public URL:</span>{" "}
                      <a
                        href={`${origin}/view/${publicSlug || collage.id}`}
                        target="_blank"
                        className="text-primary-600 hover:underline"
                      >
                        {origin}/view/{publicSlug || collage.id}
                      </a>
                    </p>
                  }
                />
              </>
            )}

            <div>
              <Button type="submit" variant="outline" disabled={submitDisabled}>
                {form.formState.isSubmitting && <Loader2Icon className="mr-2 size-4 animate-spin" />}
                Save changes
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
}
