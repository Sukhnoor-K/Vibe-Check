import React from 'react';
import './RecommendationCard.css';

function RecommendationCard({ data }) {
  return (
    <div className="recommendation-card">
      <h3>Mood Detected: {data.emotion}</h3>

      {data.song && (
        <div className="song-info">
          <img
            src={data.song.album_art || 'https://img.freepik.com/premium-vector/broken-image-icon_268104-8936.jpg'}
            alt={`${data.song.title} album art`}
            className="album-art"
          />

          <div className="song-meta">
            <p className="song-title">{data.song.title}</p>
            {data.song.url && (
              <a
                href={data.song.url}
                target="_blank"
                rel="noopener noreferrer"
                className="song-link"
              >
                Listen on Platform
              </a>
            )}
            {data.song.preview_url && (
              <audio controls className="audio-player">
                <source src={data.song.preview_url} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default RecommendationCard;
