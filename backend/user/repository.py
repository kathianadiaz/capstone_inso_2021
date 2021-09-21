from sqlalchemy.orm import Session
from sqlalchemy.dialects.postgresql import insert
from user import UserCreate, User
import models

class UserRepository:
    '''Repository to perform CRUD operations on the `User` class in the database'''

    @staticmethod
    def add_user(db: Session, user: UserCreate) -> User:
        '''Add a `User` to the repository given a `UserCreate`'''
        #TODO: hash password
        db_user = models.User(name=user.name, username=user.username, email=user.email, password=user.password)
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user

    @staticmethod
    def get_user(db: Session, user_id: str) -> User:
        '''Get a `User` with a specific id. If no user is found None is returned.'''
        return db.query(models.User).filter(models.User.u_id == user_id).first()

    @staticmethod
    def get_user_by_username(db: Session, username: str) -> User:
        '''Return a `User` give a specific username'''
        return db.query(models.User).filter(models.User.username == username).first()

    @staticmethod
    def user_already_exists(db: Session, username: str, email: str) -> bool:
        '''Returns `True` if a user already exists. A duplicate User is considere as a user that contains the same email and username'''
        user = db.query(models.User).filter(models.User.username == username and models.User.email == email).first()
        if user:
            return True
        else:
            return False