from sqlalchemy import Column, Integer, String, Text, ForeignKey, Boolean, UniqueConstraint, DateTime, text
from sqlalchemy.orm import relationship
from app.core.database import Base
from datetime import datetime
import re

# ================= Hotel =================
class Hotel(Base):
    __tablename__ = "hotels"

    id = Column(Integer, primary_key=True)

    name = Column(String, index=True, nullable=False)
    slug = Column(String, unique=True, index=True)
    location = Column(String, index=True, nullable=False)
    description = Column(Text)

    rating = Column(Integer, default=0)

    created_at = Column(DateTime, default=datetime.utcnow)

    images = relationship("HotelImage", back_populates="hotel", cascade="all, delete")
    rooms = relationship("Room", back_populates="hotel", cascade="all, delete")
    
    def generate_slug(self):
        text = re.sub(r'[^a-zA-Z0-9]+', '-', self.name.lower()).strip('-')
        return text

# ================= Hotel Images =================
class HotelImage(Base):
    __tablename__ = "hotel_images"

    id = Column(Integer, primary_key=True)

    hotel_id = Column(Integer, ForeignKey("hotels.id", ondelete="CASCADE"))
    image_url = Column(String, nullable=False)

    hotel = relationship("Hotel", back_populates="images")


# ================= Rooms =================
class Room(Base):
    __tablename__ = "rooms"

    id = Column(Integer, primary_key=True)

    hotel_id = Column(Integer, ForeignKey("hotels.id", ondelete="CASCADE"))

    number = Column(String, nullable=False)
    price = Column(Integer, nullable=False)

    capacity = Column(Integer, default=1)
    is_available = Column(Boolean, default=True)

    created_at = Column(DateTime, default=datetime.utcnow)

    __table_args__ = (
        UniqueConstraint("hotel_id", "number", name="unique_room_per_hotel"),
    )

    hotel = relationship("Hotel", back_populates="rooms")
    amenities = relationship("RoomAmenity", back_populates="room", cascade="all, delete")
    images = relationship("RoomImage", back_populates="room", cascade="all, delete")


# ================= Room Images =================
class RoomImage(Base):
    __tablename__ = "room_images"

    id = Column(Integer, primary_key=True)

    room_id = Column(Integer, ForeignKey("rooms.id", ondelete="CASCADE"))
    image_url = Column(String, nullable=False)

    room = relationship("Room", back_populates="images")


# ================= Amenities =================
class RoomAmenity(Base):
    __tablename__ = "room_amenities"

    id = Column(Integer, primary_key=True)

    room_id = Column(Integer, ForeignKey("rooms.id", ondelete="CASCADE"))
    name = Column(String, nullable=False)

    room = relationship("Room", back_populates="amenities")