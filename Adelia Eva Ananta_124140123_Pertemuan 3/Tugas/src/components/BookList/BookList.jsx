import PropTypes from 'prop-types';
import { STATUS_LABEL } from '../../constants';
import './BookList.css';

/**
 * Menampilkan daftar buku. Komponen ini hanya "menampilkan";
 * aksi edit dan hapus diserahkan ke komponen induk lewat props.
 */
function BookList({ books, onEdit, onDelete }) {
  // Conditional rendering: tampilkan pesan kalau tidak ada buku
  if (books.length === 0) {
    return <p className="empty-message">Tidak ada buku yang cocok. Coba tambah buku baru atau ubah filter.</p>;
  }

  return (
    <ul className="book-list">
      {/* Rendering list: key={book.id} membantu React melacak tiap item */}
      {books.map((book) => (
        <li key={book.id} className="book-item">
          <div className="book-info">
            <h3>{book.title}</h3>
            <p>oleh {book.author}</p>
            {/* Kelas badge-milik / badge-baca / badge-beli menentukan warna */}
            <span className={`badge badge-${book.status}`}>{STATUS_LABEL[book.status]}</span>
          </div>
          <div className="book-actions">
            {/* Edit mengirim seluruh objek buku; Hapus cukup mengirim id */}
            <button
              className="btn btn-small btn-secondary"
              onClick={() => onEdit(book)}
              aria-label={`Edit ${book.title}`}
            >
              Edit
            </button>
            <button
              className="btn btn-small btn-danger"
              onClick={() => onDelete(book.id)}
              aria-label={`Hapus ${book.title}`}
            >
              Hapus
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

// Validasi tipe props; status dibatasi hanya tiga nilai yang valid
BookList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['milik', 'baca', 'beli']).isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default BookList;