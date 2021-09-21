import models

from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import engine, get_db
from user import UserCreate, User
from user.repository import UserRepository

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins= ["http://localhost", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(bind=engine)

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/register", response_model=User)
def register(user: UserCreate, db: Session = Depends(get_db)):
    if UserRepository.user_already_exists(db, user.username, user.email):
        raise HTTPException(status_code=400, detail="Email or username already registered")
    else:
        return UserRepository.add_user(db, user)

@app.get("/user/{id}", response_model=User)
def get_user(user_id: str, db: Session = Depends(get_db)):
    user = UserRepository.get_user(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
