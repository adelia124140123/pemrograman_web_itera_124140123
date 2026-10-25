import { renderHook } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import useBookStats from './useBookStats';

describe('Hook useBookStats', () => {
  test('menghitung total, jumlah per status, dan persentase', () => {
    const books = [
      { id: '1', title: 'A', author: 'X', status: 'milik' },
      { id: '2', title: 'B', author: 'Y', status: 'milik' },
      { id: '3', title: 'C', author: 'Z', status: 'baca' },
      { id: '4', title: 'D', author: 'W', status: 'beli' },
    ];
    const { result } = renderHook(() => useBookStats(books));

    expect(result.current.total).toBe(4);
    expect(result.current.milik).toBe(2);
    expect(result.current.percentages.milik).toBe(50);
  });

  test('mengembalikan nol semua saat daftar kosong (tanpa NaN)', () => {
    const { result } = renderHook(() => useBookStats([]));
    expect(result.current.total).toBe(0);
    expect(result.current.percentages.baca).toBe(0);
  });
});