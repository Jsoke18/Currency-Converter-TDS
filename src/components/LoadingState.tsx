"use client";

import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  message?: string;
}

export default function LoadingState({ message = "Loading..." }: LoadingStateProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="flex items-center space-x-3">
        <Loader2 className="h-6 w-6 animate-spin text-gray-600" />
        <span className="text-gray-600">{message}</span>
      </div>
    </div>
  );
}