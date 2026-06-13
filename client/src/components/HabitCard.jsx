import StreakCalendar from './StreakCalendar';

function HabitCard({ habit, onUpdate }) {

  const handleCheckIn = async () => {
    await fetch(`http://localhost:4000/api/habits/${habit._id}/checkin`, {
      method: 'PATCH'
    });
    onUpdate();
  };

  const handleDelete = async () => {
    await fetch(`http://localhost:4000/api/habits/${habit._id}`, {
      method: 'DELETE'
    });
    onUpdate();
  };

  // check if already done today
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const doneTodayAlready = habit.checkIns.some(date => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d.getTime() === today.getTime();
  });

  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '12px',
      padding: '16px',
      background: doneTodayAlready ? '#f0fdf4' : 'white'
    }}>

      {/* TOP ROW - name + buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ margin: 0 }}>{habit.name}</h3>
          <p style={{ margin: '4px 0', color: '#666' }}>
            {habit.currentStreak} day streak &nbsp;|&nbsp; Best: {habit.longestStreak}
          </p>
        </div>

        {/* BUTTONS */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={handleCheckIn}
            disabled={doneTodayAlready}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              background: doneTodayAlready ? '#86efac' : '#7F77DD',
              color: 'white',
              border: 'none',
              cursor: doneTodayAlready ? 'default' : 'pointer'
            }}
          >
            {doneTodayAlready ? '✅ Done Today!' : 'Mark Done'}
          </button>

          <button
            onClick={handleDelete}
            style={{ padding: '8px', borderRadius: '8px', background: '#fee2e2', border: 'none', cursor: 'pointer' }}
          >
            🗑️
          </button>
        </div>
      </div>

      {/* STREAK CALENDAR */}
      <StreakCalendar checkIns={habit.checkIns} />
    </div>
  );
}

export default HabitCard;