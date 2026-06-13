import { useState, useEffect } from 'react';
import HabitList from './components/HabitList';
import AddHabit from './components/AddHabit';

function App() {
  const [habits, setHabits] = useState([]);

  const fetchHabits = async () => {
    const res = await fetch('http://localhost:4000/api/habits');
    const data = await res.json();
    setHabits(data);
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '0 20px' }}>
      <h1>My Habit Tracker </h1>
      <AddHabit onAdd={fetchHabits} />
      <HabitList habits={habits} onUpdate={fetchHabits} />
    </div>
  );
}

export default App;