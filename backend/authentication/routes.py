from fastapi import APIRouter, Depends, HTTPException, status
from database import get_db
from sqlalchemy.orm import Session
from typing import List
from authentication.authentication import Token, OAuth2PasswordRequestForm, authenticate_user, ACCESS_TOKEN_EXPIRE_MINUTES, create_access_token, get_current_user
from datetime import timedelta
from user.repository import UserRepository
from user import UserCreate, User

router = APIRouter(
    tags=["authentication"]
)

@router.post("/token", response_model=Token)
def signup(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(db, form_data.username, form_data.password)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"}
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    # response.set_cookie(key="access_token",value=f"Bearer {access_token}", httponly=True)
    return {"access_token": access_token, "token_type": "Bearer", "user": user}

@router.post("/register", response_model=User)
def register(user: UserCreate, db: Session = Depends(get_db)):
    if UserRepository.user_already_exists(db, user.username, user.email):
        raise HTTPException(status_code=400, detail="Email or username already registered")
    else:
        return UserRepository.add_user(db, user)