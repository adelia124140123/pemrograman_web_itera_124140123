import { useEffect } from 'react';
import { useBooks } from '../../context/BookContext';
import { STATUS_OPTIONS } from '../../constants';
import './Stats.css';

// Halaman statistik. Perhitungan dilakukan oleh hook useBookStats (lewat Context),
// jadi halaman ini hanya menampilkan hasilnya.
function Stats() {
  const { stats } = useBooks();

  useEffect(() => {
    document.title = 'Buku Pribadi | Statistik';
  }, []);

  return (
    <main className="container">
      <h1 className="page-title">Statistik Koleksi</h1>

      <div className="stat-total">
        <span>Total Buku</span>
        <strong>{stats.total}</strong>
      </div>

      <div className="stat-grid">
        {/* Satu kartu per status. stats[opt.value] membaca stats.milik / baca / beli */}
        {STATUS_OPTIONS.map((opt) => (
          <div key={opt.value} className="stat-card">
            <div className="stat-head">
              <span>{opt.label}</span>
              <strong>{stats[opt.value]}</strong>
            </div>
            <div className="bar">
              {/* Lebar bar mengikuti persentase */}
              <div
                className={`bar-fill bar-${opt.value}`}
                style={{ width: `${stats.percentages[opt.value]}%` }}
              />
            </div>
            <small>{stats.percentages[opt.value]}% dari koleksi</small>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Stats;