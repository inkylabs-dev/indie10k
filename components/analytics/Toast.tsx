"use client";

import { useCallback, useMemo, useState } from 'react';

type ToastType = 'info' | 'success' | 'error';

interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const remove = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const addToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => remove(id), 3000);
  }, [remove]);

  const ToastContainer = useMemo(() => {
    const Comp = () => (
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {toasts.map(t => (
          <div key={t.id} className={`px-4 py-3 rounded-lg shadow border text-sm transition-all ${
            t.type === 'success' ? 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200' :
            t.type === 'error' ? 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200' :
            'bg-zinc-50 border-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100'
          }`}>
            {t.message}
          </div>
        ))}
      </div>
    );
    return Comp;
  }, [toasts]);

  return { addToast, ToastContainer };
}

