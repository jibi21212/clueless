import React, { useState } from 'react';
import './EventForm.css';

const EventForm = ({ onSubmit, selectedDate }) => {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    dress_code: '',
    time: '',
    location: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit({
        ...eventData,
        date: selectedDate
      });
      setEventData({
        title: '',
        description: '',
        dress_code: '',
        time: '',
        location: '',
      });
    } catch (error) {
      console.error('Error submitting event:', error);
    }
  };

  return (
    <div className="event-form-container">
      <form className="event-form" onSubmit={handleSubmit}>
        <h3>Add New Event for {selectedDate.toLocaleDateString()}</h3>
        
        <div className="form-group">
          <label className="required">Event Title</label>
          <input
            type="text"
            value={eventData.title}
            onChange={(e) => setEventData({...eventData, title: e.target.value})}
            placeholder="Enter event title"
            required
          />
        </div>

        <div className="form-group">
          <label>Time</label>
          <input
            type="time"
            value={eventData.time}
            onChange={(e) => setEventData({...eventData, time: e.target.value})}
          />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            value={eventData.location}
            onChange={(e) => setEventData({...eventData, location: e.target.value})}
            placeholder="Enter location"
          />
        </div>

        <div className="form-group">
          <label className="required">Dress Code</label>
          <select
            value={eventData.dress_code}
            onChange={(e) => setEventData({...eventData, dress_code: e.target.value})}
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
          <label>Description</label>
          <textarea
            value={eventData.description}
            onChange={(e) => setEventData({...eventData, description: e.target.value})}
            placeholder="Enter event description"
            rows="4"
          />
        </div>

        <button type="submit" className="submit-btn">
          Add Event
        </button>
      </form>
    </div>
  );
};

export default EventForm;