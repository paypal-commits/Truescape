import React from 'react';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-white rounded-2xl border border-[#E8E1D5] p-4 artisan-card shadow-xl flex items-start gap-3 animate-in slide-in-from-bottom-5 fade-in duration-200"
        >
          {toast.type === 'success' && (
            <CheckCircle2 className="w-5 h-5 text-[#236B5E] flex-shrink-0 mt-0.5" />
          )}
          {toast.type === 'info' && (
            <Info className="w-5 h-5 text-[#221F1C] flex-shrink-0 mt-0.5" />
          )}
          {toast.type === 'warning' && (
            <AlertTriangle className="w-5 h-5 text-[#B85D38] flex-shrink-0 mt-0.5" />
          )}

          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-[#221F1C]">{toast.title}</h4>
            {toast.message && (
              <p className="text-[11px] text-[#786E64] mt-0.5 leading-normal">
                {toast.message}
              </p>
            )}
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-[#A89F91] hover:text-[#221F1C] transition-colors p-0.5 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
