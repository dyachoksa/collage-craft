"use client";

import { useToggle } from "react-use";

import { Loader2Icon, WandSparklesIcon } from "lucide-react";

import { generateCollage } from "~/actions/collages";
import { Button } from "~/components/ui/button";
import { useToast } from "~/hooks/use-toast";

interface Props {
  collageId: string;
  label?: string;
}

export default function GenerateCollageButton({ collageId, label = "Make collage" }: Props) {
  const [isProcessing, toggleProcessing] = useToggle(false);

  const { toast } = useToast();

  const onClick = async () => {
    try {
      toggleProcessing(true);

      await generateCollage(collageId);

      toast({
        title: "Success",
        description: "Collage has been queued for generation. Please wait a moment. It will be done shortly.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: (
          <>
            <p>Failed to generate collage. Please try again later.</p>
            <p className="pt-1 text-sm">Details: {(error as Error).message}</p>
          </>
        ),
      });
    } finally {
      toggleProcessing(false);
    }
  };

  return (
    <Button className="z-10" onClick={onClick} disabled={isProcessing}>
      {!isProcessing && <WandSparklesIcon className="h-5 w-5 mr-1" />}
      {isProcessing && <Loader2Icon className="h-5 w-5 mr-1 animate-spin" />}
      <span>{label}</span>
    </Button>
  );
}
