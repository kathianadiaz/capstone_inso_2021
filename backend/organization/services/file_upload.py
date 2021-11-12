from fastapi import UploadFile
from typing import Optional,List
from sqlalchemy.orm import Session
from sqlalchemy.sql import Select,select
from organization import Organization, OrganizationHighlight, MemberInformation
from user import User
import models
import uuid

def upload_highlight_attachment(oh_id:str, file: UploadFile, db: Session):
    db_attachment = models.Attachment(data=file.file.read(), filename=file.filename, content_type=file.content_type, oh_id=oh_id)
    db.add(db_attachment)
    db.commit()

def download_highlight_attachment(oh_id: str, db: Session):
    db_attachment = db.query(models.Attachment).filter(models.Attachment.oh_id == oh_id).first()
    return {'filename':db_attachment.filename, 'data':db_attachment.data, 'content_type':db_attachment.content_type}