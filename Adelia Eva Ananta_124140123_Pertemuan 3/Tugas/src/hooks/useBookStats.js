import { useMemo } from 'react';

/**
 * Custom hook: menghitung statistik koleksi dari array buku.
 * Mengembalikan total, jumlah per status, dan persentase per status.
 */
function useBookStats(books) {
  // useMemo: hasil hanya dihitung ulang kalau array books berubah
  return useMemo(() => {
    const total = books.length;
    const count = (status) => books.filter((b) => b.status === status).length;

    const milik = count('milik');
    const baca = count('baca');
    const beli = count('beli');

    // Jaga pembagian nol: kalau belum ada buku, persentase 0 (bukan NaN)
    const percent = (n) => (total > 0 ? Math.round((n / total) * 100) : 0);

    return {
      total,
      milik,
      baca,
      beli,
      percentages: {
        milik: percent(milik),
        baca: percent(baca),
        beli: percent(beli),
      },
    };
  }, [books]);
}

export default useBookStats;
