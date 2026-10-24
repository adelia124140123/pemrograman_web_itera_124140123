import React, { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App" style={{ textAlign: 'center', padding: '3rem' }}>
      <h2>Eksplorasi State: Counter Sederhana</h2>
      <p style={{ fontSize: '1.5rem', margin: '1rem 0' }}>Total Hitungan: {count}</p>
      <button
        onClick={() => setCount(count + 1)}
        style={{ padding: '0.6rem 1.2rem', marginRight: '0.5rem', cursor: 'pointer' }}
      >
        Tambah (+1)
      </button>
      <button
        onClick={() => setCount(count - 1)}
        style={{ padding: '0.6rem 1.2rem', cursor: 'pointer' }}
      >
        Kurang (-1)
      </button>
    </div>
  );
}

export default App;
