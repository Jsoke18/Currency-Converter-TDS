import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
  className?: string;
  iconColor?: string;
}

export default function LoadingSpinner({ 
  message = 'Loading...', 
  className = 'py-12',
  iconColor = 'text-blue-600'
}: LoadingSpinnerProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`flex items-center justify-center ${className}`}
    >
      <div className="flex items-center space-x-3">
        <Loader2 className={`h-6 w-6 animate-spin ${iconColor}`} />
        <span className="text-gray-600 font-medium">{message}</span>
      </div>
    </motion.div>
  );
}
