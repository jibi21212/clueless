import React, { useState } from 'react';
import './EventForm.css';

const EventForm = ({ onSubmit, selectedDate }) => {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    dress_code: '', // Changed from dressCode to match context
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
      console.log('Selected date:', selectedDate); // Debug log
      
      const formattedEvent = {
        title: eventData.title,
        description: eventData.description,
        dress_code: eventData.dress_code,
        time: eventData.time,
        location: eventData.location,
        date: selectedDate,
        dateCreated: new Date().toISOString()
      };
  
      console.log('Submitting event:', formattedEvent); // Debug log
      
      await onSubmit(formattedEvent);
      console.log('Event submitted successfully'); // Debug log
      
      // Clear form after successful submission
      setEventData({
        title: '',
        description: '',
        dress_code: '',
        time: '',
        location: '',
      });
    } catch (error) {
      console.error('Error submitting event:', error);
      alert('Failed to add event. Please try again.');
    }
  };

  return (
    <div className="event-form">
      <h3>Add New Event for {selectedDate.toLocaleDateString()}</h3>
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