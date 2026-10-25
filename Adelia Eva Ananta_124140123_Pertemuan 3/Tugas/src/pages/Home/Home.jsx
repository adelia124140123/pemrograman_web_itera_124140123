import { useState, useEffect } from 'react';
import BookForm from '../../components/BookForm/BookForm';
import BookFilter from '../../components/BookFilter/BookFilter';
import BookList from '../../components/BookList/BookList';
import { useBooks } from '../../context/BookContext';
import './Home.css';

// Home tidak menerima props: semua data diambil dari Context lewat useBooks().
function Home() {
  const {
    books, filteredBooks, addBook, updateBook, deleteBook,
    statusFilter, setStatusFilter, searchQuery, setSearchQuery,
  } = useBooks();

  // null = mode tambah; berisi objek buku = mode edit
  const [editingBook, setEditingBook] = useState(null);

  // Ubah judul tab browser sekali saat halaman dimuat
  useEffect(() => {
    document.title = 'Buku Pribadi | Beranda';
  }, []);

  // Form dipakai untuk dua mode: pilih aksi sesuai mode saat ini
  const handleSubmit = (data) => {
    if (editingBook) {
      updateBook(editingBook.id, data);
      setEditingBook(null); // keluar dari mode edit
    } else {
      addBook(data);
    }
  };

  // Hapus dengan konfirmasi agar tidak terhapus tanpa sengaja
  const handleDelete = (id) => {
    const target = books.find((b) => b.id === id);
    if (!window.confirm(`Hapus buku "${target.title}"?`)) return;
    // Kalau buku yang dihapus sedang diedit, tutup mode edit
    if (editingBook && editingBook.id === id) setEditingBook(null);
    deleteBook(id);
  };

  return (
    <main className="container">
      <h1 className="page-title">Koleksi Buku Saya</h1>
      <div className="home-layout">
        {/*
          key berubah tiap ganti buku yang diedit, sehingga React membuat ulang form
          dengan state awal yang benar (form otomatis terisi tanpa useEffect tambahan).
        */}
        <BookForm
          key={editingBook ? editingBook.id : 'new'}
          onSubmit={handleSubmit}
          initialBook={editingBook}
          onCancel={() => setEditingBook(null)}
        />
        <section>
          <BookFilter
            status={statusFilter}
            onStatusChange={setStatusFilter}
            query={searchQuery}
            onQueryChange={setSearchQuery}
          />
          <p className="result-count">
            Menampilkan {filteredBooks.length} dari {books.length} buku
          </p>
          <BookList books={filteredBooks} onEdit={setEditingBook} onDelete={handleDelete} />
        </section>
      </div>
    </main>
  );
}

export default Home;