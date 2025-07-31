import pytest
from app import create_app, db

# test analyze route
def test_analyze(client):
    response = client.post('/analyze', json={'text': 'I had a great day!'})
    assert response.status_code == 200
    data = response.get_json()
    assert 'emotion' in data
    assert 'song' in data
    assert 'id' in data
    assert 'title' in data['song']
    assert 'url' in data['song']
    assert 'album_art' in data['song']


# test history route
def test_history(client):
    response = client.get('/history')
    assert response.status_code == 200
    data = response.get_json()
    assert isinstance(data, list)

# test delete route
def test_delete(client):
    # Create an entry
    response = client.post('/analyze', json={'text': 'Test entry'})
    assert response.status_code == 200
    entry_id = response.get_json().get('id')

    # Delete it
    delete_response = client.delete(f'/delete/{entry_id}')
    assert delete_response.status_code == 200
