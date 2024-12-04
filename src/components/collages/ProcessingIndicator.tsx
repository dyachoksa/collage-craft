"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { Loader2Icon } from "lucide-react";

export default function ProcessingIndicator() {
  const router = useRouter();

  useEffect(() => {
    const intervalId = setInterval(() => {
      router.refresh();
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [router]);

  return (
    <div className="min-h-60 p-8 flex flex-col items-center justify-center gap-4">
      <Loader2Icon className="block h-5 w-5 animate-spin text-gray-500" />
      <p className="text-gray-500 text-xs">Making something amazing</p>
    </div>
  );
}
