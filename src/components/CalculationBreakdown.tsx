"use client";

import { motion } from "framer-motion";
import { Calculator } from "lucide-react";

interface CalculationBreakdownProps {
  fromAmount: string;
  fromCurrency: string;
  toAmount: string;
  toCurrency: string;
  exchangeRate: string | null;
}

export default function CalculationBreakdown({
  fromAmount,
  fromCurrency,
  toAmount,
  toCurrency,
  exchangeRate,
}: CalculationBreakdownProps) {
  return (
    <motion.div
      key="calculation-breakdown"
      layout
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.98 }}
      transition={{
        duration: 0.25,
        ease: [0.4, 0.0, 0.2, 1],
        layout: { duration: 0.25 }
      }}
      className="bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 rounded-xl p-6 border border-emerald-200 shadow-sm"
    >
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center space-x-2">
          <Calculator className="h-5 w-5 text-emerald-600" />
          <p className="text-sm font-semibold text-emerald-800 uppercase tracking-wide">Calculation Breakdown</p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          className="bg-white/60 rounded-lg p-4 border border-emerald-100"
        >
          <p className="text-lg font-mono font-semibold text-emerald-800">
            {parseFloat(fromAmount).toLocaleString()} {fromCurrency} × {exchangeRate} = {parseFloat(toAmount).toLocaleString()} {toCurrency}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}