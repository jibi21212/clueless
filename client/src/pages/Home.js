import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import './Home.css';

const Home = () => {
  const { wardrobe, events } = useUser();

  const getNextEvent = () => {
    const futureEvents = events.filter(event => new Date(event.date) > new Date());
    return futureEvents.sort((a, b) => new Date(a.date) - new Date(b.date))[0];
  };

  const nextEvent = getNextEvent();

  return (
    <div className="home-page">
      <section className="hero-section">
        <h1>Welcome to Clueless</h1>
        <p>Your AI-powered wardrobe assistant</p>
      </section>

      <section className="dashboard">
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Your Wardrobe</h3>
            <p>{wardrobe.length} items</p>
            <Link to="/wardrobe" className="dashboard-link">
              Manage Wardrobe
            </Link>
          </div>

          <div className="dashboard-card">
            <h3>Next Event</h3>
            {nextEvent ? (
              <>
                <p>{nextEvent.title}</p>
                <p>{new Date(nextEvent.date).toLocaleDateString()}</p>
              </>
            ) : (
              <p>No upcoming events</p>
            )}
            <Link to="/calendar" className="dashboard-link">
              View Calendar
            </Link>
          </div>

          <div className="dashboard-card">
            <h3>Get Dressed</h3>
            <p>Let AI help you choose an outfit</p>
            <Link to="/suggestions" className="dashboard-link">
              Get Suggestions
            </Link>
          </div>

          <div className="dashboard-card">
            <h3>Outfit History</h3>
            <p>Review and rate your outfits</p>
            <Link to="/history" className="dashboard-link">
              View History
            </Link>
          </div>
        </div>
      </section>

      <section className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <Link to="/wardrobe" className="action-button">
            Add New Item
          </Link>
          <Link to="/calendar" className="action-button">
            Add Event
          </Link>
          <Link to="/suggestions" className="action-button">
            Get Today's Outfit
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;