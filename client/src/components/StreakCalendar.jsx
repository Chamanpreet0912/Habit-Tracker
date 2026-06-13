function StreakCalendar({ checkIns }) {

  // make a set of date strings for fast lookup
  const checkedDates = new Set(
    checkIns.map(d => {
      const date = new Date(d);
      date.setHours(0, 0, 0, 0);
      return date.toDateString();
    })
  );

  // make array of last 30 days
  const days = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - i);
    days.push(d);
  }

  return (
    <div>
      <p style={{ margin: '12px 0 6px', fontSize: '12px', color: '#888' }}>Last 30 days</p>
      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
        {days.map((day, i) => {
          const done = checkedDates.has(day.toDateString());
          return (
            <div
              key={i}
              title={day.toDateString()}
              style={{
                width: '16px',
                height: '16px',
                borderRadius: '3px',
                background: done ? '#7F77DD' : '#e5e7eb',
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default StreakCalendar;