from flask import Blueprint, jsonify
from app.models import JournalEntry
from app.database import db

bp_delete = Blueprint('delete', __name__)

@bp_delete.route('/delete/<int:id>', methods=['DELETE'])
def delete_entry(id):
    entry = JournalEntry.query.get(id)
    if entry:
        db.session.delete(entry)
        db.session.commit()
        return jsonify({"message": "Deleted"}), 200
    else:
        return jsonify({"error": "Entry not found"}), 404
