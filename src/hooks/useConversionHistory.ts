import { useState } from "react";
import { ConversionHistory } from "@/types/conversion";

export function useConversionHistory() {
  const [conversions, setConversion] = useState<ConversionHistory[]>(
    [] as ConversionHistory[]
  );

  const addConversion = (
    conversion: Omit<ConversionHistory, "id" | "timestamp">
  ) => {
    const newConversion: ConversionHistory = {
      ...conversion,
      id: Date.now().toString(),
      timestamp: new Date(),
    };

    setConversion((prev) => {
      return [newConversion, ...prev].slice(0, 5);
    });
  };
  return { conversions, addConversion };
}
