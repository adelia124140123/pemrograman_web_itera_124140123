import { NavLink } from 'react-router-dom';
import './Navbar.css';

// Navbar tidak menerima props, jadi tidak membutuhkan PropTypes.
function Navbar() {
  // NavLink memberi tahu apakah link sedang aktif; dipakai untuk kelas CSS 'active'
  const linkClass = ({ isActive }) => (isActive ? 'active' : '');

  return (
    <nav className="navbar">
      <div className="nav-container">
        <NavLink to="/" className="logo">Buku Pribadi</NavLink>
        <ul className="nav-links">
          {/* 'end' agar link "/" tidak ikut aktif di halaman lain */}
          <li><NavLink to="/" end className={linkClass}>Beranda</NavLink></li>
          <li><NavLink to="/stats" className={linkClass}>Statistik</NavLink></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;