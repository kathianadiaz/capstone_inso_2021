from fastapi import APIRouter, Depends, HTTPException, status
from organization import Organization, OrganizationHighlight, MemberInformation
from organization.repository import OrganizationRepository
from user import User
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from authentication.authentication import get_current_user

router = APIRouter(
    tags=["organizations"]
)

@router.post("/organization", response_model=Organization)
def create_organization(organization: Organization, user: User = Depends(get_current_user) ,db: Session = Depends(get_db)):
    return OrganizationRepository.add_organization(organization, user, db)

@router.get("/organization", response_model=List[Organization])
def get_organizations(db: Session = Depends(get_db)):
    return OrganizationRepository.get_organizations(db)

@router.get("/organization/{id}", response_model=Organization)
def get_organization_by_id(id: str, db: Session = Depends(get_db)):
    organization = OrganizationRepository.get_organization_by_id(id,db)

    if not organization:
        raise HTTPException(status_code=404, detail="Organization not found")

    return organization

@router.delete("/organization/{id}", response_model=Organization)
def delete_organization(id: str, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    organization = OrganizationRepository.delete_organization(id, user, db)

    if not organization:
        raise HTTPException(status_code=404, detail="Organization not found")

    return organization

@router.put("/organization", response_model=Organization)
def edit_organization(organization: Organization, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    organization = OrganizationRepository.edit_organization(organization, user, db)

    if not organization:
        raise HTTPException(status_code=404, detail="Organization not found")

    return organization

@router.post("/organization/{o_id}/highlight", response_model=Organization)
def add_organization_highlight(o_id: str, highlight: OrganizationHighlight, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    organization = OrganizationRepository.add_highlight(highlight, o_id, user, db)

    if not organization:
        raise HTTPException(status_code=404, detail="Organization not found")

    return organization

@router.delete("/organization/{o_id}/highlight/{oh_id}", response_model=Organization)
def delete_organization_highlight(o_id:str , oh_id: str, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    organization = OrganizationRepository.delete_highlight(o_id, oh_id, user, db)

    if not organization:
        raise HTTPException(status_code=404, detail="Organization not found")

    return organization

@router.get("/my-organizations", response_model=List[Organization])
def get_administrators_organizations(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return OrganizationRepository.get_organizations_by_administrator(user.u_id,db)

@route.get("/my-organizations-member")
def get_member_organizations(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return OrganizationRepository.get_organization_by_member(user.m_id, db)

@router.post("/organization/{o_id}/member-information", response_model=MemberInformation)
def add_member_information(o_id:str, member_info: MemberInformation, db: Session = Depends(get_db)):
    return OrganizationRepository.add_member_information(o_id, member_info, db)