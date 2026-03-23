from pydantic import BaseModel
from typing import Optional
from datetime import date

class ApplicationCreate(BaseModel):
    company: str
    role: str
    date_applied: Optional[date] = None
    status: Optional[str] = "Applied"
    notes: Optional[str] = None

class ApplicationUpdate(BaseModel):
    company: Optional[str] = None
    role: Optional[str] = None
    date_applied: Optional[date] = None
    status: Optional[str] = None
    notes: Optional[str] = None


class ApplicationResponse(BaseModel):
    id: int
    company: str
    role: str
    date_applied: Optional[date] = None
    status: Optional[str] = None
    notes: Optional[str] = None

    class Config:
        from_attributes = True