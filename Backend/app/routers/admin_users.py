from fastapi import APIRouter, HTTPException, Header, Depends
from typing import List, Optional
from app.models import AdminCreate, AdminResponse
from app.services.admin_service import AdminService

router = APIRouter()
admin_service = AdminService()

def get_current_admin(authorization: Optional[str] = Header(None)) -> AdminResponse:
    """Dependency to get current admin from token"""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=401,
            detail="Not authenticated"
        )
    
    token = authorization.split(" ")[1]
    admin = admin_service.verify_token(token)
    
    if not admin:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )
    
    return admin

@router.post("/", response_model=AdminResponse)
async def create_admin(
    admin_data: AdminCreate,
    current_admin: AdminResponse = Depends(get_current_admin)
):
    """Create a new admin user (requires authentication)"""
    try:
        new_admin = admin_service.create_admin(admin_data)
        return new_admin
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/", response_model=List[AdminResponse])
async def list_admins(
    current_admin: AdminResponse = Depends(get_current_admin)
):
    """List all admin users (requires authentication)"""
    # This would require implementing a list method in AdminService
    # For now, return empty list or implement as needed
    return []

