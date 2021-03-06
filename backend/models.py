from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Date, Boolean, Date, Table, Identity
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
    password = Column(String)
    phone_number = Column(String,unique=True)
    m_id= Column(UUID(as_uuid=True), ForeignKey('member_information.m_id'), nullable=True) 
    i_id = Column(UUID(as_uuid=True), ForeignKey('image.i_id'))

    member_information= relationship("MemberInformation", back_populates="user" )


organization_members_assoc_table = Table('org_member_association', Base.metadata,
    Column('member_info_id', ForeignKey('member_information.m_id'), primary_key=True),
    Column('organization_id', ForeignKey('organization.o_id'), primary_key=True)
)

organization_administrator_assoc_table = Table('org_administrator_association', Base.metadata,
    Column('user_id', ForeignKey('user.u_id'), primary_key=True),
    Column('organization_id', ForeignKey('organization.o_id'), primary_key=True)
)

class MemberInformation(Base):
    __tablename__ = "member_information"

    m_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4, nullable=False)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    links = Column(ARRAY(String))
    a_id = Column(UUID(as_uuid=True), ForeignKey('attachment.a_id'))
    i_id = Column(UUID(as_uuid=True), ForeignKey('image.i_id'))
    user= relationship("User", back_populates="member_information", uselist=False)

class OrganizationHighlight(Base):
    __tablename__ = "organization_highlight"

    oh_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4, nullable=False)
    date = Column(Date, default=datetime.date.today())
    title = Column(String, nullable=False)
    description = Column(String)
    o_id = Column(UUID(as_uuid=True), ForeignKey('organization.o_id'))
    a_id = Column(UUID(as_uuid=True), ForeignKey('attachment.a_id'))

class Attachment(Base):
    __tablename__ = "attachment"

    a_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4, nullable=False)
    data= Column(BYTEA)
    filename = Column(String)
    content_type = Column(String)

class Image(Base):
    __tablename__ = "image"

    i_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4, nullable=False)
    data= Column(BYTEA)
    filename = Column(String)
    content_type = Column(String)

class Organization(Base):
    __tablename__ = "organization"

    o_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4, nullable=False)
    name = Column(String, nullable=False)
    email = Column(String, unique=True)
    description = Column(String)
    tags = Column(ARRAY(String))
    department = Column(String)
    status = Column(Boolean, default=False, nullable=False)
    highlights = relationship('OrganizationHighlight', cascade="all, delete")
    administrators = relationship('User',  secondary=organization_administrator_assoc_table)
    members = relationship('MemberInformation', secondary=organization_members_assoc_table)
    i_id = Column(UUID(as_uuid=True), ForeignKey('image.i_id'))

class JoinRequest(Base):
    __tablename__ = "join_request"

    r_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4, nullable=False)
    o_id = Column(UUID(as_uuid=True), ForeignKey('organization.o_id'))
    u_id = Column(UUID(as_uuid=True), ForeignKey('user.u_id'))
    m_id = Column(UUID(as_uuid=True), ForeignKey('member_information.m_id'))
    date = Column(Date, default=datetime.date.today())
    name = Column(String)
    message = Column(String, nullable=False)