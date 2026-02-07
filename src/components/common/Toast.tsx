import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({
  message,
  isOpen,
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => {
        clearTimeout(timer);
      };
    }
    return undefined;
  }, [isOpen, onClose, duration]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="bg-white/80 dark:bg-surface-dark/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 px-6 py-3 rounded-full shadow-2xl flex items-center gap-3">
        <span className="material-symbols-outlined text-ai-blue">info</span>
        <span className="text-gray-900 dark:text-white font-medium">
          {message}
        </span>
      </div>
    </div>
  );
};

export default Toast;
