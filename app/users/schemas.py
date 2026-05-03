from pydantic import BaseModel, EmailStr, validator


class UserRegister(BaseModel):
    username: str
    email: EmailStr
    password: str
    confirm_password: str
    phone: str

    @validator("confirm_password")
    def passwords_match(cls, v, values):
        if "password" in values and v != values["password"]:
            raise ValueError("Passwords do not match")
        return v


class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserUpdate(BaseModel):
    username: str | None = None
    email: EmailStr | None = None
    phone: str | None = None