from flask import Flask, request, jsonify
from flask_cors import CORS
from api.model import OutfitGenerator
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

generator = OutfitGenerator()

@app.route('/suggest-outfit', methods=['POST'])
def suggest_outfit():
    try:
        data = request.json
        print("Received request:", data)
        
        suggestion = generator.get_outfit_suggestion(data)
        print("Generated suggestion:", suggestion)
        
        return jsonify({"suggestion": suggestion})
    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    port = int(os.getenv('PORT', 8080))
    app.run(host='0.0.0.0', port=port, debug=True)