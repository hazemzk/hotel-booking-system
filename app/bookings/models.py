from sqlalchemy import Column, Integer, ForeignKey, Date, Enum, DateTime, Index
from sqlalchemy.orm import relationship
from datetime import datetime
from app.core.database import Base
import enum


class BookingStatus(str, enum.Enum):
    pending = "pending"
    confirmed = "confirmed"
    cancelled = "cancelled"


class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True)

    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), index=True)
    room_id = Column(Integer, ForeignKey("rooms.id", ondelete="CASCADE"), index=True)

    check_in = Column(Date, nullable=False)
    check_out = Column(Date, nullable=False)

    total_price = Column(Integer, nullable=False)

    status = Column(Enum(BookingStatus), default=BookingStatus.pending, index=True)

    created_at = Column(DateTime, default=datetime.utcnow)

    # 🔥 relationships
    user = relationship("User")
    room = relationship("Room")

    # 🔥 Performance
    __table_args__ = (
        Index("idx_room_dates", "room_id", "check_in", "check_out"),
    )