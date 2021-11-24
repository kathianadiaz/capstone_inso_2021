from fastapi import APIRouter, Depends, HTTPException, status,Body, Request
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from authentication.authentication import get_current_user
from user import User
from join_requests import JoinRequest
from join_requests.repository import JoinRequestRepository

router = APIRouter(
    prefix="/organization",
    tags=["join-request"]
)

@router.get("/{o_id}/request", response_model=List[JoinRequest])
def get_organization_requests(o_id: str, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    join_requests = JoinRequestRepository.get_join_requests(o_id,user.u_id, db)

    if join_requests == None:
        raise HTTPException(status_code=404, detail="Organization not found")

    return join_requests

@router.post("/{o_id}/join", response_model=JoinRequest)
def add_organization_requests(request: Request, o_id: str, message: str = Body(...), user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if user.m_id == None:
        raise HTTPException(status_code=404, detail="Member information not found")

    return JoinRequestRepository.add_join_request(message,o_id,user,db)

@router.post("/{o_id}/request/{r_id}/accept")
def accept_join_request(o_id: str, r_id: str, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    JoinRequestRepository.respond_to_join_request(True, o_id,r_id,user,db)

@router.post("/{o_id}/request/{r_id}/decline", response_model=JoinRequest)
def decline_join_request(o_id: str, r_id: str, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    JoinRequestRepository.respond_to_join_request(False, o_id,r_id,user,db)