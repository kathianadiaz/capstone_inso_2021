from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Date, Boolean 
from sqlalchemy.dialects.postgresql import UUID, ARRAY
from sqlalchemy.orm import relationship
from database import Base
from uuid import uuid4

class User(Base):
    __tablename__ = "user"

    u_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4, nullable=False)
    name = Column(String)
    username = Column(String, unique=True)
    email = Column(String, unique=True)
    password = Column(String)

class Organization(Base):
    __tablename__ = "organization"

    o_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4, nullable=False)
    name = Column(String, nullable=False)
    description = Column(String)
    tags = Column(ARRAY(String))
    department = Column(String)
    status = Column(Boolean, default=False, nullable=False)
    #TODO: add foreing keys 

class Administrator(Base):
    __tablename__ = "administrator"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4, nullable=False)
    o_id = Column(UUID(as_uuid=True), ForeignKey('organization.o_id'))
    u_id = Column(UUID(as_uuid=True), ForeignKey('user.u_id'))

    organization = relationship('Organization')
    user= relationship('User')




