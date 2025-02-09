from flask import Flask, request, jsonify
from flask_cors import CORS
from outfit_generator import OutfitGenerator
from schemas import Weather, Event, ClothingItem, OutfitRequest

app = Flask(__name__)
CORS(app)

generator = OutfitGenerator()

@app.route('/api/suggest-outfit', methods=['POST'])
def suggest_outfit():
    try:
        data = request.json
        
        # Create request object
        wardrobe = [ClothingItem(**item) for item in data['wardrobe']]
        weather = Weather(**data['weather'])
        event = Event(**data['event'])
        
        request_obj = OutfitRequest(
            wardrobe=wardrobe,
            weather=weather,
            event=event
        )
        
        # Generate suggestion
        suggestion = generator.generate_suggestion(request_obj)
        
        return jsonify({
            'success': True,
            'suggestion': [item.dict() for item in suggestion]
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)