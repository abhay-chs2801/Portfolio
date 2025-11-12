from typing import List, Optional
from datetime import datetime
from app.models import Section, SectionCreate, SectionUpdate
from app.database import supabase, supabase_admin

class SectionService:
    def __init__(self):
        self.table_name = "sections"
    
    async def get_all_sections(self, include_inactive: bool = False) -> List[Section]:
        """Get all sections from database"""
        query = supabase.table(self.table_name).select("*")
        
        if not include_inactive:
            query = query.eq("is_active", True)
        
        query = query.order("order", desc=False)
        response = query.execute()
        
        sections = []
        for item in response.data:
            item["created_at"] = datetime.fromisoformat(item["created_at"].replace("Z", "+00:00"))
            item["updated_at"] = datetime.fromisoformat(item["updated_at"].replace("Z", "+00:00"))
            sections.append(Section(**item))
        
        return sections
    
    async def get_section_by_id(self, section_id: str) -> Optional[Section]:
        """Get a section by ID"""
        response = supabase.table(self.table_name).select("*").eq("id", section_id).execute()
        
        if not response.data:
            return None
        
        item = response.data[0]
        item["created_at"] = datetime.fromisoformat(item["created_at"].replace("Z", "+00:00"))
        item["updated_at"] = datetime.fromisoformat(item["updated_at"].replace("Z", "+00:00"))
        return Section(**item)
    
    async def get_sections_by_type(self, section_type: str) -> List[Section]:
        """Get sections by type"""
        response = supabase.table(self.table_name).select("*").eq("section_type", section_type).eq("is_active", True).order("order", desc=False).execute()
        
        sections = []
        for item in response.data:
            item["created_at"] = datetime.fromisoformat(item["created_at"].replace("Z", "+00:00"))
            item["updated_at"] = datetime.fromisoformat(item["updated_at"].replace("Z", "+00:00"))
            sections.append(Section(**item))
        
        return sections
    
    async def create_section(self, section: SectionCreate) -> Section:
        """Create a new section"""
        section_data = section.model_dump()
        section_data["created_at"] = datetime.utcnow().isoformat()
        section_data["updated_at"] = datetime.utcnow().isoformat()
        
        response = supabase_admin.table(self.table_name).insert(section_data).execute()
        
        if not response.data:
            raise Exception("Failed to create section")
        
        item = response.data[0]
        item["created_at"] = datetime.fromisoformat(item["created_at"].replace("Z", "+00:00"))
        item["updated_at"] = datetime.fromisoformat(item["updated_at"].replace("Z", "+00:00"))
        return Section(**item)
    
    async def update_section(self, section_id: str, section_update: SectionUpdate) -> Optional[Section]:
        """Update a section"""
        update_data = section_update.model_dump(exclude_unset=True)
        update_data["updated_at"] = datetime.utcnow().isoformat()
        
        response = supabase_admin.table(self.table_name).update(update_data).eq("id", section_id).execute()
        
        if not response.data:
            return None
        
        item = response.data[0]
        item["created_at"] = datetime.fromisoformat(item["created_at"].replace("Z", "+00:00"))
        item["updated_at"] = datetime.fromisoformat(item["updated_at"].replace("Z", "+00:00"))
        return Section(**item)
    
    async def delete_section(self, section_id: str) -> bool:
        """Delete a section"""
        response = supabase_admin.table(self.table_name).delete().eq("id", section_id).execute()
        return len(response.data) > 0

