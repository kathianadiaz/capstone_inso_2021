from pydantic import BaseModel
import uuid

from sqlalchemy.sql.sqltypes import Integer

class UserBase(BaseModel):
    '''Base user class'''
    name: str
    username: str
    email: str
    # phonenumber: str

class UserCreate(UserBase):
    ''' Newly created user to be added to database. Password is not hashed'''
    password: str

class User(UserBase):
    '''User entity plus its respective id. SQL user table entry can be parsed as this class'''
    u_id: uuid.UUID

    class Config:
        orm_mode = True

class UserInDB(User):
    '''User retrieved from database. Password is hashed. SQL user table entry can be parsed as this class'''
    password: str
