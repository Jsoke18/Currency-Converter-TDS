"use client";
import { type ConversionHistory } from "@/types/conversion";

interface ConversionHistoryProps {
  conversions: ConversionHistory[];
}

export default function ConversionHistory({
  conversions,
}: ConversionHistoryProps) {
  if (conversions.length === 0) return null;

  return (
    <div className="mt-4 p-4 bg-gray-100 rounded">
      <h3>Recent Conversions</h3>
      {conversions.map((conversion) => (
        <div key={conversion.id}>
          {conversion.fromCurrency} {conversion.fromAmount} to{" "}
          {conversion.toAmount} {conversion.toCurrency}
        </div>
      ))}
    </div>
  );
}
