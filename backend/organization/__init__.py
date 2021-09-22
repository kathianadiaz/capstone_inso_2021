from pydantic import BaseModel
from typing import Optional, List
import uuid

class Organization(BaseModel):
    '''Organization class'''
    o_id: uuid.UUID
    name: str
    description: Optional[str]
    tags: List[str]
    department: Optional[str]