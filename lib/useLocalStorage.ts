'use client';

import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, defaultValue: T): [T, (value: T) => void] {
  // Initialize with defaultValue to ensure SSR/CSR markup matches.
  const [value, setValue] = useState<T>(defaultValue);

  // Hydrate from localStorage after mount to avoid hydration mismatch.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const item = window.localStorage.getItem(key);
      if (item != null) {
        setValue(JSON.parse(item));
      }
    } catch {
      // no-op; keep defaultValue on errors
    }
  }, [key]);

  const setStoredValue = (newValue: T) => {
    setValue(newValue);
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(key, JSON.stringify(newValue));
      } catch (error) {
        console.error(`Error saving to localStorage:`, error);
      }
    }
  };

  return [value, setStoredValue];
}
