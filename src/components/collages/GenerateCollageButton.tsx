"use client";

import { useToggle } from "react-use";

import { Loader2Icon, WandSparklesIcon } from "lucide-react";

import { generateCollage } from "~/actions/collages";
import { Button } from "~/components/ui/button";

interface Props {
  collageId: string;
  label?: string;
}

export default function GenerateCollageButton({ collageId, label = "Make collage" }: Props) {
  const [isProcessing, toggleProcessing] = useToggle(false);

  const onClick = async () => {
    try {
      toggleProcessing(true);

      await generateCollage(collageId);
    } catch (error) {
      // todo: add toast notification
      console.warn(error);
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
