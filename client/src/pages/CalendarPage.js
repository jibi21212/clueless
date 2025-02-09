// pages/CalendarPage.js
import React, { useState } from 'react';
import CalendarComponent from '../components/Calendar/Calendar';
import EventForm from '../components/Calendar/EventForm';
import './CalendarPage.css';

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDateEvents, setSelectedDateEvents] = useState([]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    const dateEvents = events.filter(event => 
      new Date(event.date).toDateString() === date.toDateString()
    );
    setSelectedDateEvents(dateEvents);
  };

  const handleAddEvent = (newEvent) => {
    setEvents([...events, newEvent]);
    setSelectedDateEvents([...selectedDateEvents, newEvent]);
  };

  return (
    <div className="calendar-page">
      <div className="calendar-layout">
        <div className="calendar-section">
          <CalendarComponent 
            events={events} 
            onDateSelect={handleDateSelect}
          />
          <div className="selected-date-events">
            <h3>Events for {selectedDate.toDateString()}</h3>
            {selectedDateEvents.length > 0 ? (
              <div className="events-list">
                {selectedDateEvents.map((event, index) => (
                  <div key={index} className="event-card">
                    <h4>{event.title}</h4>
                    <p>Time: {event.time}</p>
                    <p>Dress Code: {event.dressCode}</p>
                    <p>Location: {event.location}</p>
                    {event.description && <p>Notes: {event.description}</p>}
                  </div>
                ))}
              </div>
            ) : (
              <p>No events scheduled for this date</p>
            )}
          </div>
        </div>
        <div className="event-form-section">
          <EventForm 
            onSubmit={handleAddEvent}
            selectedDate={selectedDate}
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;