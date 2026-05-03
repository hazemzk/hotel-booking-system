from fastapi import APIRouter, Depends
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.bookings.models import Booking, BookingStatus
from app.hotels.models import Room, Hotel
from app.core.security import require_admin
from app.users.models import User
from app.users.routes import get_db

router = APIRouter(prefix="/admin", tags=["Admin"])


@router.get("/dashboard")
def get_dashboard(
    admin=Depends(require_admin),
    db: Session = Depends(get_db)
):
    # ===== Basic Stats =====
    total_hotels = db.query(func.count(Hotel.id)).scalar()
    total_rooms = db.query(func.count(Room.id)).scalar()
    total_bookings = db.query(func.count(Booking.id)).scalar()

    # ===== Booking Status Stats (single query better) =====
    booking_stats = dict(
        db.query(Booking.status, func.count(Booking.id))
        .group_by(Booking.status)
        .all()
    )

    confirmed = booking_stats.get(BookingStatus.confirmed, 0)
    cancelled = booking_stats.get(BookingStatus.cancelled, 0)
    pending = booking_stats.get(BookingStatus.pending, 0)

    # ===== Revenue =====
    total_revenue = db.query(func.sum(Booking.total_price)).filter(
        Booking.status == BookingStatus.confirmed
    ).scalar() or 0

    # ===== Avg Booking Value =====
    avg_booking_value = db.query(func.avg(Booking.total_price)).filter(
        Booking.status == BookingStatus.confirmed
    ).scalar() or 0

    # ===== Occupancy Rate (تقريبية) =====
    occupancy_rate = (confirmed / total_rooms) * 100 if total_rooms else 0

    return {
        "overview": {
            "total_hotels": total_hotels,
            "total_rooms": total_rooms,
            "total_bookings": total_bookings,
        },
        "bookings": {
            "confirmed": confirmed,
            "cancelled": cancelled,
            "pending": pending,
        },
        "revenue": {
            "total": float(total_revenue),
            "average_booking": float(avg_booking_value),
        },
        "metrics": {
            "occupancy_rate": round(occupancy_rate, 2)
        }
    }

@router.get("/users-with-bookings")
def get_users_with_bookings(
    admin=Depends(require_admin),
    db: Session = Depends(get_db)
):
    users = db.query(User).all()

    result = []

    for user in users:
        bookings_count = db.query(Booking).filter(
            Booking.user_id == user.id
        ).count()

        result.append({
            "id": user.id,
            "email": user.email,
            "is_admin": user.role == "admin",
            "bookings_count": bookings_count
        })

    return result