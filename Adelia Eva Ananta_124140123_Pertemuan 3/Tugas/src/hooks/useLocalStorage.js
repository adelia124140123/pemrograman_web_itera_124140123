import { useState, useEffect } from 'react';

/**
 * Custom hook: state yang otomatis tersinkron dengan localStorage.
 * Cara pakainya sama seperti useState: const [nilai, setNilai] = useLocalStorage(key, awal)
 */
function useLocalStorage(key, initialValue) {
  // Lazy initializer: fungsi ini hanya dijalankan sekali saat render pertama.
  // Data lama dibaca di sini (bukan di useEffect) supaya tidak tertimpa array kosong.
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // JSON rusak atau localStorage diblokir: pakai nilai awal
      console.error('Gagal membaca localStorage:', error);
      return initialValue;
    }
  });

  // Setiap nilai berubah, simpan ulang ke localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error('Gagal menyimpan ke localStorage:', error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
