from fastapi import UploadFile
from typing import Optional,List
from sqlalchemy.orm import Session
from sqlalchemy.sql import Select,select
from organization import Organization, OrganizationHighlight, MemberInformation
from user import User
import models
import uuid

class OrganizationImage:
    @staticmethod
    def upload_image(o_id: str, u_id: str, image: UploadFile, db: Session):
        db_organization = db.query(models.Organization).\
            join(models.organization_administrator_assoc_table).\
            filter(models.organization_administrator_assoc_table.columns.user_id == u_id).\
            filter(models.organization_administrator_assoc_table.columns.organization_id == o_id).\
            first()

        if not db_organization:
            return None

        db_image= models.Image(i_id=uuid.uuid4() ,data=image.file.read(), filename=image.filename, content_type=image.content_type)
        db.add(db_image)
        db_organization.i_id = db_image.i_id

        db.commit()

        return db_organization

    @staticmethod
    def download_image(o_id: str, db: Session):
        db_organization = db.query(models.Organization).filter(models.Organization.o_id == o_id).first()
        db_image= db.query(models.Image).filter(models.Image.i_id == db_organization.i_id).first()

        if not db_image:
            return None

        return {'filename':db_image.filename, 'data':db_image.data, 'content_type':db_image.content_type}

class HighlightAttachment:
    @staticmethod
    def upload_highlight_attachment(oh_id:str, o_id:str, u_id: str, file: UploadFile, db: Session):
        db_organization = db.query(models.Organization).\
            join(models.organization_administrator_assoc_table).\
            filter(models.organization_administrator_assoc_table.columns.user_id == u_id).\
            filter(models.organization_administrator_assoc_table.columns.organization_id == o_id).\
            first()

        if not db_organization:
            return None

        db_attachment = models.Attachment(a_id=uuid.uuid4() ,data=file.file.read(), filename=file.filename, content_type=file.content_type)
        db.add(db_attachment)

        db_org_highlight = db.query(models.OrganizationHighlight).filter(models.OrganizationHighlight.oh_id == oh_id).first()
        db_org_highlight.a_id = db_attachment.a_id

        db.commit()
        return db_org_highlight

    @staticmethod
    def download_highlight_attachment(oh_id: str, db: Session):
        db_org_highlight = db.query(models.OrganizationHighlight).filter(models.OrganizationHighlight.oh_id == oh_id).first()
        db_attachment = db.query(models.Attachment).filter(models.Attachment.a_id == db_org_highlight.a_id).first()
        return {'filename':db_attachment.filename, 'data':db_attachment.data, 'content_type':db_attachment.content_type}

class MemberInformationAttachment:
    @staticmethod
    def upload_resume(m_id: str, resume: UploadFile, db: Session):
        db_member_info = db.query(models.MemberInformation).\
            filter(models.MemberInformation.m_id == m_id).\
            first()

        if not db_member_info:
            return None

        db_attachment = models.Attachment(a_id=uuid.uuid4() ,data=resume.file.read(), filename=resume.filename, content_type=resume.content_type)
        db.add(db_attachment)
        db_member_info.a_id = db_attachment.a_id 
        db.commit()

        return db_member_info

    @staticmethod
    def download_resume(m_id: str, db: Session):
        db_member_info= db.query(models.MemberInformation).filter(models.MemberInformation.m_id== m_id).first()
        db_attachment = db.query(models.Attachment).filter(models.Attachment.a_id == db_member_info.a_id).first()

        if not db_attachment:
            return None

        return {'filename':db_attachment.filename, 'data':db_attachment.data, 'content_type':db_attachment.content_type}

    @staticmethod
    def upload_image(m_id: str, image: UploadFile, db: Session):
        db_member_info = db.query(models.MemberInformation).\
            filter(models.MemberInformation.m_id == m_id).\
            first()

        if not db_member_info:
            return None

        db_image= models.Image(i_id=uuid.uuid4() ,data=image.file.read(), filename=image.filename, content_type=image.content_type)
        db.add(db_image)
        db_member_info.i_id = db_image.i_id 
        db.commit()

        return db_member_info

    @staticmethod
    def download_image(m_id: str, db: Session):
        db_member_info= db.query(models.MemberInformation).filter(models.MemberInformation.m_id== m_id).first()
        db_image= db.query(models.Image).filter(models.Image.i_id == db_member_info.i_id).first()

        if not db_image:
            return None

        return {'filename':db_image.filename, 'data':db_image.data, 'content_type':db_image.content_type}