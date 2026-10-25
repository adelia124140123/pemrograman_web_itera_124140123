import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import BookFilter from './BookFilter';

describe('Komponen BookFilter', () => {
  test('memanggil onStatusChange saat tombol status diklik', () => {
    const handleStatus = vi.fn();
    render(
      <BookFilter status="semua" onStatusChange={handleStatus} query="" onQueryChange={vi.fn()} />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Sedang Dibaca' }));
    expect(handleStatus).toHaveBeenCalledWith('baca');
  });

  test('memanggil onQueryChange saat kata kunci diketik', () => {
    const handleQuery = vi.fn();
    render(
      <BookFilter status="semua" onStatusChange={vi.fn()} query="" onQueryChange={handleQuery} />
    );
    fireEvent.change(screen.getByPlaceholderText(/cari judul/i), { target: { value: 'tere' } });
    expect(handleQuery).toHaveBeenCalledWith('tere');
  });
});