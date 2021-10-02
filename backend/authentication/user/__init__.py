from pydantic import BaseModel
from typing import Optional

# Pydantic schemas
class UserBase(BaseModel):
    name: str
    email: str
    username: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int

    class Config:
        orm_mode = True