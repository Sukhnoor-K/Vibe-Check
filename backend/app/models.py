from datetime import datetime
from app.database import db

class JournalEntry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    entry_text = db.Column(db.Text, nullable=False)
    emotion = db.Column(db.String(50), nullable=False)
    song_title = db.Column(db.String(200))
    song_url = db.Column(db.String(300))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    album_art = db.Column(db.String(500))


    def serialize(self):
        return {
            'text': self.entry_text,
            'emotion': self.emotion,
            'song': {
                'title': self.song_title,
                'url': self.song_url,
                'album_art': self.album_art
            },
            'timestamp': self.created_at.isoformat() if self.created_at else None
        }
