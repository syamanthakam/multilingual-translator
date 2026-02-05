from flask import Flask, request, jsonify
from flask_cors import CORS
import os

# For now we use a simple placeholder translation function.
# Later, we can wire this to a real provider (OpenAI, Google, DeepL, etc.).

def fake_translate(text: str, source_lang: str, target_lang: str) -> str:
    if source_lang == target_lang:
        return text
    return f"[{source_lang}->{target_lang}] " + text


def create_app() -> Flask:
    app = Flask(__name__)
    CORS(app)

    @app.route('/api/translate', methods=['POST'])
    def translate():
        data = request.get_json(force=True) or {}
        text = data.get('text', '')
        source_lang = data.get('source_lang', 'auto')
        target_lang = data.get('target_lang', 'en')

        if not text:
            return jsonify({'error': 'text is required'}), 400

        translated = fake_translate(text, source_lang, target_lang)
        return jsonify({
            'text': text,
            'translated': translated,
            'source_lang': source_lang,
            'target_lang': target_lang,
        })

    @app.route('/health', methods=['GET'])
    def health():
        return jsonify({'status': 'ok'})

    return app


app = create_app()

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5001))
    app.run(host='0.0.0.0', port=port, debug=True)
