from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime

class ClothingItem(BaseModel):
    id: str
    type: str
    colors: List[str]
    pattern: str
    season: str
    occasions: List[str]

class Weather(BaseModel):
    temperature: float
    condition: str
    precipitation: Optional[str] = None

class Event(BaseModel):
    type: str
    time: str
    dress_code: str
    description: Optional[str] = None

class OutfitHistory(BaseModel):
    outfit: List[ClothingItem]
    date: str
    event: str
    feedback: bool
    weather: Weather

class OutfitRequest(BaseModel):
    wardrobe: List[ClothingItem]
    weather: Weather
    event: Event
    history: Optional[List[OutfitHistory]] = None