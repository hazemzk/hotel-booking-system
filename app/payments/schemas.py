from pydantic import BaseModel
from app.payments.models import PaymentMethod


class PaymentCreate(BaseModel):
    booking_id: int
    method: PaymentMethod