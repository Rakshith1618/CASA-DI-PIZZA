import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface ToastProps {
  message: string | null;
}

export default function Toast({ message }: ToastProps) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[70] flex items-center gap-2 px-5 py-3 bg-[#124C26] text-[#F9F2E7] rounded-full shadow-lg text-sm font-medium"
        >
          <CheckCircle size={18} />
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
