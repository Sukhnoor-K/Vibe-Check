import React from 'react';
import { CalendarDaysIcon, BookOpenIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import './Sidebar.css';

function Sidebar({ currentView, setCurrentView, setSelectedDate, setRecommendation, refreshHistory }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo-circle">
        <h2 className="sidebar-title">Vibe<br />Check</h2>
      </div>

      <nav className="nav-container">
        <button
          className={`nav-button ${currentView === 'today' ? 'active' : ''}`}
          onClick={async () => {
            setCurrentView('today');
            setSelectedDate(new Date());
            await refreshHistory(); // trigger reload
          }}
        >
          <CalendarDaysIcon className="nav-icon" /> Today
        </button>

        <button
          className={`nav-button ${currentView === 'journal' ? 'active' : ''}`}
          onClick={() => setCurrentView('journal')}
        >
          <BookOpenIcon className="nav-icon" /> Journal
        </button>

        <button
          className={`nav-button new-entry-btn ${currentView === 'new' ? 'active' : ''}`}
          onClick={() => {
            setCurrentView('new');
            setRecommendation(null);
          }}
        >
          <PencilSquareIcon className="nav-icon" /> New Entry
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;