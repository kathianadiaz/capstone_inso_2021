from fastapi import UploadFile
from typing import Optional,List
from sqlalchemy.orm import Session
from sqlalchemy.sql import Select,select
from organization import Organization, OrganizationHighlight, MemberInformation
from user import User
import models
import uuid

class UserImage:
    @staticmethod
    def upload_image(u_id: str, image: UploadFile, db: Session):
        db_user = db.query(models.User).filter(models.User.u_id == u_id)

        db_image= models.Image(i_id=uuid.uuid4() ,data=image.file.read(), filename=image.filename, content_type=image.content_type)
        db.add(db_image)
        db_user.i_id = db_image.i_id

        db.commit()

    @staticmethod
    def download_image(u_id: str, db: Session):
        db_user = db.query(models.User).filter(models.User.u_id == u_id)
        db_image= db.query(models.Image).filter(models.Image.i_id == db_image.i_id).first()

        if not db_image:
            return None

        return {'filename':db_image.filename, 'data':db_image.data, 'content_type':db_image.content_type}