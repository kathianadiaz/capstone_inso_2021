from sqlalchemy.orm import Session
from sqlalchemy.dialects.postgresql import insert
from user import UserCreate, User, UserBase
from organization import MemberInformation
import models
from authentication import get_password_hash
import uuid

class UserRepository:
    '''Repository to perform CRUD operations on the `User` class in the database'''

    @staticmethod
    def add_user(db: Session, user: UserCreate) -> User:
        '''Add a `User` to the repository given a `UserCreate`'''
        hashed_password = get_password_hash(user.password)
        db_user = models.User(name=user.name, username=user.username, email=user.email, password=hashed_password, phone_number=user.phone_number)
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user

    @staticmethod
    def get_user(db: Session, user_id: str) -> User:
        '''Get a `User` with a specific id. If no user is found None is returned.'''
        return db.query(models.User).filter(models.User.u_id == user_id).first()

   
    @staticmethod
    def get_users(db: Session, skip: int = 0, limit: int = 100):
        '''Return all 'Users' with a limit of 100'''
        return db.query(models.User).offset(skip).limit(limit).all()

    @staticmethod
    def get_user_by_username(db: Session, username: str) -> User:
        '''Return a `User` given a specific username'''
        return db.query(models.User).filter(models.User.username == username).first()

    @staticmethod
    def get_user_by_email(db: Session, email: str):
        '''Return a `User` given a specific email'''
        return db.query(models.User).filter(models.User.email == email).first()

    @staticmethod
    def user_already_exists(db: Session, username: str, email: str) -> bool:
        '''Returns `True` if a user already exists. A duplicate User is considered as a user that contains the same email and username'''
        user = db.query(models.User).filter(models.User.username == username and models.User.email == email).first()
        if user:
            return True
        else:
            return False

    @staticmethod
    def delete_user_by_id(db: Session, user_id: int):
        '''Delete `User` given a specific id'''
        user = UserRepository.get_user(db, user_id)
        db.delete(user)
        db.commit()
        return "USER DELETED"

    @staticmethod
    def edit_user(u_id: str, new_user: UserBase, db: Session) -> User:
        '''Edit the information of a specific user'''
        old_user = db.query(models.User).filter(models.User.u_id == u_id).first()
        old_user.name = new_user.name
        old_user.phone_number = new_user.phone_number
        old_user.email = new_user.email

        db.commit()
        return old_user

    @staticmethod
    def create_member_information(member_info: MemberInformation, user: User, db: Session) -> User:
        db_member_information = models.MemberInformation(m_id=uuid.uuid4(), name=member_info.name, email=member_info.email, links=member_info.links)
        # db.add(db_member_information)
        db_user = db.query(models.User).filter(models.User.u_id== user.u_id).first()
        db_memberinfo = db.query(models.MemberInformation).filter(models.MemberInformation.m_id == user.m_id).first()
        
        if(user.m_id == None):
            db.add(db_member_information)
            db_user.member_information = db_member_information
            db.commit()
        else:
            db.delete(db_memberinfo)
            db.add(db_member_information)
            db_user.member_information = db_member_information
            db.commit()

  #   if ( db_organization.i_id == None):
        #     db_image= models.Image(i_id=uuid.uuid4() ,data=image.file.read(), filename=image.filename, content_type=image.content_type)
        #     db.add(db_image)
        #     db_organization.i_id = db_image.i_id
        #     db.commit()
        # else:
        #     db.delete(db.query(models.Image).filter(models.Image.i_id == db_organization.i_id).first())
        #     db_image= models.Image(i_id=uuid.uuid4() ,data=image.file.read(), filename=image.filename, content_type=image.content_type)
        #     db.add(db_image)
        #     db_organization.i_id = db_image.i_id
        #     db.commit()
        return db_user
