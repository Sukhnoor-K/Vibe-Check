from flask import Flask
from flask_cors import CORS

from app.database import db

def create_app():
    app = Flask(__name__)

    # ✅ WORKING CORS config
    CORS(app, origins="http://localhost:5173")

    app.config.from_object('app.config.Config')

    db.init_app(app)

    with app.app_context():
        from .routes import analyze, history, delete
        app.register_blueprint(analyze.bp)
        app.register_blueprint(history.bp)
        app.register_blueprint(delete.bp_delete)
        db.create_all()

    return app
