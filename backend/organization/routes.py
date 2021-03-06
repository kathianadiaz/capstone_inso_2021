from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from fastapi.responses import StreamingResponse
from organization import Organization, OrganizationHighlight, MemberInformation
from organization.repository import OrganizationRepository
from organization.services.file_upload import HighlightAttachment, MemberInformationAttachment, OrganizationImage
from user import User
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from authentication.authentication import get_current_user
from io import BytesIO
from typing import Optional

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

@router.put("/organization/{o_id}", response_model=Organization)
def edit_organization(o_id: str,  organization: Organization, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    organization = OrganizationRepository.edit_organization(o_id, organization, user, db)

    if not organization:
        raise HTTPException(status_code=404, detail="Organization not found")

    return organization

@router.post("/organization/{o_id}/image")
def upload_organization_image(o_id: str, image: UploadFile = File(...), user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not OrganizationImage.upload_image(o_id,user.u_id,image,db):
        raise HTTPException(status_code=404, detail="Organization not found")
    return {"message":"File uploaded"}

@router.delete("/organization/{o_id}/image")
def delete_organization(o_id: str,  user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    organizationImage = OrganizationImage.delete_image(o_id,user.u_id,db)
    return organizationImage

@router.get("/organization/{o_id}/image")
def download_organization_image(o_id: str, db: Session = Depends(get_db)):
    data = OrganizationImage.download_image(o_id,db)

    if not data:
        raise HTTPException(status_code=404, detail="file not found")

    memfile = BytesIO(data['data'])

    response = StreamingResponse(memfile, media_type=f'{data["content_type"]}')
    response.headers["Content-Disposition"] = f"inline; filename={data['filename']}"
    return response

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

@router.post('/organization/{o_id}/highlight/{oh_id}/attachment')
def upload_attachment(o_id: str, oh_id: str, attachment: UploadFile = File(...), user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    attachment = HighlightAttachment.upload_highlight_attachment(oh_id,o_id,user.u_id,attachment,db)

    if not attachment:
        raise HTTPException(status_code=404, detail="Organization or highlight not found")
    return {"message":"File uploaded"}

@router.get('/organization/{o_id}/highlight/{oh_id}/attachment')
def download_attachment(o_id: str, oh_id: str, db: Session = Depends(get_db)):
    data = HighlightAttachment.download_highlight_attachment(oh_id,db)
    memfile = BytesIO(data['data'])
    
    response = StreamingResponse(memfile, media_type=f'{data["content_type"]}')
    response.headers["Content-Disposition"] = f"inline; filename={data['filename']}"
    return response

@router.get("/my-organizations", response_model=List[Organization])
def get_administrators_organizations(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return OrganizationRepository.get_organizations_by_administrator(user.u_id,db)

@router.get("/my-organizations-member")
def get_member_organizations(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return OrganizationRepository.get_organization_by_member(user.m_id, db)

@router.post("/organization/{o_id}/member-information", response_model=MemberInformation)
def add_member_information(o_id:str, member_info: MemberInformation, db: Session = Depends(get_db)):
    return OrganizationRepository.add_member_information(o_id, member_info, db)

@router.post("/organization/{o_id}/member-information/{m_id}/resume")
def upload_member_resume(o_id: str, m_id: str, resume: UploadFile = File(...), user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not MemberInformationAttachment.upload_resume(m_id,resume,db):
        raise HTTPException(status_code=404, detail="Organization or highlight not found")
    return {"message":"File uploaded"}

@router.get("/organization/{o_id}/member-information/{m_id}/resume")
def download_member_resume(o_id: str, m_id: str, db: Session = Depends(get_db)):
    data = MemberInformationAttachment.download_resume(m_id,db)

    if not data:
        raise HTTPException(status_code=404, detail="file not found")

    memfile = BytesIO(data['data'])

    response = StreamingResponse(memfile, media_type=f'{data["content_type"]}')
    response.headers["Content-Disposition"] = f"inline; filename={data['filename']}"
    return response

@router.post("/organization/{o_id}/member-information/{m_id}/image")
def upload_member_image(o_id: str, m_id: str, image: UploadFile = File(...), user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not MemberInformationAttachment.upload_image(m_id,image,db):
        raise HTTPException(status_code=404, detail="Organization or highlight not found")
    return {"message":"File uploaded"}

@router.get("/organization/{o_id}/member-information/{m_id}/image")
def download_member_image(o_id: str, m_id: str, db: Session = Depends(get_db)):
    data = MemberInformationAttachment.download_image(m_id,db)

    if not data:
        raise HTTPException(status_code=404, detail="file not found")

    memfile = BytesIO(data['data'])

    response = StreamingResponse(memfile, media_type=f'{data["content_type"]}')
    response.headers["Content-Disposition"] = f"inline; filename={data['filename']}"
    return response

@router.post("/organization/{o_id}/member-information/{m_id}", response_model=Organization)
def connect_member_information(o_id: str, m_id: str, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    organization = OrganizationRepository.connect_user_to_organization(o_id,m_id, user, db)

    if not organization:
        raise HTTPException(status_code=404, detail="Organization or member information not found")

    return organization

@router.get("/organization/keywords/{keywords}", response_model=List[Organization])
def get_organizations_by_keywords(keywords: str, db: Session = Depends(get_db)):
    return OrganizationRepository.get_organizations_by_keywords(keywords, db)

@router.get("/organization/tags/{tags}", response_model=List[Organization])
def get_organizations_by_tags(tags: str, db: Session = Depends(get_db)):
    return OrganizationRepository.get_organizations_by_tags(tags, db)

@router.get("/organization/tags/{tags}/keywords/{keywords}", response_model=List[Organization])
def search_organizations(tags: str, keywords:str, db: Session = Depends(get_db)):
    return OrganizationRepository.search_organizations(tags, keywords, db)

@router.get("/member-information/{m_id}", response_model=MemberInformation)
def get_member_information(m_id: str, db: Session = Depends(get_db)):
    member_info = OrganizationRepository.get_member_info(m_id, db)

    if not member_info:
        raise HTTPException(status_code=404, detail="Organization or member information not found")

    return member_info