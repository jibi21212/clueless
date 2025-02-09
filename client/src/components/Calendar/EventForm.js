import React, { useState } from 'react';
import './EventForm.css';

const EventForm = ({ onSubmit, selectedDate }) => {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    dressCode: '',
    time: '',
    location: '',
    weather: '', // This could be auto-filled based on weather API
  });

  const dressCodeOptions = [
    'formal',
    'semi-formal',
    'business',
    'business-casual',
    'casual',
    'sporty',
    'beachwear',
    'cocktail',
    'black-tie'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...eventData,
      date: selectedDate,
    });
    setEventData({
      title: '',
      description: '',
      dressCode: '',
      time: '',
      location: '',
      weather: '',
    });
  };

  return (
    <div className="event-form">
      <h3>Add New Event</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Event Title:</label>
          <input
            type="text"
            value={eventData.title}
            onChange={(e) => setEventData({...eventData, title: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>Time:</label>
          <input
            type="time"
            value={eventData.time}
            onChange={(e) => setEventData({...eventData, time: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>Location:</label>
          <input
            type="text"
            value={eventData.location}
            onChange={(e) => setEventData({...eventData, location: e.target.value})}
          />
        </div>

        <div className="form-group">
          <label>Dress Code:</label>
          <select
            value={eventData.dressCode}
            onChange={(e) => setEventData({...eventData, dressCode: e.target.value})}
            required
          >
            <option value="">Select Dress Code</option>
            {dressCodeOptions.map(code => (
              <option key={code} value={code}>
                {code.charAt(0).toUpperCase() + code.slice(1).replace('-', ' ')}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={eventData.description}
            onChange={(e) => setEventData({...eventData, description: e.target.value})}
            rows="3"
          />
        </div>

        <button type="submit" className="submit-btn">Add Event</button>
      </form>
    </div>
  );
};

export default EventForm;