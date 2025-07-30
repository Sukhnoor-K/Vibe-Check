import React, { useState, useEffect } from 'react';
import JournalForm from './components/JournalForm';
import JournalEntryCard from './components/JournalEntryCard';
import RecommendationCard from './components/RecommendationCard';
import CalendarView from './components/CalendarView';
import Sidebar from './components/Sidebar';
import { analyzeEntry, fetchHistory, deleteEntry } from './services/api';
import { CalendarDaysIcon, BookOpenIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import './App.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ;

function App() {
  const [recommendation, setRecommendation] = useState(null);
  const [history, setHistory] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentView, setCurrentView] = useState("today");

  useEffect(() => {
    const loadHistory = async () => {
      const data = await fetchHistory();
      setHistory(data);
    };
    loadHistory();
  }, []);

  const handleSubmit = async (text) => {
    const result = await analyzeEntry(text);
    if (result) {
      setRecommendation(result);
      setHistory([result, ...history]);
    }
  };

  const handleDelete = async (id) => {
    const success = await deleteEntry(id);
    if (success) {
      setHistory(prev => prev.filter(entry => entry.id !== id));
    } else {
      console.error("Failed to delete entry.");
    }
  };
  

  const filteredEntries = history.filter(entry => {
    try {
      const entryDate = new Date(entry.timestamp.replace(" ", "T") + "Z").toLocaleDateString('en-CA');
      const selected = selectedDate.toLocaleDateString('en-CA');
      return entryDate === selected;
    } catch {
      return false;
    }
  });

  return (
    <div className="app-container">
      <Sidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        setSelectedDate={setSelectedDate}
        setRecommendation={setRecommendation}
        refreshHistory={async () => {
          const data = await fetchHistory();
          setHistory(data);
        }}
      />


      {/* Main Content */}
      <main className="main-content">
        {currentView === 'new' && (
          <section className="journal-form-section">
            <h1 className="page-title">New Entry</h1>
            <p className="page-subtitle">Ready to check in with yourself? Begin here.</p>
            <JournalForm onSubmit={handleSubmit} />
            {recommendation && <RecommendationCard data={recommendation} />}
          </section>
        )}

        {(currentView === 'today' || currentView === 'journal') && (
          <>
            {currentView === 'today' && (

              <>
              <h1 className="page-title">Today</h1>
              <p className="page-subtitle">
                {selectedDate.toLocaleDateString(undefined, {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>

              <section className="journal-entries">
                {filteredEntries.length === 0 ? (
                  <p className="no-entries">No journal entries for today.</p>
                ) : (
                  filteredEntries.map((entry, index) => (
                    <JournalEntryCard key={index} entry={entry} handleDelete={handleDelete} />
                  ))
                )}
              </section>
              </>
            )}

            {currentView === 'journal' && (
              <>
                <h1 className="page-title">Journal</h1>
                <p className="page-subtitle">Pick a day to revisit your reflections. A "🌙" indicates an entry.</p>
                <CalendarView
                  entries={history}
                  selectedDate={selectedDate}
                  onDateChange={setSelectedDate}
                />

                <section className="journal-entries">
                  {filteredEntries.length === 0 ? (
                    <p className="no-entries">No journal entries for this day.</p>
                  ) : (
                    filteredEntries.map((entry, index) => (
                      <JournalEntryCard key={entry.id} entry={entry} handleDelete={handleDelete} />
                    ))
                  )}
                </section>
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
