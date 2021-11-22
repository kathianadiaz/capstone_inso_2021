from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from fastapi.responses import StreamingResponse
from user import UserCreate, User, UserBase
from user.repository import UserRepository
from user.services.file_upload import UserImage
from organization import MemberInformation
from authentication.authentication import get_current_user
from database import get_db
from sqlalchemy.orm import Session
from typing import List
from io import BytesIO

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

@router.put("", response_model=User)
def edit_user(new_user: UserBase, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return UserRepository.edit_user(user.u_id,new_user,db)

# @router.get("/profile", response_model=User)
# def get_user_profile(user: User = Depends(get_current_user)):
    # return user

@router.post("/member-information", response_model=User)
def create_member_information(member_information: MemberInformation, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return UserRepository.create_member_information(member_information,user,db)

@router.post("/image")
def upload_image(image: UploadFile = File(...), user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not UserImage.upload_image(user.u_id,image,db):
        raise HTTPException(status_code=404, detail="user not found")
    return {"message":"File uploaded"}

@router.get("/{u_id}/image")
def download_image(u_id: str, db: Session = Depends(get_db)):
    data = UserImage.download_image(u_id,db)

    if not data:
        raise HTTPException(status_code=404, detail="file not found")

    memfile = BytesIO(data['data'])

    response = StreamingResponse(memfile, media_type=f'{data["content_type"]}')
    response.headers["Content-Disposition"] = f"inline; filename={data['filename']}"
    return response
