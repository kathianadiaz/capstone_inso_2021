from typing import Optional,List, Set
from sqlalchemy.orm import Session
from sqlalchemy.sql import Select,select
from sqlalchemy import func
from organization import Organization, OrganizationHighlight, MemberInformation
from user import User
import models
import uuid

class OrganizationRepository:
    '''Repository for `Organization` agregate'''

    @staticmethod
    def add_organization(organization: Organization, user: User, db: Session) -> Organization:
        '''Add a `Organization` to the repository'''
        db_organization = models.Organization(o_id=uuid.uuid4() ,name=organization.name, description=organization.description, tags=organization.tags, department=organization.department, status=organization.status, email = organization.email)
        db_user = db.query(models.User).filter(models.User.u_id == user.u_id).first()

        db_organization.administrators.append(db_user)

        db.add(db_organization)
        for highlight in organization.highlights:
            db.add(models.OrganizationHighlight(title=highlight.title, description=highlight.description, o_id=db_organization.o_id))

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
    def get_organizations_by_administrator(u_id: str, db: Session, skip: int = 0, limit: int = 25) -> List[Organization]:
        '''Get all the organizations that belong to a specific user'''
        return db.query(models.Organization).\
            join(models.organization_administrator_assoc_table).\
            filter(models.organization_administrator_assoc_table.columns.user_id == u_id).all()

    @staticmethod
    def get_organizations_by_keywords(keywords:str, db:Session, skip: int = 0, limit: int = 25) -> Set[Organization]:
        '''Get all organizations that contain a specific keyword in their description or name'''
        keywords = keywords.split(',')
        organizations=set()
        for keyword in keywords:
            keyword.lower()
            organizations.update(db.query(models.Organization).filter(models.Organization.name.contains(f'%{keyword}%')).offset(skip).limit(limit).all())
            organizations.update(db.query(models.Organization).filter(models.Organization.description.contains(f'%{keyword}%')).offset(skip).limit(limit).all())
            
        return list(organizations) if len(organizations) > 0 else None

    @staticmethod
    def get_organizations_by_tags(tags:str, db: Session, skip: int = 0, limit: int = 25) -> List[Organization]:
        '''Get all organizations that contain the given tags'''
        tags = tags.split(',')
        organizations = set()
        for tag in tags:
            tag.lower()
            organizations.update(db.query(models.Organization).filter(models.Organization.tags.contains([tag])).offset(skip).limit(limit).all())
        return list(organizations) if len(organizations) > 0 else None
    
    @staticmethod
    def search_organizations(keywords:str, tags:str, db: Session, skip: int = 0, limit: int = 25) -> List[Organization]:
        '''Get all organizations that contain the given tags and keywords'''
        if keywords:
            org_list_keywords = OrganizationRepository.get_organizations_by_keywords(keywords, db)

        if tags:
            org_list_tags = OrganizationRepository.get_organizations_by_keywords(tags, db)
        
        if org_list_keywords and org_list_tags:
            org_list = list(set(org_list_keywords) | set(org_list_tags))
        elif org_list_tags:
            org_list = org_list_tags
        elif org_list_keywords:
            org_list = org_list_keywords
        else:
            return None

        return org_list

    @staticmethod
    def delete_organization(o_id: str, user: User, db: Session) -> Optional[Organization]:
        '''Delete a specific `Organization` with the give id'''
        db_organization = db.query(models.Organization).\
            join(models.organization_administrator_assoc_table).\
            filter(models.organization_administrator_assoc_table.columns.user_id == user.u_id).\
            filter(models.organization_administrator_assoc_table.columns.organization_id == o_id).\
            first()

        if not db_organization:
            return None

        organization = Organization.from_orm(db_organization)

        db.delete(db_organization)
        db.commit()

        return organization

    @staticmethod
    def edit_organization(o_id: str, new_organization: Organization, user: User, db: Session) -> Optional[Organization]:
        '''Edit the information for a specific `Organization`'''
        organization = db.query(models.Organization).\
            join(models.organization_administrator_assoc_table).\
            filter(models.organization_administrator_assoc_table.columns.user_id == user.u_id).\
            filter(models.organization_administrator_assoc_table.columns.organization_id == o_id).\
            first()

        if not organization:
            return None


        setattr(organization,"name",new_organization.name)
        setattr(organization,"description",new_organization.description)
        setattr(organization,"tags",new_organization.tags)
        setattr(organization,"status",new_organization.status)
        setattr(organization,"highlights",new_organization.highlights)

        db.commit()

        return new_organization

    # NOTE: Is there a way to implement this interface in a more idiomatic way such as my_orga.add_highlight(my_highlight) ?
    @staticmethod
    def add_highlight(highlight: OrganizationHighlight, o_id: str, user: User, db: Session) -> Optional[Organization]: 
        '''Add a `OrganizationHighlight` to a specific `Organization`'''
        organization = db.query(models.Organization).\
            join(models.organization_administrator_assoc_table).\
            filter(models.organization_administrator_assoc_table.columns.user_id == user.u_id).\
            filter(models.organization_administrator_assoc_table.columns.organization_id == o_id).\
            first()

        if not organization:
            return None

        db_highlight = models.OrganizationHighlight(title=highlight.title, description=highlight.description, date = highlight.date)
        organization.highlights.append(db_highlight)
        db.commit()

        return organization

    @staticmethod
    def delete_highlight(o_id:str, oh_id: str, user: User, db: Session) -> Organization:
        '''Delete a specific `OrganizationHighlight` from an `Organization`'''
        organization = db.query(models.Organization).\
            join(models.organization_administrator_assoc_table).\
            filter(models.organization_administrator_assoc_table.columns.user_id == user.u_id).\
            filter(models.organization_administrator_assoc_table.columns.organization_id == o_id).\
            first()

        high_light = db.query(models.OrganizationHighlight).\
            filter(models.OrganizationHighlight.o_id == o_id).\
            filter(models.OrganizationHighlight.oh_id == oh_id).\
            first()

        if not high_light or not organization:
            return None

        db.delete(high_light)
        db.commit()

        return organization

    @staticmethod
    def add_member_information(o_id: str, member_info: MemberInformation, db: Session) -> MemberInformation:
        db_member_information = models.MemberInformation(m_id=uuid.uuid4(), name=member_info.name, email=member_info.email, links=member_info.links)
        # db.add(db_member_information)

        db_organization = db.query(models.Organization).filter(models.Organization.o_id == o_id).first()
        db_organization.members.append(db_member_information)
        db.commit()

        return db_member_information

    @staticmethod
    def get_organization_by_member(m_id: Optional[str], db: Session) -> List[Organization]:
        if not m_id:
            return []
        
        organizations = db.query(models.Organization).\
            join(models.organization_members_assoc_table).\
            filter(models.organization_members_assoc_table.columns.member_info_id == m_id).\
            all()

        return organizations

    @staticmethod
    def connect_user_to_organization(o_id: str, m_id: str, user: User, db: Session) -> Organization:
        '''Connect the member information attached to a user to an organization'''
        #Verify that organization belongs to administrator
        db_organization = db.query(models.Organization).\
            join(models.organization_administrator_assoc_table).\
            filter(models.organization_administrator_assoc_table.columns.user_id == user.u_id).\
            filter(models.organization_administrator_assoc_table.columns.organization_id == o_id).\
            first()
        db_member_info = db.query(models.MemberInformation).filter(models.MemberInformation.m_id == m_id).first()

        if not db_member_info or not db_organization:
            return None

        db_organization.members.append(db_member_info)
        db.commit()

        return db_organization

    @staticmethod
    def get_member_info(m_id: str, db: Session) -> MemberInformation:
        db_member_info = db.query(models.MemberInformation).filter(models.MemberInformation.m_id == m_id).first()

        if not db_member_info:
            return None

        return db_member_info






