from pydantic import BaseModel
from typing import Optional 
import uuid
from datetime import date

class JoinRequest(BaseModel):
    r_id: uuid.UUID
    o_id: uuid.UUID
    u_id: uuid.UUID
    m_id: uuid.UUID
    date: Optional[date]
    message: str

    class Config:
        orm_mode = True