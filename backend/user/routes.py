from fastapi import APIRouter, Depends, HTTPException, status
from user import UserCreate, User
from user.repository import UserRepository
from organization import MemberInformation
from authentication.authentication import get_current_user
from database import get_db
from sqlalchemy.orm import Session
from typing import List

router = APIRouter(
    prefix="/user",
    tags=["users"]
)

@router.get("", response_model=List[User])
def get_users(db: Session = Depends(get_db)):
    users = UserRepository.get_users(db)
    if not users:
        raise HTTPException(status_code=404, detail="Users not found")

    return users   

@router.get("/{id}", response_model=User)
def get_user(id: str, db: Session = Depends(get_db)):
    user = UserRepository.get_user(db, id)

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user

# @router.get("/profile", response_model=User)
# def get_user_profile(user: User = Depends(get_current_user)):
    # return user

@router.post("/member-information", response_model=User)
def create_member_information(member_information: MemberInformation, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return UserRepository.create_member_information(member_information,user,db)