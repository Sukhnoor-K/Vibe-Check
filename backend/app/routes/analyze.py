from flask import Blueprint, request, jsonify
from app.models import JournalEntry
from app.database import db
from app.sentiment import get_emotion 
from app.recommender import recommend_song


bp = Blueprint('analyze', __name__)

@bp.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    text = data.get('text')

    if not text:
        return jsonify({'error': 'Text is required'}), 400

    emotion = get_emotion(text)  
    song = recommend_song(emotion)  

    entry = JournalEntry(
        entry_text=text,
        emotion=emotion,
        song_title=song['title'],
        song_url=song['url'],
        album_art=song.get('album_art')
    )
    db.session.add(entry)
    db.session.commit()
    print("Saving to DB:", text, emotion)

    return jsonify({
        'emotion': emotion,
        'song': song,
        'id': entry.id
    })
