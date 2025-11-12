from fastapi import APIRouter, HTTPException, Header, Depends
from typing import List, Optional
from app.models import Section, SectionCreate, SectionUpdate, AdminResponse
from app.services.section_service import SectionService
from app.services.admin_service import AdminService

router = APIRouter()
section_service = SectionService()
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

@router.post("/sections", response_model=Section)
async def create_section(
    section: SectionCreate,
    current_admin: AdminResponse = Depends(get_current_admin)
):
    """Create a new section (requires admin authentication)"""
    try:
        new_section = await section_service.create_section(section)
        return new_section
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/sections/{section_id}", response_model=Section)
async def update_section(
    section_id: str,
    section_update: SectionUpdate,
    current_admin: AdminResponse = Depends(get_current_admin)
):
    """Update an existing section (requires admin authentication)"""
    try:
        updated_section = await section_service.update_section(section_id, section_update)
        if not updated_section:
            raise HTTPException(status_code=404, detail="Section not found")
        return updated_section
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/sections/{section_id}")
async def delete_section(
    section_id: str,
    current_admin: AdminResponse = Depends(get_current_admin)
):
    """Delete a section (requires admin authentication)"""
    try:
        success = await section_service.delete_section(section_id)
        if not success:
            raise HTTPException(status_code=404, detail="Section not found")
        return {"message": "Section deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/sections", response_model=List[Section])
async def get_all_sections_admin(
    current_admin: AdminResponse = Depends(get_current_admin)
):
    """Get all sections (including inactive) for admin (requires authentication)"""
    try:
        sections = await section_service.get_all_sections(include_inactive=True)
        return sections
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

