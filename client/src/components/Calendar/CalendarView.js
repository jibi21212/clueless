import React, { useState } from 'react';
import Calendar from './Calendar';
import EventForm from './EventForm';
import EventList from './EventList'; // Add this import
import { useUser } from '../../context/UserContext';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';

const CalendarView = () => {
  const { events, addEvent } = useUser();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleEventSubmit = async (eventData) => {
    try {
      const newEvent = {
        ...eventData,
        date: selectedDate.toISOString(),
        dateCreated: new Date().toISOString()
      };

      await addEvent(newEvent);
      alert('Event added successfully!');
    } catch (error) {
      console.error('Error adding event:', error);
      alert('Failed to add event');
    }
  };

  return (
    <div className="calendar-view">
      <div className="calendar-layout">
        <div className="calendar-section">
          <Calendar
            events={events}
            onDateSelect={handleDateSelect}
            selectedDate={selectedDate}
          />
          {/* Add EventList here */}
          <EventList 
            events={events} 
            selectedDate={selectedDate}
          />
        </div>
        <div className="event-form-section">
          <EventForm 
            onSubmit={handleEventSubmit}
            selectedDate={selectedDate}
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarView;