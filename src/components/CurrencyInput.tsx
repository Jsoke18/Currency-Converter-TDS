"use client";

import { Input } from "@/components/ui/input";
import CurrencySelector from "@/components/CurrencySelector";
import { getCurrencySymbol } from "@/lib/currency";
import { Currency } from "@/types/currency";

interface CurrencyInputProps {
  label: string;
  amount: string;
  currency: string;
  currencies: Currency[];
  onAmountChange?: (value: string) => void;
  onCurrencyChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  isConverting?: boolean;
  currenciesError?: string | null;
}

export default function CurrencyInput({
  label,
  amount,
  currency,
  currencies,
  onAmountChange,
  onCurrencyChange,
  placeholder = "0.00",
  disabled = false,
  readOnly = false,
  isConverting = false,
  currenciesError,
}: CurrencyInputProps) {
  const getCurrencySymbolForDisplay = (code: string) => {
    const symbol = getCurrencySymbol(currencies, code);
    return symbol || code;
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
        {label}
      </label>
      {currenciesError && label === "From" && (
        <div className="text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded-md p-3 mb-3">
          Please check your API key above to load currencies
        </div>
      )}
      <div className="grid grid-cols-5 gap-3">
        <div className="col-span-2">
          <div className="relative">
            <Input
              type={readOnly ? "text" : "number"}
              placeholder={placeholder}
              value={amount}
              onChange={onAmountChange ? (e) => onAmountChange(e.target.value) : undefined}
              min="0"
              step="0.01"
              disabled={disabled || !!currenciesError}
              readOnly={readOnly}
              className={`text-lg font-semibold ${
                readOnly 
                  ? "bg-gray-100 border-gray-300 text-gray-700" 
                  : "bg-gray-50 border-gray-300 focus:border-gray-500 focus:ring-gray-500"
              } pr-16 disabled:opacity-50 disabled:cursor-not-allowed ${
                isConverting ? "animate-pulse" : ""
              }`}
            />
            {currency && !currenciesError && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                <span className={`text-sm font-medium ${
                  readOnly ? "text-gray-600" : "text-gray-500"
                }`}>
                  {getCurrencySymbolForDisplay(currency)}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="col-span-3">
          <CurrencySelector
            currencies={currenciesError ? [] : currencies}
            value={currency}
            onValueChange={onCurrencyChange}
            placeholder={currenciesError ? "Fix API key first" : "Select currency"}
            disabled={disabled || !!currenciesError}
          />
        </div>
      </div>
    </div>
  );
}
