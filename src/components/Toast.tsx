import React, { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onDismiss: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onDismiss }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onDismiss();
    }, 4000);
    return () => clearTimeout(timer);
  }, [message, onDismiss]);

  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-5 right-5 z-50 flex items-center space-x-2.5 bg-slate-900 text-white text-xs px-4 py-3 rounded-xl shadow-lg border border-slate-700/60 animate-in slide-in-from-bottom-2 fade-in duration-200"
    >
      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
      <span className="font-medium pr-2">{message}</span>
      <button
        onClick={onDismiss}
        className="text-slate-400 hover:text-white p-0.5 rounded transition-colors"
        aria-label="Dismiss notification"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
