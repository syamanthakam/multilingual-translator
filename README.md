# Multilingual Translator

Real-time web application for translating text between multiple languages.

## Tech Stack

- **Backend:** Python, Flask, CORS
- **Frontend:** React with Vite
- **Communication:** REST `/api/translate` endpoint (proxy from Vite dev server or nginx)

> Note: In this public version, the translation function is a simple placeholder so the app can run without external API keys. It is designed so that a real translation provider (OpenAI, Google Translate, DeepL, etc.) can be plugged in easily later.

## Local Development (no cost)

Everything below runs locally on your machine only. There are **no paid APIs or cloud services** required.

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

The UI shows translated text with a **character-by-character streaming effect** once the backend responds.

## Docker Setup (optional, still free)

You can run the whole app locally using Docker and Docker Compose. This is useful if you want an easy path to deploy on your own VM (e.g., EC2), but by default everything still runs on your machine and does **not** call any paid services.

Requirements:
- Docker
- docker-compose

From the repo root:

```bash
docker-compose build
docker-compose up
```

- Backend: http://localhost:5001
- Frontend: http://localhost:5173 (served by nginx inside a container)

You can point a VM (e.g., AWS EC2 free tier) at this repo and run the same commands if you want it accessible on the internet. The project itself still only uses the built-in placeholder translator and does **not** depend on any paid APIs.

## Future Improvements

- Replace the placeholder `fake_translate` function with a real translation API (optional, would require API keys).
- Add user accounts and history of translations.
- Improve streaming UX further (true server-side streaming via SSE or WebSockets if needed).
