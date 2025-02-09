import random
from transformers import AutoTokenizer, AutoModelForCausalLM
import torch
import os
from dotenv import load_dotenv
from .schemas import OutfitRequest, ClothingItem, Weather, Event

load_dotenv()

class OutfitGenerator:
    def __init__(self):
        self.model_name = os.getenv('MODEL_NAME', 'gpt2-large')
        print(f"Loading model: {self.model_name}")
        self.tokenizer = AutoTokenizer.from_pretrained(self.model_name)
        self.model = AutoModelForCausalLM.from_pretrained(self.model_name)
        self.tokenizer.pad_token = self.tokenizer.eos_token
        self.model.config.pad_token_id = self.model.config.eos_token_id

    def select_appropriate_items(self, request: OutfitRequest):
        # Weather analysis
        temp = request.weather.temperature
        weather_condition = request.weather.condition.lower()
        is_precipitation = weather_condition in ['rain', 'snow', 'sleet']
        
        # Temperature-based season determination
        if temp < 32:
            current_season = 'winter'
            comfort_level = 'very_cold'
        elif temp < 50:
            current_season = 'winter'
            comfort_level = 'cold'
        elif temp < 65:
            current_season = 'fall'
            comfort_level = 'cool'
        elif temp < 75:
            current_season = 'spring'
            comfort_level = 'mild'
        elif temp < 85:
            current_season = 'summer'
            comfort_level = 'warm'
        else:
            current_season = 'summer'
            comfort_level = 'hot'

        # Categorize items
        categories = {
            'tops': [],
            'bottoms': [],
            'outerwear': [],
            'shoes': [],
            'accessories': []
        }

        for item in request.wardrobe:
            item_type = item.type.lower()
            if item_type in ['shirt', 't-shirt', 'blouse', 'sweater', 'top']:
                categories['tops'].append(item)
            elif item_type in ['pants', 'jeans', 'shorts', 'skirt']:
                categories['bottoms'].append(item)
            elif item_type in ['jacket', 'coat', 'hoodie']:
                categories['outerwear'].append(item)
            elif item_type in ['shoes', 'sneakers', 'boots']:
                categories['shoes'].append(item)
            elif item_type in ['hat', 'scarf', 'accessory']:
                categories['accessories'].append(item)

        outfit = []

        # Select core items (top and bottom)
        if categories['tops']:
            selected_top = random.choice(categories['tops'])
            outfit.append({
                "type": selected_top.type,
                "colors": selected_top.colors,
                "category": "top",
                "warmth_level": "warm" if selected_top.season.lower() in ['winter', 'fall'] else "cool"
            })

        if categories['bottoms']:
            selected_bottom = random.choice(categories['bottoms'])
            outfit.append({
                "type": selected_bottom.type,
                "colors": selected_bottom.colors,
                "category": "bottom",
                "warmth_level": "warm" if selected_bottom.season.lower() in ['winter', 'fall'] else "cool"
            })

        # Add outerwear if needed
        if comfort_level in ['very_cold', 'cold'] and categories['outerwear']:
            selected_outerwear = random.choice(categories['outerwear'])
            outfit.append({
                "type": selected_outerwear.type,
                "colors": selected_outerwear.colors,
                "category": "outerwear",
                "warmth_level": "warm"
            })

        return outfit if outfit else ["No suitable items found in wardrobe"]

    def get_outfit_suggestion(self, data):
        try:
            # Convert the incoming JSON data to your dataclass objects
            wardrobe = [
                ClothingItem(
                    type=item['type'],
                    colors=item['colors'],
                    pattern=item['pattern'],
                    season=item['season'],
                    occasions=item['occasions']
                ) 
                for item in data['wardrobe']
            ]
            
            weather = Weather(**data['weather'])
            event = Event(**data['event'])
            
            request = OutfitRequest(
                wardrobe=wardrobe,
                weather=weather,
                event=event
            )
            
            return self.select_appropriate_items(request)
        except Exception as e:
            print(f"Error generating suggestion: {e}")
            return ["Unable to generate suggestion. Please try again."]