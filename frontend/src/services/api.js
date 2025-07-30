const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5050';

export async function analyzeEntry(text) {
  try {
    const res = await fetch(`${API_URL}/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    return await res.json();
  } catch (err) {
    console.error("Error analyzing entry:", err);
  }
}

export async function fetchHistory() {
  try {
    const res = await fetch(`${API_URL}/history`);
    return await res.json();
  } catch (err) {
    console.error("Error fetching history:", err);
    return [];
  }
}

export async function deleteEntry(id) {
  try {
    const res = await fetch(`${API_URL}/delete/${id}`, {
      method: 'DELETE',
    });
    return res.ok;
  } catch (err) {
    console.error("Error deleting entry:", err);
    return false;
  }
}
