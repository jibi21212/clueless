// pages/CalendarPage.js
import React from 'react';
import CalendarView from '../components/Calendar/CalendarView';
import './CalendarPage.css';

const CalendarPage = () => {
  return (
    <div className="calendar-page">
      <h2>Calendar</h2>
      <CalendarView />
    </div>
  );
};

export default CalendarPage;