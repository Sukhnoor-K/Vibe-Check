from flask import Blueprint, jsonify
from app.models import JournalEntry

bp = Blueprint('history', __name__)

@bp.route('/history', methods=['GET'])
def history():
    entries = JournalEntry.query.order_by(JournalEntry.created_at.desc()).all()
    return jsonify([
        {
            'id': entry.id,
            'text': entry.entry_text,
            'emotion': entry.emotion,
            'song': {
                'title': entry.song_title or "No song recommendation",
                'url': entry.song_url or "#",
                'album_art': entry.album_art or "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Fpremium-vector%2Fbroken-image-icon_309807444.htm&psig=AOvVaw0esAANwFi5aJ5A727wRNOO&ust=1753855480328000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCOjU4Pmy4Y4DFQAAAAAdAAAAABAE"
            },
            'timestamp': entry.created_at.isoformat() if entry.created_at else None
        }
        for entry in entries
    ])
