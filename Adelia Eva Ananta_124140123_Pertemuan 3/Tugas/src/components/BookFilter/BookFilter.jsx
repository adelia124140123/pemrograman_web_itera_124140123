import PropTypes from 'prop-types';
import { STATUS_OPTIONS } from '../../constants';
import './BookFilter.css';

/**
 * Kolom pencarian dan tombol filter status.
 * Tidak punya state sendiri: nilainya datang dari induk (controlled component).
 */
function BookFilter({ status, onStatusChange, query, onQueryChange }) {
  // Tambahkan opsi "Semua" di depan daftar status
  const options = [{ value: 'semua', label: 'Semua' }, ...STATUS_OPTIONS];

  return (
    <div className="book-filter">
      {/* Pencarian: kirim teks langsung ke induk setiap kali user mengetik */}
      <input
        type="search"
        className="search-input"
        placeholder="Cari judul atau penulis..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
      />
      <div className="status-buttons">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            // Tombol yang sedang dipilih diberi kelas 'active'
            className={`status-btn ${status === opt.value ? 'active' : ''}`}
            aria-pressed={status === opt.value}
            onClick={() => onStatusChange(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

BookFilter.propTypes = {
  status: PropTypes.string.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  onQueryChange: PropTypes.func.isRequired,
};

export default BookFilter;
