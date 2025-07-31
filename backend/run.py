import os
from app import create_app

app = create_app()

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))  # default fallback is 10000
    app.run(host="0.0.0.0", port=port) # set host to 0.0.0.0 for Render deployment