import React from 'react';
import './EventList.css';

const EventList = ({ events, selectedDate }) => {
  // Filter events for selected date
  const dailyEvents = events?.filter(event => 
    new Date(event.date).toDateString() === selectedDate.toDateString()
  ) || [];

  // Helper function to format dress code
  const formatDressCode = (dressCode) => {
    if (!dressCode) return '';
    return typeof dressCode === 'string' 
      ? dressCode.replace(/-/g, ' ') 
      : String(dressCode).replace(/-/g, ' ');
  };

  return (
    <div className="events-list-container">
      <h3>Events for {selectedDate.toLocaleDateString()}</h3>
      {dailyEvents.length > 0 ? (
        <div className="events-list">
          {dailyEvents.map((event, index) => (
            <div key={index} className="event-card">
              <div className="event-header">
                <h4>{event.title || 'Untitled Event'}</h4>
                {event.time && <span className="event-time">{event.time}</span>}
              </div>
              <div className="event-details">
                {event.location && (
                  <p className="event-location">
                    <i className="fas fa-map-marker-alt"></i> {event.location}
                  </p>
                )}
                {event.dress_code && (
                  <p className="event-dress-code">
                    <i className="fas fa-tshirt"></i> 
                    {formatDressCode(event.dress_code)}
                  </p>
                )}
                {event.description && (
                  <p className="event-description">{event.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-events">No events scheduled for this day</p>
      )}
    </div>
  );
};

export default EventList;