from sqlalchemy import Column, Integer, ForeignKey, String, Enum, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.core.database import Base
import enum


class PaymentStatus(str, enum.Enum):
    pending = "pending"
    paid = "paid"
    failed = "failed"


class PaymentMethod(str, enum.Enum):
    card = "card"
    cash = "cash"
    wallet = "wallet"


class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True)

    booking_id = Column(Integer, ForeignKey("bookings.id", ondelete="CASCADE"))
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))

    amount = Column(Integer, nullable=False)

    method = Column(Enum(PaymentMethod), nullable=False)
    status = Column(Enum(PaymentStatus), default=PaymentStatus.pending)

    transaction_id = Column(String, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)

    booking = relationship("Booking")