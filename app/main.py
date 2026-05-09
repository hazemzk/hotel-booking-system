from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.database import Base, engine
from app.core.config import ALLOWED_ORIGINS, MEDIA_DIR

# routers
from app.users.routes import router as users_router
from app.hotels.routes import router as hotels_router
from app.bookings.routes import router as bookings_router
from app.admin.routes import router as admin_router
from app.payments.routes import router as payment_router
from fastapi.staticfiles import StaticFiles




app = FastAPI(
    title="Hotel Booking API",
    description="Professional Hotel Booking System using FastAPI",
    version="1.0.0"
)


import os

if not os.path.exists(MEDIA_DIR):
    os.makedirs(MEDIA_DIR)
Base.metadata.create_all(bind=engine)
app.mount("/media", StaticFiles(directory=MEDIA_DIR), name="media")


app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(users_router)
app.include_router(hotels_router)
app.include_router(bookings_router)
app.include_router(admin_router)
app.include_router(payment_router)


@app.get("/")
def root():
    return {"message": "Hotel Booking API is running 🚀"}
