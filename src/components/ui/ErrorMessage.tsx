import { motion } from 'framer-motion';

interface ErrorMessageProps {
  message: string;
  className?: string;
}

export default function ErrorMessage({ message, className = 'py-8' }: ErrorMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`text-center ${className}`}
    >
      <div className="text-sm text-rose-600 bg-rose-50 border border-rose-200 rounded-md p-4">
        {message}
      </div>
    </motion.div>
  );
}
