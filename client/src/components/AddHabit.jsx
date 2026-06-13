import { useState } from 'react';

function AddHabit({ onAdd }) {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    await fetch('http://localhost:4000/api/habits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });

    setName('');
    onAdd();
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="New habit (e.g. drink water)"
        style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
      />
      <button
        type="submit"
        style={{ padding: '10px 20px', borderRadius: '8px', background: '#7F77DD', color: 'white', border: 'none', cursor: 'pointer' }}
      >
        Add
      </button>
    </form>
  );
}

export default AddHabit;