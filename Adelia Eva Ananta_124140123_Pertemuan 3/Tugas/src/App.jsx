import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { BookProvider } from './context/BookContext';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Stats from './pages/Stats/Stats';
import './App.css';

function App() {
  return (
    // Router: menyediakan navigasi multi-halaman tanpa reload
    <Router>
      {/* BookProvider: membagikan data buku ke Navbar dan semua halaman */}
      <BookProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stats" element={<Stats />} />
          {/* URL yang tidak dikenal dialihkan ke beranda */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BookProvider>
    </Router>
  );
}

export default App;