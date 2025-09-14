"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calculator, Loader2 } from "lucide-react";

interface ConvertButtonProps {
  onConvert: () => void;
  disabled: boolean;
  converting: boolean;
}

export default function ConvertButton({ onConvert, disabled, converting }: ConvertButtonProps) {
  return (
    <div className="flex justify-center">
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        <Button
          onClick={onConvert}
          disabled={disabled}
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {converting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
              Converting...
            </>
          ) : (
            <>
              <Calculator className="h-5 w-5 mr-2" />
              Convert
            </>
          )}
        </Button>
      </motion.div>
    </div>
  );
}