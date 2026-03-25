from pydantic import BaseModel
from typing import Optional
from datetime import date

class ApplicationCreate(BaseModel):
    company: str
    role: str
    location: Optional[str] = None
    date_posted: Optional[date] = None
    date_applied: Optional[date] = None
    salary: Optional[str] = None
    status: Optional[str] = "Applied"
    notes: Optional[str] = None

class ApplicationUpdate(BaseModel):
    company: Optional[str] = None
    role: Optional[str] = None
    location: Optional[str] = None
    date_posted: Optional[date] = None
    date_applied: Optional[date] = None
    salary: Optional[str] = None
    status: Optional[str] = None
    notes: Optional[str] = None


class ApplicationResponse(BaseModel):
    id: int
    company: str
    role: str
    location: Optional[str] = None
    date_posted: Optional[date] = None
    date_applied: Optional[date] = None
    salary: Optional[str] = None
    status: Optional[str] = None
    notes: Optional[str] = None

    class Config:
        from_attributes = True

class UserCreate(BaseModel):
    name: str
    email: str
    password: str

class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None

class PasswordUpdate(BaseModel):
    new_password: str

class UserLogin(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    id: int
    name: str
    email: str

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
