from unittest import result

from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel
from sqlalchemy.orm import Session
from datetime import date

from app.core.database import SessionLocal
from app.bookings.models import Booking, BookingStatus
from app.hotels.models import Room
from app.bookings.utils import is_room_available, calculate_total_price
from app.core.security import get_current_user, require_staff_or_admin

router = APIRouter(prefix="/bookings", tags=["Bookings"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ===============================
# ✅ USER: Create Booking
# ===============================
from pydantic import BaseModel, validator
from datetime import date

class BookingCreate(BaseModel):
    room_id: int
    check_in: date
    check_out: date

    @validator("check_out")
    def check_dates(cls, v, values):
        if "check_in" in values and v < values["check_in"]:
            raise ValueError("check_out must be after check_in")
        return v

@router.post("/")
def create_booking(
    data: BookingCreate,
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    room = db.query(Room).filter(Room.id == data.room_id).first()

    if not room:
        raise HTTPException(status_code=404, detail="Room not found")

    if not is_room_available(db, data.room_id, data.check_in, data.check_out):
        raise HTTPException(status_code=400, detail="Room not available")

    total_price = calculate_total_price(
        room.price,
        data.check_in,
        data.check_out
    )

    booking = Booking(
        user_id=user.id,
        room_id=data.room_id,
        check_in=data.check_in,
        check_out=data.check_out,
        total_price=total_price,
        status=BookingStatus.pending
    )

    db.add(booking)
    db.commit()
    db.refresh(booking)

    return booking

# ===============================
# 👤 USER: My Bookings
# ===============================
from sqlalchemy.orm import joinedload
from app.hotels.models import Room   # 👈 مهم جدًا

@router.get("/my")
def get_my_bookings(
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    bookings = (
        db.query(Booking)
        .options(
            joinedload(Booking.room).joinedload(Room.hotel)
        )
        .filter(Booking.user_id == user.id)
        .all()
    )

    return [
        {
            "id": b.id,
            "hotel_name": b.room.hotel.name,
            "room_number": b.room.number,
            "check_in": b.check_in,
            "check_out": b.check_out,
            "total_price": b.total_price,
            "status": b.status.value,
        }
        for b in bookings
    ]
class BookingStatusUpdate(BaseModel):
    status: BookingStatus

# ===============================
# 👑 STAFF/ADMIN: All Bookings
# ===============================
@router.get("/")
def get_all_bookings(user=Depends(require_staff_or_admin), db: Session = Depends(get_db)):
    bookings = db.query(Booking).all()

    result = []

    for b in bookings:
        result.append({
            "id": b.id,
            "check_in": b.check_in,
            "check_out": b.check_out,
            "status": b.status,

            "room_number": b.room.number,
            "hotel_name": b.room.hotel.name
        })

        return result


# ===============================
# 👑 STAFF/ADMIN: Update Status
# ===============================
@router.put("/{booking_id}")
def update_booking_status(
    booking_id: int,
    data: BookingStatusUpdate,
    user=Depends(require_staff_or_admin),
    db: Session = Depends(get_db)
):
    booking = db.query(Booking).filter(Booking.id == booking_id).first()

    if not booking:
        raise HTTPException(404, "Booking not found")

    booking.status = data.status

    db.commit()
    db.refresh(booking)

    return booking

# ===============================
# 👑 STAFF/ADMIN: Delete
# ===============================
@router.delete("/{booking_id}")
def delete_booking(
    booking_id: int,
    user=Depends(require_staff_or_admin),
    db: Session = Depends(get_db)
):

    booking = db.query(Booking).filter(Booking.id == booking_id).first()

    if not booking:
        raise HTTPException(404, "Booking not found")

    db.delete(booking)
    db.commit()

    return {"message": "Booking deleted"}