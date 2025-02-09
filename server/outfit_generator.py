from transformers import AutoTokenizer, AutoModelForCausalLM
import torch
from .schemas import OutfitRequest, ClothingItem

class OutfitGenerator:
    def __init__(self):
        self.model_name = 'gpt2-large'
        print(f"Loading model: {self.model_name}")
        self.tokenizer = AutoTokenizer.from_pretrained(self.model_name)
        self.model = AutoModelForCausalLM.from_pretrained(self.model_name)
        self.tokenizer.pad_token = self.tokenizer.eos_token
        self.model.config.pad_token_id = self.model.config.eos_token_id

    def generate_suggestion(self, request: OutfitRequest):
        # Format the items for the prompt
        items_description = "\n".join([
            f"- {item.type} in {', '.join(item.colors)} ({item.pattern}, {item.season})"
            for item in request.wardrobe
        ])

        prompt = f"""Generate an outfit suggestion based on:
Weather: {request.weather.temperature}°F, {request.weather.condition}
Event: {request.event.type} ({request.event.dress_code})

Available items:
{items_description}

Suggested outfit:"""

        # Generate the suggestion
        inputs = self.tokenizer(prompt, return_tensors="pt", padding=True)
        outputs = self.model.generate(
            inputs.input_ids,
            max_length=200,
            num_return_sequences=1,
            temperature=0.7,
            pad_token_id=self.tokenizer.eos_token_id
        )

        suggestion = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
        
        # Parse the suggestion to match with available items
        selected_items = []
        for item in request.wardrobe:
            if item.type.lower() in suggestion.lower():
                selected_items.append(item)

        return selected_items