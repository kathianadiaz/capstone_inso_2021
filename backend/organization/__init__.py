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
    resume: Optional[str] #TODO: find data type for BYTEA
    picture: Optional[str] #TODO: find data type for BYTEA

    class Config:
        orm_mode = True

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
    email: str
    description: Optional[str]
    tags: List[str] = []
    department: Optional[str]
    status: Optional[bool] = False
    highlights: List[OrganizationHighlight] = []
    members: List[MemberInformation] = []
    administrators: List[User] = []

    class Config:
        orm_mode = True
