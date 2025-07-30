import React from 'react';

function HistoryList({ entries }) {
  return (
    <div className="history">
      <h2>Past Journal Entries</h2>
      <ul>
        {entries.map((entry, index) => {
          const date = new Date(entry.timestamp);
          const formatted = date.toLocaleString(); // you can customize the format here

          return (
            <li key={index}>
              <p><strong>Time:</strong> {formatted}</p>
              <p><strong>Entry:</strong> {entry.text}</p>
              <p><strong>Emotion:</strong> {entry.emotion}</p>
              <p>
                <strong>Song:</strong>{' '}
                {entry.song && entry.song.url
                  ? <a href={entry.song.url} target="_blank" rel="noopener noreferrer">{entry.song.title}</a>
                  : "No song recommendation"}
              </p>
              <hr />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default HistoryList;
