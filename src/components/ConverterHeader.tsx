"use client";

import { TrendingUp } from "lucide-react";

export default function ConverterHeader() {
  return (
    <div className="text-center space-y-4 pb-2">
      <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg px-4 py-2 shadow-sm border border-blue-200">
        <TrendingUp className="h-5 w-5 text-blue-600" />
        <span className="font-semibold text-blue-800">
          Currency Exchange
        </span>
      </div>
      <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent leading-tight py-1">
        Currency Converter
      </h1>
      <p className="text-gray-600 text-lg">
        Professional exchange rate conversion
      </p>
    </div>
  );
}