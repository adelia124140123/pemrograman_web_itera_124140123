import React, { useState } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]);

  const addItem = (name) => {
    // Immutability: buat array baru dengan spread operator
    setItems([...items, { id: Date.now(), name }]);
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="App" style={{ maxWidth: '480px', margin: '2rem auto', padding: '1rem' }}>
      <h2>Eksplorasi State: Array State</h2>
      <button
        onClick={() => addItem(`Tugas Baru ke-${items.length + 1}`)}
        style={{ padding: '0.6rem 1.2rem', margin: '1rem 0', cursor: 'pointer' }}
      >
        Tambah Item
      </button>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items.map(item => (
          <li
            key={item.id}
            style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #e2e8f0' }}
          >
            <span>{item.name}</span>
            <button
              onClick={() => removeItem(item.id)}
              style={{ color: '#ef4444', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 600 }}
            >
              Hapus
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
