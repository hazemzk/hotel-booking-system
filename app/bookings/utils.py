from sqlalchemy.orm import Session
from app.bookings.models import Booking, BookingStatus


def is_room_available(db: Session, room_id: int, check_in, check_out):

    if check_in >= check_out:
        return False

    overlapping_booking = db.query(Booking).filter(
        Booking.room_id == room_id,
        Booking.status == BookingStatus.confirmed,  # 🔥 المهم
        Booking.check_in < check_out,
        Booking.check_out > check_in
    ).first()

    return overlapping_booking is None


def calculate_total_price(room_price, check_in, check_out):
    days = (check_out - check_in).days

    if days <= 0:
        return 0

    return days * room_price