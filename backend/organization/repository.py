from sqlalchemy.orm import Session
from organization import Organization
import models

class OrganizationRepository:
    '''Repository for `Organization` agregate'''

    @staticmethod
    def add_organization(organization: Organization, db: Session) -> Organization:
        '''Add a `Organization` to the repository'''
        db_organization = models.Organization(name=organization.name, description=organization.description, tags=organization.tags, department=organization.department, status=organization.status)
        db.add(db_organization)
        db.commit()
        db.refresh(db_organization)
        return db_organization

    @staticmethod
    def get_organizations(db: Session, skip: int = 0, limit: int = 25)-> List[Organization]:
        '''Get a list of all organizations. The returned list is bounded by the values of skip and limit'''
        return db.query(models.Organization).offset(skip).limit(limit).all()

    @staticmethod
    def get_organization_by_id(o_id: str, db: Session) -> Organization:
        '''Get an `Organization` given a specific id'''
        return db.query(models.Organization).filter(models.Organization.o_id == o_id).first()

    @staticmethod
    def get_organizations_by_department(department: str, db: Session, skip: int = 0, limit: int = 25) -> List[Organization]:
        '''Get a list of organizations that belong to a specific department'''
        return db.query(models.Organization).filter(models.Organization.department == department).offset(skip).limit(limit).all()

    @staticmethod
    def get_recruting_organizations(db: Session, skip: int = 0, limit: int = 25) -> List[Organization]:
        '''Get a list of organizations that have toggled their recreting status to `True`'''
        return db.query(models.Organization).filter(models.Organization.status == True).offset(skip).limit(limit).all()

    @staticmethod
    def get_organizations_by_user(u_id: str, db: Session, skip: int = 0, limit: int = 25) -> List[Organization]:
        '''Get all the organizations that belong to a specific user'''
        pass