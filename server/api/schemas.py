from typing import List, Optional
from dataclasses import dataclass

@dataclass
class ClothingItem:
    type: str
    colors: List[str]
    pattern: str
    season: str
    occasions: List[str]

@dataclass
class Weather:
    temperature: float
    condition: str
    precipitation: Optional[str] = None

@dataclass
class Event:
    type: str
    time: str
    dress_code: str
    description: Optional[str] = None

@dataclass
class OutfitRequest:
    wardrobe: List[ClothingItem]
    weather: Weather
    event: Event