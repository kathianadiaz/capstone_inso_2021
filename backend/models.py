from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Date
# from sqlalchemy.dialects.postgresql import ARRAY

from database import Base

class User(Base):
    __tablename__ = "users"

    u_id = Column(Integer, primary_key=True)
    name: Column(String)
    username: Column(String, unique=True)
    email: Column(String, unique=True)
    password: Column(String)
