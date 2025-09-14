"use client";

import { Button } from "@/components/ui/button";
import { ArrowRightLeft } from "lucide-react";

interface SwapButtonProps {
  onSwap: () => void;
  disabled: boolean;
}

export default function SwapButton({ onSwap, disabled }: SwapButtonProps) {
  return (
    <div className="flex justify-center">
      <Button
        variant="outline"
        size="lg"
        onClick={onSwap}
        disabled={disabled}
        className="rounded-full h-12 w-12 p-0 border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ArrowRightLeft className="h-5 w-5 text-gray-600" />
      </Button>
    </div>
  );
}