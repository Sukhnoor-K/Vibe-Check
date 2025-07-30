import React, { useState } from 'react';
import './JournalForm.css';

function JournalForm({ onSubmit }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text);
      setText('');
    }
  };

  return (
    <form className="journal-form" onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your journal entry..."
        rows="4"
        cols="50"
      />
      <br />
      <button type="submit">Analyze Mood</button>
    </form>

  );
}

export default JournalForm;
