from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Date, Boolean, Date
from sqlalchemy.dialects.postgresql import UUID, ARRAY, BYTEA
from sqlalchemy.orm import backref, relationship
from database import Base
from uuid import uuid4
import datetime

class User(Base):
    __tablename__ = "user"

    u_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4, nullable=False)
    name = Column(String)
    username = Column(String, unique=True)
    email = Column(String, unique=True)
    # phonenumber = Column(String,unique=True)
    password = Column(String)
    #TODO: add phone number
    administrators = relationship('Administrator', back_populates='user', cascade="all, delete")

class OrganizationHighlight(Base):
    __tablename__ = "organization_highlight"

    oh_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4, nullable=False)
    date = Column(Date, default=datetime.date.today())
    title = Column(String, nullable=False)
    description = Column(String)
    attachment = Column(BYTEA)
    o_id = Column(UUID(as_uuid=True), ForeignKey('organization.o_id'))

class Organization(Base):
    __tablename__ = "organization"

    o_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4, nullable=False)
    name = Column(String, nullable=False)
    description = Column(String)
    tags = Column(ARRAY(String))
    department = Column(String)
    status = Column(Boolean, default=False, nullable=False)
    highlights = relationship('OrganizationHighlight', cascade="all, delete")
    administrators = relationship('Administrator', back_populates='organization', cascade="all, delete")

class Administrator(Base):
    __tablename__ = "administrator"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4, nullable=False)
    o_id = Column(UUID(as_uuid=True), ForeignKey('organization.o_id'))
    u_id = Column(UUID(as_uuid=True), ForeignKey('user.u_id'))

    organization = relationship('Organization', uselist=False, back_populates="administrators")
    user= relationship('User', uselist=False, back_populates="administrators")




