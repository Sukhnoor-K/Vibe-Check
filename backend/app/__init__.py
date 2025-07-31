from flask import Flask
from flask_cors import CORS
from app.database import db

def create_app(config_override=None):
    app = Flask(__name__)
    app.config.from_object('app.config.Config')

    if config_override:
        app.config.update(config_override)

    # Init DB AFTER config is loaded
    db.init_app(app)

    frontend_origin = app.config.get("FRONTEND_ORIGIN", "http://localhost:5173", "https://vibe-check-frontend-ygoo.onrender.com")
    CORS(app, origins=frontend_origin)

    with app.app_context():
        from .routes import analyze, history, delete
        from .models import JournalEntry  # delayed import!
        app.register_blueprint(analyze.bp)
        app.register_blueprint(history.bp)
        app.register_blueprint(delete.bp_delete)

        if not app.config["TESTING"]:
            db.create_all()

    return app
