"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useConverterState } from "@/hooks/useConverterState";
import ConverterHeader from "@/components/ConverterHeader";
import LoadingState from "@/components/LoadingState";
import CurrencyInput from "@/components/CurrencyInput";
import SwapButton from "@/components/SwapButton";
import ConvertButton from "@/components/ConvertButton";
import ExchangeRateDisplay from "@/components/ExchangeRateDisplay";
import CalculationBreakdown from "@/components/CalculationBreakdown";

export default function CurrencyConverter() {
  const {
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
    getExchangeRate,
  } = useConverterState();

  if (currenciesLoading && !currenciesError) {
    return <LoadingState />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        layout
        transition={{ duration: 0.25, ease: [0.4, 0.0, 0.2, 1] }}
        className="w-full max-w-lg space-y-6"
      >
        <ConverterHeader />

        <motion.div
          layout
          transition={{
            duration: 0.25,
            ease: [0.4, 0.0, 0.2, 1],
            layout: { duration: 0.25, ease: [0.4, 0.0, 0.2, 1] },
          }}
        >
          <Card className="shadow-lg border border-gray-200 bg-white">
            <CardContent className="p-8 space-y-6">
              <CurrencyInput
                label="From"
                amount={fromAmount}
                currency={fromCurrency}
                currencies={currencies}
                onAmountChange={setFromAmount}
                onCurrencyChange={setFromCurrency}
                currenciesError={currenciesError}
              />

              <SwapButton
                onSwap={handleSwapCurrencies}
                disabled={
                  !fromCurrency ||
                  !toCurrency ||
                  converting ||
                  !!currenciesError
                }
              />

              <CurrencyInput
                label="To"
                amount={toAmount}
                currency={toCurrency}
                currencies={currencies}
                onCurrencyChange={setToCurrency}
                readOnly
                isConverting={converting}
                currenciesError={currenciesError}
              />

              <ConvertButton
                onConvert={handleConvert}
                disabled={
                  !fromCurrency ||
                  !toCurrency ||
                  !fromAmount ||
                  fromAmount === "0" ||
                  converting ||
                  !!currenciesError
                }
                converting={converting}
              />

              {error && (
                <div className="text-red-600 text-sm text-center bg-red-50 border border-red-200 rounded-lg p-3">
                  {error}
                </div>
              )}

              <AnimatePresence mode="wait">
                {fromCurrency && toCurrency && toAmount && !converting && (
                  <ExchangeRateDisplay
                    fromCurrency={fromCurrency}
                    toCurrency={toCurrency}
                    exchangeRate={getExchangeRate()}
                  />
                )}
              </AnimatePresence>

              <AnimatePresence mode="wait">
                {fromAmount &&
                  toAmount &&
                  fromCurrency &&
                  toCurrency &&
                  !converting && (
                    <CalculationBreakdown
                      fromAmount={fromAmount}
                      fromCurrency={fromCurrency}
                      toAmount={toAmount}
                      toCurrency={toCurrency}
                      exchangeRate={getExchangeRate()}
                    />
                  )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>

        <div className="text-center text-sm text-gray-500">
          <p>Powered by CurrencyBeacon API</p>
        </div>
      </motion.div>
    </div>
  );
}
