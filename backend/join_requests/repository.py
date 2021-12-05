from sqlalchemy.orm import Session
from join_requests import JoinRequest
from datetime import date
import models
from organization.repository import OrganizationRepository
from user import User

class JoinRequestRepository:

    @staticmethod
    def get_join_requests(o_id: str, u_id: str, db: Session):
        organization = db.query(models.Organization).\
            join(models.organization_administrator_assoc_table).\
            filter(models.organization_administrator_assoc_table.columns.user_id == u_id).\
            filter(models.organization_administrator_assoc_table.columns.organization_id == o_id).\
            first()

        if not organization:
            return None

        join_requests = db.query(models.JoinRequest).filter(models.JoinRequest.o_id == o_id).all()

        return join_requests

    @staticmethod
    def add_join_request(mesage: str, o_id: str, user: User, db: Session) -> JoinRequest:
        db_join_request = models.JoinRequest(name=user.name, message=mesage, o_id=o_id, u_id=user.u_id, m_id=user.m_id)
        db_request = db.query(models.JoinRequest).filter(models.JoinRequest.o_id == o_id).first()

        if(db_request == None):
            db.add(db_join_request)
            db.commit()
            db.refresh(db_join_request)
        else:
            db.delete(db_request)
            db.add(db_join_request)
            db.commit()
            db.refresh(db_join_request)

        return db_join_request

    @staticmethod
    def respond_to_join_request(accept: bool, o_id: str, r_id: str, user: User, db: Session):
        organization = db.query(models.Organization).\
            join(models.organization_administrator_assoc_table).\
            filter(models.organization_administrator_assoc_table.columns.user_id == user.u_id).\
            filter(models.organization_administrator_assoc_table.columns.organization_id == o_id).\
            first()
        
        db_request = db.query(models.JoinRequest).filter(models.JoinRequest.r_id == r_id).first()

        if not organization or not db_request:
            return None

        if accept:
           OrganizationRepository.connect_user_to_organization(organization.o_id, db_request.m_id, user, db)

        db.delete(db_request)
        db.commit()
        

