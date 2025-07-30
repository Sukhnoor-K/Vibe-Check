import React from 'react';
import './JournalEntryCard.css';

function JournalEntryCard({ entry, handleDelete }) {
  const { id, text, emotion, timestamp, song } = entry;

  const dateObj = new Date(timestamp + 'Z');
  const weekday = dateObj.toLocaleDateString(undefined, { weekday: 'short' }).toUpperCase();
  const day = dateObj.getDate();

  const confirmAndDelete = () => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      handleDelete(id);
    }
  };

  return (
    <div className="journal-card">
      <div className="date-square">
        <div className="weekday">{weekday}</div>
        <div className="day">{day}</div>
      </div>

      <div className="entry-content">
        <p className="journal-text">"{text}"</p>

        {song?.album_art && (
          <div className="album-art-container">
            <img
              src={song.album_art}
              alt={`${song.title} album art`}
              className="large-album-art"
            />
          </div>
        )}

        <div className="entry-meta">
          <p className="journal-emotion">🌙 <strong>Emotion:</strong> {emotion}</p>

          {song?.title && (
            <p className="journal-song-info">🎵 <strong>Song:</strong>{' '}
              <a href={song.url} target="_blank" rel="noopener noreferrer">
                {song.title}
              </a>
            </p>
          )}

          <p className="journal-timestamp">
            {dateObj.toLocaleString(undefined, {
              weekday: 'short',
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
              hour12: true
            })}
          </p>
        </div>

        {/* Bottom-right delete button */}
        <div className="delete-btn-wrapper">
          <button className="delete-btn" onClick={confirmAndDelete} title="Delete entry">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="trash-icon"
            >
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m3 0V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default JournalEntryCard;
