from fastapi import APIRouter, HTTPException
from typing import List
from app.models import Section, SectionCreate
from app.database import supabase
from app.services.section_service import SectionService

router = APIRouter()
section_service = SectionService()

@router.get("/", response_model=List[Section])
async def get_all_sections():
    """Get all active sections"""
    try:
        sections = await section_service.get_all_sections()
        return sections
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{section_id}", response_model=Section)
async def get_section(section_id: str):
    """Get a specific section by ID"""
    try:
        section = await section_service.get_section_by_id(section_id)
        if not section:
            raise HTTPException(status_code=404, detail="Section not found")
        return section
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/type/{section_type}", response_model=List[Section])
async def get_sections_by_type(section_type: str):
    """Get sections by type"""
    try:
        sections = await section_service.get_sections_by_type(section_type)
        return sections
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

