from sqlalchemy.orm import Session
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