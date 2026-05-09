from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.users.models import User
from app.users.schemas import UserRegister, UserLogin, UserUpdate
from app.core.security import (
    get_current_user,
    hash_password,
    verify_password,
    create_access_token
)

router = APIRouter(prefix="/users", tags=["Users"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ================= REGISTER =================
@router.post("/register")
def register(user: UserRegister, db: Session = Depends(get_db)):

    if db.query(User).filter(User.email == user.email).first():
        raise HTTPException(400, "Email already exists")

    if db.query(User).filter(User.phone == user.phone).first():
        raise HTTPException(400, "Phone already exists")

    new_user = User(
        username=user.username,
        first_name=user.first_name,
        last_name=user.last_name,
        email=user.email,
        password=hash_password(user.password),
        phone=user.phone,
        role="customer"
    )

    db.add(new_user)
    db.commit()

    return {"message": "User created successfully"}


# ================= LOGIN =================
@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):

    db_user = db.query(User).filter(User.email == user.email).first()

    if not db_user:
        raise HTTPException(401, "Invalid credentials")

    if not verify_password(user.password, db_user.password):
        raise HTTPException(401, "Invalid credentials")

    if not db_user.is_active:
        raise HTTPException(403, "User is inactive")

    token = create_access_token({
        "user_id": db_user.id,
        "role": db_user.role.value
    })

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": db_user.id,
            "username": db_user.username,
            "email": db_user.email,
            "first_name": db_user.first_name,
            "last_name": db_user.last_name,
            "phone": db_user.phone,
            "role": db_user.role.value
        }
    }

@router.get("/profile")
def get_profile(current_user=Depends(get_current_user), db: Session = Depends(get_db)):
    return current_user

@router.put("/profile")
def update_profile(
    data: UserUpdate,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(User.id == current_user.id).first()

    user.first_name = data.first_name
    user.last_name = data.last_name
    user.email = data.email

    db.commit()
    db.refresh(user)

    return user

from datetime import datetime

@router.delete("/profile")
def delete_profile(
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(User.id == current_user.id).first()

    user.is_deleted = True
    user.deleted_at = datetime.utcnow()

    db.commit()

    return {"message": "Account scheduled for deletion"}

from datetime import datetime, timedelta

def delete_expired_users(db: Session):
    limit = datetime.utcnow() - timedelta(days=30)

    users = db.query(User).filter(
        User.is_deleted == True,
        User.deleted_at < limit
    ).all()

    for u in users:
        db.delete(u)

    db.commit()