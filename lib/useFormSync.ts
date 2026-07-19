'use client';

import { useState, useEffect } from 'react';

export function useFormSync<T extends object>(initialData: T) {
  const [data, setData] = useState<T>(initialData);
  const [isMounted, setIsMounted] = useState(false);

  // 1. Load dari LocalStorage saat pertama kali render (Client-side)
  useEffect(() => {
    setIsMounted(true);
    const key = `form_draft_${window.location.pathname}`;
    const savedDraft = localStorage.getItem(key);
    
    if (savedDraft) {
      try {
        const parsedData = JSON.parse(savedDraft);
        // CRITICAL PATCH: Merge initialData dengan parsedData
        // Mencegah crash jika ada penambahan form/field baru di masa depan
        setData({ ...initialData, ...parsedData });
      } catch (error) {
        console.error("Gagal membaca draft form, mereset ulang.", error);
        localStorage.removeItem(key);
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // 2. Save ke LocalStorage setiap ada perubahan ketikan
  useEffect(() => {
    // Jangan overwrite dengan initialData pada render pertama server
    if (isMounted) {
      const key = `form_draft_${window.location.pathname}`;
      localStorage.setItem(key, JSON.stringify(data));
    }
  }, [data, isMounted]);

  return [data, setData] as const;
}
