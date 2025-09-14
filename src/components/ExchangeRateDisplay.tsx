"use client";

import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

interface ExchangeRateDisplayProps {
  fromCurrency: string;
  toCurrency: string;
  exchangeRate: string;
}

export default function ExchangeRateDisplay({
  fromCurrency,
  toCurrency,
  exchangeRate,
}: ExchangeRateDisplayProps) {
  return (
    <motion.div
      key="exchange-rate"
      layout
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.98 }}
      transition={{ 
        duration: 0.25, 
        ease: [0.4, 0.0, 0.2, 1],
        layout: { duration: 0.25 }
      }}
      className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-xl p-6 border border-blue-200 shadow-sm"
    >
      <div className="flex items-center justify-center space-x-3">
        <TrendingUp className="h-6 w-6 text-blue-600" />
        <div className="text-center">
          <p className="text-sm font-semibold text-blue-800 uppercase tracking-wide mb-2">Exchange Rate</p>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="bg-white/80 rounded-lg px-4 py-2 border border-blue-200"
          >
            <p className="text-xl font-bold text-blue-800">
              1 {fromCurrency} = {exchangeRate} {toCurrency}
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
