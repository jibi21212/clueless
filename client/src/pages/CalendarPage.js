import React from 'react';
import Calendar from '../components/Calendar/Calendar';
import EventForm from '../components/Calendar/EventForm';

const CalendarPage = () => {
  return (
    <div className="calendar-page">
      <h2>Calendar</h2>
      <Calendar />
      <EventForm />
    </div>
  );
};

export default CalendarPage;