import { createContext, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import useLocalStorage from '../hooks/useLocalStorage';
import useBookStats from '../hooks/useBookStats';

const BookContext = createContext(null);

// Hook konsumen: dipakai halaman/komponen untuk mengambil data buku.
// Melempar error yang jelas kalau lupa membungkus dengan BookProvider.
export function useBooks() {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks harus digunakan di dalam BookProvider');
  }
  return context;
}

export function BookProvider({ children }) {
  // Daftar buku disimpan permanen di localStorage
  const [books, setBooks] = useLocalStorage('books_data', []);
  // Filter dan pencarian cukup state biasa (tidak perlu disimpan permanen)
  const [statusFilter, setStatusFilter] = useState('semua');
  const [searchQuery, setSearchQuery] = useState('');

  // CREATE: id unik dibuat dengan crypto.randomUUID() (lebih aman dari Date.now())
  // Bentuk fungsi (prev) => ... dipakai agar tidak membaca state yang usang.
  const addBook = (data) => {
    const newBook = { id: crypto.randomUUID(), ...data };
    setBooks((prev) => [...prev, newBook]);
  };

  // UPDATE: hanya buku dengan id yang cocok diganti, tanpa memutasi objek asli (immutability)
  const updateBook = (id, data) => {
    setBooks((prev) =>
      prev.map((book) => (book.id === id ? { ...book, ...data } : book))
    );
  };

  // DELETE: buang buku dengan id tersebut
  const deleteBook = (id) => {
    setBooks((prev) => prev.filter((book) => book.id !== id));
  };

  // Daftar buku yang tampil = hasil gabungan filter status DAN kata pencarian.
  // useMemo agar tidak dihitung ulang kalau tidak ada yang berubah.
  const filteredBooks = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase();
    return books.filter((book) => {
      const matchStatus = statusFilter === 'semua' || book.status === statusFilter;
      // Pencarian tidak sensitif huruf besar-kecil, mencakup judul atau penulis
      const matchSearch =
        keyword === '' ||
        book.title.toLowerCase().includes(keyword) ||
        book.author.toLowerCase().includes(keyword);
      return matchStatus && matchSearch;
    });
  }, [books, statusFilter, searchQuery]);

  // Statistik dihitung oleh custom hook useBookStats
  const stats = useBookStats(books);

  // Semua yang boleh diakses komponen lain
  const value = {
    books,
    filteredBooks,
    stats,
    statusFilter,
    setStatusFilter,
    searchQuery,
    setSearchQuery,
    addBook,
    updateBook,
    deleteBook,
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}

BookProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
