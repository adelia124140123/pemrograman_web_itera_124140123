import { renderHook, act } from '@testing-library/react';
import { describe, test, expect, beforeEach } from 'vitest';
import useLocalStorage from './useLocalStorage';

describe('Hook useLocalStorage', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test('mengembalikan nilai awal saat storage kosong', () => {
    const { result } = renderHook(() => useLocalStorage('kunci', ['awal']));
    expect(result.current[0]).toEqual(['awal']);
  });

  test('membaca data yang sudah ada di localStorage', () => {
    window.localStorage.setItem('kunci', JSON.stringify(['tersimpan']));
    const { result } = renderHook(() => useLocalStorage('kunci', []));
    expect(result.current[0]).toEqual(['tersimpan']);
  });

  test('menyimpan nilai baru ke localStorage saat state berubah', () => {
    const { result } = renderHook(() => useLocalStorage('kunci', []));
    act(() => {
      result.current[1](['baru']);
    });
    expect(JSON.parse(window.localStorage.getItem('kunci'))).toEqual(['baru']);
  });
});