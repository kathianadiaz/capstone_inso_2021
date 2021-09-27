from pydantic import BaseModel
from typing import Optional, List
import uuid
from datetime import date

class Organization(BaseModel):
    '''Organization class'''
    o_id: uuid.UUID
    name: str
    description: Optional[str]
    tags: List[str]
    department: Optional[str]
    status: bool

    class Config:
        orm_mode = True

class OrganizationHighlights(BaseModel):
    '''Organization Highlight used for events and milestones of a given organization'''
    oh_id: str
    date: date
    title: str
    description: str
    attachment: Optional[str] #TODO: find python type for blob

class OrganizationCalendar(BaseModel):
    pass

