import models

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
from database import engine, get_db
from user import UserCreate, User
from user.repository import UserRepository
from organization import Organization, OrganizationHighlight
from organization.repository import OrganizationRepository
from authentication.authentication import Token, OAuth2PasswordRequestForm, authenticate_user, ACCESS_TOKEN_EXPIRE_MINUTES, create_access_token, get_current_user
from datetime import timedelta

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

@app.post("/token", response_model=Token)
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

    return {"access_token": access_token, "token_type": "Bearer"}

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
def create_organization(organization: Organization, user: User = Depends(get_current_user) ,db: Session = Depends(get_db)):
    return OrganizationRepository.add_organization(organization, user, db)

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
def delete_organization(id: str, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    organization = OrganizationRepository.delete_organization(id, user, db)

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

@app.post("/organization/{id}/highlight", response_model=Organization)
def add_organization_highlight(id: str, highlight: OrganizationHighlight, db: Session = Depends(get_db)):
    return OrganizationRepository.add_highlight(highlight,id,db)

# @app.delete("/organization/{id}/highlight", response_model=Organization)


@app.get("/my-organizations", response_model=List[Organization])
def get_administrators_organizations(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return OrganizationRepository.get_organizations_by_user(user.u_id,db)