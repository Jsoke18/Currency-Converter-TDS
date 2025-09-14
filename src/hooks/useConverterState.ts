import { useState, useEffect, useCallback } from "react";
import { useCurrencies, useCurrencyConversion } from "@/hooks/useCurrency";
import { getCurrencySymbol } from "@/lib/currency";

export function useConverterState() {
  const [fromCurrency, setFromCurrency] = useState<string>("");
  const [toCurrency, setToCurrency] = useState<string>("");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [error, setError] = useState<string>("");

  const apiKey = process.env.NEXT_PUBLIC_CURRENCY_API_KEY;

  const {
    currencies,
    loading: currenciesLoading,
    error: currenciesError,
  } = useCurrencies(apiKey);

  const {
    convert,
    converting,
  } = useCurrencyConversion();

  const getCurrencySymbolForDisplay = useCallback((currencyCode: string) => {
    return getCurrencySymbol(currencies, currencyCode) || currencyCode;
  }, [currencies]);

  const getExchangeRate = useCallback(() => {
    if (!fromAmount || !toAmount || fromAmount === "0") {
      return null;
    }
    const fromNum = parseFloat(fromAmount);
    const toNum = parseFloat(toAmount);
    const rate = toNum / fromNum;
    return rate.toFixed(6);
  }, [fromAmount, toAmount]);

  const handleSwapCurrencies = useCallback(() => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setToAmount("");
  }, [fromCurrency, toCurrency]);

  const handleConvert = useCallback(async () => {
    if (!fromCurrency || !toCurrency || !fromAmount || fromAmount === "0") {
      setToAmount("");
      return;
    }

    const amount = parseFloat(fromAmount);
    if (isNaN(amount)) {
      setToAmount("");
      return;
    }

    setError("");
    try {
      const result = await convert(
        fromCurrency,
        toCurrency,
        amount,
        apiKey || undefined
      );
      if (result !== null) {
        setToAmount(result.toFixed(2));
      }
    } catch {
      setError("Conversion failed. Please try again.");
    }
  }, [fromCurrency, toCurrency, fromAmount, convert, apiKey]);

  useEffect(() => {
    setToAmount("");
    setError("");
  }, [fromCurrency, toCurrency]);

  return {
    fromCurrency,
    toCurrency,
    fromAmount,
    toAmount,
    currencies,
    currenciesLoading,
    currenciesError,
    converting,
    error,
    setFromCurrency,
    setToCurrency,
    setFromAmount,
    handleSwapCurrencies,
    handleConvert,
    getCurrencySymbolForDisplay,
    getExchangeRate,
  };
}