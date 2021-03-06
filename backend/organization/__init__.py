from pydantic import BaseModel
from typing import Optional, List
import uuid
from datetime import date
from user import User

class MemberInformation(BaseModel):
    m_id: Optional[uuid.UUID]
    name: str
    email: str
    links: Optional[List[str]]

    class Config:
        orm_mode = True

class OrganizationHighlight(BaseModel):
    '''Organization Highlight used for events and milestones of a given organization'''
    oh_id: Optional[uuid.UUID]
    date: Optional[date]
    title: str
    description: str

    class Config:
        orm_mode = True

class OrganizationCalendar(BaseModel):
    pass

class Organization(BaseModel):
    '''Organization class'''
    o_id: Optional[uuid.UUID]
    name: str
    email: Optional[str]
    description: Optional[str]
    tags: List[str] = []
    department: Optional[str]
    status: Optional[bool] = False
    highlights: List[OrganizationHighlight] = []
    members: List[MemberInformation] = []
    administrators: List[User] = []

    class Config:
        orm_mode = True
