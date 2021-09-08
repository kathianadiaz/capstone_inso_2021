import models

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import engine, get_db

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
