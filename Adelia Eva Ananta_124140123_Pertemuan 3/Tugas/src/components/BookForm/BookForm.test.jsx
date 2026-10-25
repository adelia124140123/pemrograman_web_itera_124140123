import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import BookForm from './BookForm';

describe('Komponen BookForm', () => {
  test('menampilkan kolom judul, penulis, dan status', () => {
    render(<BookForm onSubmit={vi.fn()} />);
    expect(screen.getByLabelText('Judul Buku')).toBeInTheDocument();
    expect(screen.getByLabelText('Penulis')).toBeInTheDocument();
    expect(screen.getByLabelText('Status')).toBeInTheDocument();
  });

  test('menampilkan pesan error dan tidak submit saat kolom kosong', () => {
    const handleSubmit = vi.fn();
    render(<BookForm onSubmit={handleSubmit} />);

    fireEvent.click(screen.getByRole('button', { name: 'Tambah Buku' }));

    expect(screen.getByText('Judul buku wajib diisi')).toBeInTheDocument();
    expect(screen.getByText('Nama penulis wajib diisi')).toBeInTheDocument();
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  test('memanggil onSubmit dengan data yang sudah dirapikan saat valid', () => {
    const handleSubmit = vi.fn();
    render(<BookForm onSubmit={handleSubmit} />);

    fireEvent.change(screen.getByLabelText('Judul Buku'), { target: { value: '  Bumi  ' } });
    fireEvent.change(screen.getByLabelText('Penulis'), { target: { value: 'Tere Liye' } });
    fireEvent.change(screen.getByLabelText('Status'), { target: { value: 'baca' } });
    fireEvent.click(screen.getByRole('button', { name: 'Tambah Buku' }));

    expect(handleSubmit).toHaveBeenCalledWith({
      title: 'Bumi',
      author: 'Tere Liye',
      status: 'baca',
    });
  });
});