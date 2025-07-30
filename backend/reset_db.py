from app.database import db
from app import create_app
from app.models import JournalEntry

app = create_app()
with app.app_context():
    db.drop_all()
    db.create_all()