import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarView.css';

function CalendarView({ entries, selectedDate, onDateChange }) {
  // Normalize and safely parse dates
  const markedDates = new Set(
    entries.map(entry => {
      try {
        const iso = entry.timestamp.replace(" ", "T") + "Z"; // enforce UTC
        return new Date(iso).toLocaleDateString('en-CA'); // yyyy-mm-dd

      } catch {
        return null;
      }
    }).filter(Boolean)
  );

  return (
    <div className="calendar-container">
      <Calendar
        onChange={onDateChange}
        value={selectedDate}
        tileContent={({ date }) => {
          const dateStr = date.toLocaleDateString('en-CA');
          return markedDates.has(dateStr) ? <span className="dot">🌙</span> : null;
        }}

          
      />
    </div>
  );
}

export default CalendarView;
