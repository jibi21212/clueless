// components/Calendar/Calendar.js
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';

const CalendarComponent = ({ events, onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onDateSelect(date);
  };

  return (
    <div className="calendar-container">
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        className="custom-calendar"
        tileContent={({ date }) => {
          const hasEvents = events?.some(
            event => new Date(event.date).toDateString() === date.toDateString()
          );
          return hasEvents ? <div className="event-dot"></div> : null;
        }}
      />
    </div>
  );
};

export default CalendarComponent;