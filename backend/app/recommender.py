import os
import random
import spotipy
from dotenv import load_dotenv
from spotipy.oauth2 import SpotifyClientCredentials

load_dotenv()

sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(
    client_id=os.getenv("SPOTIFY_CLIENT_ID"),
    client_secret=os.getenv("SPOTIFY_CLIENT_SECRET")
))

emotion_to_query = {
    "admiration": "uplifting indie",
    "amusement": "playful pop",
    "anger": "aggressive rock",
    "annoyance": "angsty alternative",
    "approval": "feel good",
    "caring": "gentle acoustic",
    "confusion": "ambient electronic",
    "curiosity": "experimental electronic",
    "desire": "romantic R&B",
    "disappointment": "sad indie",
    "disapproval": "dark punk",
    "embarrassment": "melancholy lo-fi",
    "excitement": "energetic dance",
    "fear": "cinematic ambient",
    "gratitude": "warm folk",
    "grief": "emotional piano",
    "joy": "happy upbeat",
    "love": "romantic pop",
    "nervousness": "moody ambient",
    "optimism": "hopeful indie",
    "pride": "anthemic pop",
    "realization": "reflective acoustic",
    "relief": "calm chill",
    "remorse": "soft piano",
    "sadness": "sad chill",
    "surprise": "dreamy synthpop",
    "neutral": "chill instrumental"
}


def recommend_song(emotion):
    query = emotion_to_query.get(emotion, "chill instrumental")

    try:
        results = sp.search(q=query, type='track', limit=20, market='US')
        tracks = results['tracks']['items']

        if tracks:
            track = random.choice(tracks)
            return {
                "title": f"{track['name']} - {track['artists'][0]['name']}",
                "url": track['external_urls']['spotify'],
                "album_art": track['album']['images'][0]['url'] if track['album']['images'] else None
            }

    except Exception as e:
        print(f"Error fetching song for '{emotion}':", e)

    # Fallback
    return {
        "title": "Weightless - Marconi Union",
        "url": "https://open.spotify.com/track/2WfaOiMkCvy7F5fcp2zZ8L",
        "album_art": "https://via.placeholder.com/300x300?text=No+Album+Art"
    }
