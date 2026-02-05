# Multilingual Translator

Real-time web application for translating text between multiple languages.

## Tech Stack

- **Backend:** Python, Flask, CORS
- **Frontend:** React with Vite
- **Communication:** REST `/api/translate` endpoint (proxy from Vite dev server)

> Note: In this public version, the translation function is a simple placeholder so the app can run without external API keys. It is designed so that a real translation provider (OpenAI, Google Translate, DeepL, etc.) can be plugged in easily later.

## Local Development

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\\Scripts\\activate
pip install -r requirements.txt
python app.py
```

Backend will start on `http://localhost:5001`.

### Frontend

```bash
cd frontend
npm install
npm run start
```

Frontend will start on `http://localhost:5173` and proxy `/api` requests to the Flask backend.

## Future Improvements

- Replace the placeholder `fake_translate` function with a real translation API.
- Add user accounts and history of translations.
- Support streaming / character-by-character translation updates.
- Dockerize for easy deployment to AWS EC2.
