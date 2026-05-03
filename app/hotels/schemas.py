from pydantic import BaseModel, Field
from typing import List, Optional


class RoomCreate(BaseModel):
    number: str
    price: int
    capacity: int = Field(gt=0)
    amenities: List[str] = []


class RoomUpdate(BaseModel):
    number: Optional[str] = None
    price: Optional[int] = None
    capacity: Optional[int] = Field(None, gt=0)
    is_available: Optional[bool] = None


class HotelCreate(BaseModel):
    name: str
    location: str
    description: Optional[str] = None

    images: List[str] = []
    rooms: List[RoomCreate] = []