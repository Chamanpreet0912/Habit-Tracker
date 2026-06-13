import HabitCard from './HabitCard';

function HabitList({ habits, onUpdate }) {
  if (habits.length === 0) {
    return <p>No habits yet! Add one above. 😄</p>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {habits.map(habit => (
        <HabitCard key={habit._id} habit={habit} onUpdate={onUpdate} />
      ))}
    </div>
  );
}

export default HabitList;