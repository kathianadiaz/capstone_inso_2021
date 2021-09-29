import models

from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
from database import engine, get_db
from user import UserCreate, User
from user.repository import UserRepository
from organization import Organization
from organization.repository import OrganizationRepository

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
def get_user(id: str, db: Session = Depends(get_db)):
    user = UserRepository.get_user(db, id)

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user

@app.post("/organization", response_model=Organization)
def create_organization(organization: Organization, db: Session = Depends(get_db)):
    # TODO: add authentication dependency
    return OrganizationRepository.add_organization(organization, db)

@app.get("/organization", response_model=List[Organization])
def get_organizations(db: Session = Depends(get_db)):
    return OrganizationRepository.get_organizations(db)

@app.get("/organization/{id}", response_model=Organization)
def get_organization_by_id(id: str, db: Session = Depends(get_db)):
    organization = OrganizationRepository.get_organization_by_id(id,db)

    if not organization:
        raise HTTPException(status_code=404, detail="Organization not found")

    return organization

@app.delete("/organization/{id}", response_model=Organization)
def delete_organization(id: str, db: Session = Depends(get_db)):
    # TODO: add authentication
    organization = OrganizationRepository.delete_organization(id, db)

    if not organization:
        raise HTTPException(status_code=404, detail="Organization not found")

    return organization

@app.put("/organization", response_model=Organization)
def edit_organization(organization: Organization, db: Session = Depends(get_db)):
    # TODO: authentication
    organization = OrganizationRepository.edit_organization(organization, db)

    if not organization:
        raise HTTPException(status_code=404, detail="Organization not found")

    return organization