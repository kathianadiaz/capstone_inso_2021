from typing import Optional,List
from sqlalchemy.orm import Session
from sqlalchemy.sql import Select,select
from organization import Organization, OrganizationHighlight
from user import User
import models

class OrganizationRepository:
    '''Repository for `Organization` agregate'''

    @staticmethod
    def add_organization(organization: Organization, user: User, db: Session) -> Organization:
        '''Add a `Organization` to the repository'''
        db_organization = models.Organization(name=organization.name, description=organization.description, tags=organization.tags, department=organization.department, status=organization.status)
        db.add(db_organization)
        db.commit()
        db.refresh(db_organization)

        # TODO: is there a way to let sqlalchemy handle the nested objects by itself, like it does with get?
        for highlight in organization.highlights:
            db.add(models.OrganizationHighlight(title=highlight.title, description=highlight.description, o_id=db_organization.o_id))

        administrator = models.Administrator(o_id=db_organization.o_id, u_id=user.u_id)
        db.add(administrator)
        db.commit()

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
        # administrator = db.query(models.Administrator).filter(models.Administrator.u_id == u_id).all()
        # return [admin.organization for admin in administrator]
        return db.query(models.Organization).filter(models.Administrator.u_id == u_id).all()

    @staticmethod
    def get_organization_by_keyword(keywords:List[str], db:Session, skip: int = 0, limit: int = 25) -> List[Organization]:
        '''Get all organizations that conatain a specific keyword in their description or name'''
        pass

    @staticmethod
    def get_organization_by_tags(tags: List[str], db: Session, skip: int = 0, limit: int = 25) -> List[Organization]:
        '''Get all organizations that contain the given tags'''
        pass

    @staticmethod
    def delete_organization(o_id: str, user: User, db: Session) -> Optional[Organization]:
        '''Delete a specific `Organization` with the give id'''
        administrator = db.query(models.Administrator).\
            filter(models.Administrator.u_id == user.u_id).\
            filter(models.Administrator.o_id == o_id).\
            first()

        if not administrator:
            return None

        organization = Organization.from_orm(administrator.organization)
        
        db.delete(administrator.organization)
        db.commit()

        return organization

    @staticmethod
    def edit_organization(new_organization: Organization, db: Session) -> Optional[Organization]:
        '''Edit the information for a specific `Organization`'''
        # TODO: verify that organization belongs to user
        updated_organization = db.query(models.Organization).filter(models.Organization.o_id == new_organization.o_id).first()

        if not updated_organization:
            return None

        updated_organization = new_organization
        db.commit()

        return updated_organization

    # NOTE: Is there a way to implement this interface in a more idiomatic way such as my_orga.add_highlight(my_highlight) ?
    # TODO: add user authentication to verifiy that user is administrator for this specific organization
    @staticmethod
    def add_highlight(highlight: OrganizationHighlight, o_id: str, db: Session) -> Organization: 
        '''Add a `OrganizationHighlight` to a specific `Organization`'''
        db_highlight = models.OrganizationHighlight(title=highlight.title, description=highlight.description, o_id=o_id)
        db.add(db_highlight)
        db.commit()

        return OrganizationRepository.get_organization_by_id(o_id, db)

    # TODO: add user authentication to verifiy that user is administrator for this specific organization
    @staticmethod
    def delete_highlight(oh_id: str, db: Session) -> Organization:
        '''Delete a specific `OrganizationHighlight` from an `Organization`'''
        pass
