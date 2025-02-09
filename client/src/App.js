import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navigation/Navbar';
import Home from './pages/Home';
import WardrobePage from './pages/WardrobePage';
import CalendarPage from './pages/CalendarPage';
import HistoryPage from './pages/HistoryPage';
import SuggestionsPage from './pages/SuggestionsPage';
import { UserProvider } from './context/UserContext';
import './App.css';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/wardrobe" element={<WardrobePage />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/suggestions" element={<SuggestionsPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;