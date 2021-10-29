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
    def edit_organization(new_organization: Organization, user: User, db: Session) -> Optional[Organization]:
        '''Edit the information for a specific `Organization`'''
        administrator = db.query(models.Administrator).\
            filter(models.Administrator.u_id == user.u_id).\
            filter(models.Administrator.o_id == new_organization.o_id).\
            first()

        if not administrator:
            return None

        # NOTE: error prone. There might be a better way to implement it
        administrator.organization.name = new_organization.name
        administrator.organization.description = new_organization.description
        administrator.organization.tags = new_organization.tags
        administrator.organization.status = new_organization.status
        administrator.organization.highlight = new_organization.highlights
        db.commit()

        return new_organization

    # NOTE: Is there a way to implement this interface in a more idiomatic way such as my_orga.add_highlight(my_highlight) ?
    @staticmethod
    def add_highlight(highlight: OrganizationHighlight, o_id: str, user: User, db: Session) -> Optional[Organization]: 
        '''Add a `OrganizationHighlight` to a specific `Organization`'''
        #NOTE: dont know if this is the best way to do it
        administrator = db.query(models.Administrator).\
            filter(models.Administrator.u_id == user.u_id).\
            filter(models.Administrator.o_id == o_id).\
            first()

        if not administrator:
            return None

        db_highlight = models.OrganizationHighlight(title=highlight.title, description=highlight.description, o_id=o_id)
        db.add(db_highlight)
        db.commit()

        return OrganizationRepository.get_organization_by_id(o_id, db)
    
    @staticmethod
    def delete_highlight(o_id:str, oh_id: str, user: User, db: Session) -> Organization:
        '''Delete a specific `OrganizationHighlight` from an `Organization`'''
        #TODO: there must be a better way to do this
        administrator = db.query(models.Administrator).\
            filter(models.Administrator.u_id == user.u_id).\
            filter(models.Administrator.o_id == o_id).\
            first()

        high_light = db.query(models.OrganizationHighlight).\
            filter(models.OrganizationHighlight.o_id == o_id).\
            filter(models.OrganizationHighlight.oh_id == oh_id).\
            first()

        if not high_light or not administrator:
            return None

        db.delete(high_light)
        db.commit()

        return OrganizationRepository.get_organization_by_id(o_id, db)

