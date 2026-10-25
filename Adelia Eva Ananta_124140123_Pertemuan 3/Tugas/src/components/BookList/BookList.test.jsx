import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import BookList from './BookList';

const books = [
  { id: 'a1', title: 'Laskar Pelangi', author: 'Andrea Hirata', status: 'milik' },
  { id: 'b2', title: 'Bumi', author: 'Tere Liye', status: 'baca' },
];

describe('Komponen BookList', () => {
  test('merender judul, penulis, dan label status', () => {
    render(<BookList books={books} onEdit={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText('Laskar Pelangi')).toBeInTheDocument();
    expect(screen.getByText('oleh Tere Liye')).toBeInTheDocument();
    expect(screen.getByText('Sedang Dibaca')).toBeInTheDocument();
  });

  test('menampilkan pesan kosong saat tidak ada buku', () => {
    render(<BookList books={[]} onEdit={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText(/tidak ada buku/i)).toBeInTheDocument();
  });

  test('memanggil onDelete dengan id buku saat tombol hapus diklik', () => {
    const handleDelete = vi.fn();
    render(<BookList books={books} onEdit={vi.fn()} onDelete={handleDelete} />);
    fireEvent.click(screen.getByRole('button', { name: 'Hapus Bumi' }));
    expect(handleDelete).toHaveBeenCalledWith('b2');
  });

  test('memanggil onEdit dengan objek buku saat tombol edit diklik', () => {
    const handleEdit = vi.fn();
    render(<BookList books={books} onEdit={handleEdit} onDelete={vi.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: 'Edit Laskar Pelangi' }));
    expect(handleEdit).toHaveBeenCalledWith(books[0]);
  });
});