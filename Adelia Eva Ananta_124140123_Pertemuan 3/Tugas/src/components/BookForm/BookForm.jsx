import { useState } from 'react';
import PropTypes from 'prop-types';
import { STATUS_OPTIONS } from '../../constants';
import './BookForm.css';

const EMPTY_FORM = { title: '', author: '', status: 'milik' };

/**
 * Form reusable untuk TAMBAH dan EDIT buku.
 * - Mode tambah : initialBook kosong
 * - Mode edit   : initialBook berisi buku yang sedang diedit
 */
function BookForm({ onSubmit, initialBook = null, onCancel = null }) {
  const isEditing = Boolean(initialBook);

  // Controlled component: nilai input dikendalikan oleh state.
  // Pada mode edit, nilai awal langsung diisi dari buku yang diedit.
  const [form, setForm] = useState(
    initialBook
      ? { title: initialBook.title, author: initialBook.author, status: initialBook.status }
      : EMPTY_FORM
  );
  // Menyimpan pesan error per kolom, contoh: { title: 'Judul buku wajib diisi' }
  const [errors, setErrors] = useState({});

  // Satu handler untuk semua input; atribut "name" dipakai sebagai kunci state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Begitu user mulai mengetik di kolom yang error, hapus pesan errornya
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Validasi kolom wajib. trim() menolak isian yang hanya berisi spasi.
  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = 'Judul buku wajib diisi';
    if (!form.author.trim()) newErrors.author = 'Nama penulis wajib diisi';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // cegah reload halaman
    const validationErrors = validate();
    setErrors(validationErrors);
    // Ada error: berhenti, jangan kirim data
    if (Object.keys(validationErrors).length > 0) return;

    // Kirim data yang sudah dirapikan ke komponen induk
    onSubmit({
      title: form.title.trim(),
      author: form.author.trim(),
      status: form.status,
    });
    // Kosongkan form hanya pada mode tambah
    if (!isEditing) setForm(EMPTY_FORM);
  };

  return (
    // noValidate: matikan validasi bawaan browser, pakai validasi buatan sendiri
    <form className="book-form" onSubmit={handleSubmit} noValidate>
      <h2>{isEditing ? 'Edit Buku' : 'Tambah Buku Baru'}</h2>

      <div className="form-group">
        <label htmlFor="title">Judul Buku</label>
        <input
          id="title"
          name="title"
          type="text"
          value={form.title}
          onChange={handleChange}
          // Feedback visual: border merah kalau kolom error
          className={errors.title ? 'input-error' : ''}
          aria-invalid={Boolean(errors.title)}
          placeholder="Contoh: Laskar Pelangi"
        />
        {errors.title && <p className="error-message" role="alert">{errors.title}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="author">Penulis</label>
        <input
          id="author"
          name="author"
          type="text"
          value={form.author}
          onChange={handleChange}
          className={errors.author ? 'input-error' : ''}
          aria-invalid={Boolean(errors.author)}
          placeholder="Contoh: Andrea Hirata"
        />
        {errors.author && <p className="error-message" role="alert">{errors.author}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select id="status" name="status" value={form.status} onChange={handleChange}>
          {/* Pilihan status dibuat dari konstanta, tiap item diberi key unik */}
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {isEditing ? 'Simpan Perubahan' : 'Tambah Buku'}
        </button>
        {/* Tombol Batal hanya muncul saat mode edit */}
        {isEditing && onCancel && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Batal
          </button>
        )}
      </div>
    </form>
  );
}

// Validasi tipe props
BookForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialBook: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    status: PropTypes.string,
  }),
  onCancel: PropTypes.func,
};

export default BookForm;