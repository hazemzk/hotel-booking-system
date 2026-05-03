from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.payments.models import Payment, PaymentStatus
from app.bookings.models import Booking
from app.payments.schemas import PaymentCreate
from app.core.security import get_current_user, require_admin

router = APIRouter(prefix="/payments", tags=["Payments"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/")
def create_payment(
    data: PaymentCreate,
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    booking = db.query(Booking).filter(Booking.id == data.booking_id).first()

    if not booking:
        raise HTTPException(404, "Booking not found")

    if booking.user_id != user.id:
        raise HTTPException(403, "Not your booking")

    payment = Payment(
        booking_id=booking.id,
        user_id=user.id,
        amount=booking.total_price,
        method=data.method,
        status=PaymentStatus.pending
    )

    db.add(payment)
    db.commit()
    db.refresh(payment)

    return {
        "message": "Payment created",
        "payment_id": payment.id,
        "status": payment.status
    }

@router.put("/{payment_id}/confirm")
def confirm_payment(
    payment_id: int,
    admin=Depends(require_admin),
    db: Session = Depends(get_db)
):

    payment = db.query(Payment).filter(Payment.id == payment_id).first()

    if not payment:
        raise HTTPException(404, "Payment not found")

    payment.status = PaymentStatus.paid

    db.commit()

    return {"message": "Payment confirmed"}