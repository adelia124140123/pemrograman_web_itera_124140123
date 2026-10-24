import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <main style={{ textAlign: 'center', padding: '4rem 1rem' }}>
      <h1 style={{ fontSize: '4rem', color: '#ef4444' }}>404</h1>
      <h2>Halaman Tidak Ditemukan</h2>
      <p style={{ margin: '1rem 0 1.5rem', color: '#64748b' }}>
        Alamat yang kamu buka tidak tersedia atau sudah dipindahkan.
      </p>
      <Link
        to="/"
        style={{
          background: '#3498db',
          color: 'white',
          padding: '0.6rem 1.2rem',
          borderRadius: '6px',
          textDecoration: 'none',
        }}
      >
        Kembali ke Beranda
      </Link>
    </main>
  );
}

export default NotFound;
