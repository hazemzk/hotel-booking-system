import uuid
import os
import shutil
from fastapi import Query
from sqlalchemy import and_
from datetime import date
from app.bookings.models import Booking, BookingStatus
from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.core.security import require_staff_or_admin
from app.hotels.models import Hotel, HotelImage, Room, RoomAmenity, RoomImage
from app.hotels.schemas import HotelCreate

router = APIRouter(prefix="/hotels", tags=["Hotels"])


# ================= DB =================
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ================= Helpers =================
def save_image(file: UploadFile, folder: str):
    if not file.content_type.startswith("image/"):
        raise HTTPException(400, "File must be an image")

    os.makedirs(folder, exist_ok=True)

    ext = file.filename.split(".")[-1]
    filename = f"{uuid.uuid4()}.{ext}"

    path = f"{folder}/{filename}"

    with open(path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return path.replace("\\", "/")


# ================= Upload Hotel Image =================
@router.post("/{hotel_id}/upload-image")
def upload_hotel_image(
    hotel_id: int,
    file: UploadFile = File(...),
    user=Depends(require_staff_or_admin),
    db: Session = Depends(get_db)
):

    hotel = db.query(Hotel).filter(Hotel.id == hotel_id).first()
    if not hotel:
        raise HTTPException(404, "Hotel not found")

    path = save_image(file, "media/hotels")

    image = HotelImage(hotel_id=hotel_id, image_url=f"/{path}")
    db.add(image)
    db.commit()

    return {"image_url": image.image_url}


# ================= Upload Room Image =================
@router.post("/rooms/{room_id}/upload-image")
def upload_room_image(
    room_id: int,
    file: UploadFile = File(...),
    user=Depends(require_staff_or_admin),
    db: Session = Depends(get_db)
):

    room = db.query(Room).filter(Room.id == room_id).first()
    if not room:
        raise HTTPException(404, "Room not found")

    # 🔥 كل روم في فولدر لوحده
    folder = f"media/rooms/room_{room_id}"
    path = save_image(file, folder)

    image = RoomImage(
        room_id=room_id,
        image_url=f"/{path}"
    )

    db.add(image)
    db.commit()

    return {"image_url": image.image_url}

# ================= Create Hotel =================
@router.post("/")
def create_hotel(
    hotel: HotelCreate,
    user=Depends(require_staff_or_admin),
    db: Session = Depends(get_db)
):

    new_hotel = Hotel(
        name=hotel.name,
        location=hotel.location,
        description=hotel.description
    )

    db.add(new_hotel)
    db.flush()  # 🔥 بدون commit

    # images
    for img in hotel.images:
        db.add(HotelImage(
            hotel_id=new_hotel.id,
            image_url=img
        ))

    # rooms
    room_numbers = set()

    for room in hotel.rooms:

        if room.number in room_numbers:
            raise HTTPException(400, f"Duplicate room number: {room.number}")

        room_numbers.add(room.number)

        new_room = Room(
            hotel_id=new_hotel.id,
            number=room.number,
            price=room.price,
            capacity=room.capacity
        )

        db.add(new_room)
        db.flush()

        for amenity in room.amenities:
            db.add(RoomAmenity(
                room_id=new_room.id,
                name=amenity
            ))
    hotel = Hotel(
        name=hotel.name,
        location=hotel.location,
        description=hotel.description,
    )

    hotel.slug = hotel.generate_slug()
    db.commit()

    return {
        "message": "Hotel created successfully",
        "hotel_id": new_hotel.id
    }

@router.delete("/rooms/images")
def delete_room_image(data: dict, db: Session = Depends(get_db)):
    image_url = data.get("image_url")

    image = db.query(RoomImage).filter(RoomImage.image_url == image_url).first()

    if not image:
        raise HTTPException(404, "Image not found")

    db.delete(image)
    db.commit()

    return {"message": "Deleted"}

@router.put("/{hotel_id}")
def update_hotel(
    hotel_id: int,
    hotel: HotelCreate,
    user=Depends(require_staff_or_admin),
    db: Session = Depends(get_db)
):

    db_hotel = db.query(Hotel).filter(Hotel.id == hotel_id).first()

    if not db_hotel:
        raise HTTPException(404, "Hotel not found")

    db_hotel.name = hotel.name
    db_hotel.location = hotel.location
    db_hotel.description = hotel.description

    db.commit()
    db.refresh(db_hotel)

    return db_hotel

# ================= Get Hotel =================
@router.get("/{hotel_id}")
def get_hotel_details(hotel_id: int, db: Session = Depends(get_db)):

    hotel = db.query(Hotel).filter(Hotel.id == hotel_id).first()

    if not hotel:
        raise HTTPException(404, "Hotel not found")

    return {
        "id": hotel.id,
        "name": hotel.name,
        "location": hotel.location,
        "description": hotel.description,
        "rating": hotel.rating,

        "images": [img.image_url for img in hotel.images],

        "rooms": [
            {
                "id": room.id,
                "number": room.number,
                "price": room.price,
                "capacity": room.capacity,
                "is_available": room.is_available,
                "images": [img.image_url for img in room.images],
                "amenities": [a.name for a in room.amenities]
            }
            for room in hotel.rooms
        ]
    }
# ================= Get Room Details =================
@router.get("/rooms/{room_id}")
def get_room_details(room_id: int, db: Session = Depends(get_db)):

    room = db.query(Room).filter(Room.id == room_id).first()

    if not room:
        raise HTTPException(404, "Room not found")

    return {
        "id": room.id,
        "number": room.number,
        "price": room.price,
        "capacity": room.capacity,
        "is_available": room.is_available,

        "hotel": {
            "id": room.hotel.id,
            "name": room.hotel.name,
            "location": room.hotel.location,
        },

        "images": [img.image_url for img in room.images],
        "amenities": [a.name for a in room.amenities]
    }

@router.delete("/hotels/images")
def delete_hotel_image(data: dict, db: Session = Depends(get_db)):
    image_url = data.get("image_url")

    image = db.query(HotelImage).filter(HotelImage.image_url == image_url).first()

    if not image:
        raise HTTPException(404, "Image not found")

    db.delete(image)
    db.commit()

    return {"message": "Deleted"}
# ======================search =============================
@router.get("/")
def search_hotels(
    location: str = Query(None),
    min_price: int = Query(None),
    max_price: int = Query(None),
    capacity: int = Query(None),
    check_in: date = Query(None),
    check_out: date = Query(None),
    db: Session = Depends(get_db)
):

    query = db.query(Hotel).join(Room)

    # 🔎 filters
    if location:
        query = query.filter(Hotel.location.ilike(f"%{location}%"))

    if capacity:
        query = query.filter(Room.capacity >= capacity)

    if min_price:
        query = query.filter(Room.price >= min_price)

    if max_price:
        query = query.filter(Room.price <= max_price)

    # 🔥 availability filter
    if check_in and check_out:

        subquery = db.query(Booking.room_id).filter(
            Booking.status == BookingStatus.confirmed,
            Booking.check_in < check_out,
            Booking.check_out > check_in
        )

        query = query.filter(~Room.id.in_(subquery))

    hotels = query.distinct().all()

    return [
        {
            "id": h.id,
            "name": h.name,
            "location": h.location,
            "rating": h.rating
        }
        for h in hotels
    ]