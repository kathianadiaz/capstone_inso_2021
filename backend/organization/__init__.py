from pydantic import BaseModel
from typing import Optional, List
import uuid
from datetime import date

class OrganizationHighlight(BaseModel):
    '''Organization Highlight used for events and milestones of a given organization'''
    oh_id: Optional[uuid.UUID]
    date: Optional[date]
    title: str
    description: str
    attachment: Optional[str] #TODO: find python type for blob

    class Config:
        orm_mode = True

class OrganizationCalendar(BaseModel):
    pass

class Organization(BaseModel):
    '''Organization class'''
    o_id: Optional[uuid.UUID]
    name: str
    description: Optional[str]
    tags: List[str] = []
    department: Optional[str]
    status: Optional[bool]
    highlights: List[OrganizationHighlight] = []

    class Config:
        orm_mode = True
