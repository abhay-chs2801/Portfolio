from typing import Optional
from datetime import datetime
import bcrypt
import secrets
from app.models import AdminResponse, AdminCreate
from app.database import supabase, supabase_admin

class AdminService:
    def __init__(self):
        self.table_name = "admins"
        # In-memory token storage (for production, use Redis or database)
        self.token_store: dict[str, dict] = {}
    
    def hash_password(self, password: str) -> str:
        """Hash a password using bcrypt"""
        return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    
    def verify_password(self, password: str, password_hash: str) -> bool:
        """Verify a password against a hash"""
        return bcrypt.checkpw(password.encode('utf-8'), password_hash.encode('utf-8'))
    
    def create_admin(self, admin_data: AdminCreate) -> AdminResponse:
        """Create a new admin user"""
        # Check if username already exists
        existing = supabase_admin.table(self.table_name).select("id").eq("username", admin_data.username).execute()
        if existing.data:
            raise ValueError("Username already exists")
        
        # Hash password
        password_hash = self.hash_password(admin_data.password)
        
        # Create admin
        admin_record = {
            "username": admin_data.username,
            "password_hash": password_hash,
            "email": admin_data.email,
            "is_active": True,
            "created_at": datetime.utcnow().isoformat(),
            "updated_at": datetime.utcnow().isoformat()
        }
        
        response = supabase_admin.table(self.table_name).insert(admin_record).execute()
        
        if not response.data:
            raise Exception("Failed to create admin")
        
        item = response.data[0]
        return AdminResponse(
            id=item["id"],
            username=item["username"],
            email=item.get("email"),
            is_active=item["is_active"],
            created_at=datetime.fromisoformat(item["created_at"].replace("Z", "+00:00")),
            last_login=datetime.fromisoformat(item["last_login"].replace("Z", "+00:00")) if item.get("last_login") else None
        )
    
    def authenticate(self, username: str, password: str) -> Optional[AdminResponse]:
        """Authenticate an admin user"""
        # Get admin by username
        response = supabase_admin.table(self.table_name).select("*").eq("username", username).execute()
        
        if not response.data:
            return None
        
        admin = response.data[0]
        
        # Check if admin is active
        if not admin.get("is_active", True):
            return None
        
        # Verify password
        if not self.verify_password(password, admin["password_hash"]):
            return None
        
        # Update last login
        supabase_admin.table(self.table_name).update({
            "last_login": datetime.utcnow().isoformat()
        }).eq("id", admin["id"]).execute()
        
        return AdminResponse(
            id=admin["id"],
            username=admin["username"],
            email=admin.get("email"),
            is_active=admin["is_active"],
            created_at=datetime.fromisoformat(admin["created_at"].replace("Z", "+00:00")),
            last_login=datetime.utcnow()
        )
    
    def generate_token(self, admin: AdminResponse) -> str:
        """Generate a session token"""
        token = secrets.token_urlsafe(32)
        self.token_store[token] = {
            "admin_id": admin.id,
            "username": admin.username,
            "created_at": datetime.utcnow().isoformat()
        }
        return token
    
    def verify_token(self, token: str) -> Optional[AdminResponse]:
        """Verify a session token and return admin info"""
        if token not in self.token_store:
            return None
        
        token_data = self.token_store[token]
        admin_id = token_data["admin_id"]
        
        # Get admin from database to ensure still active
        response = supabase_admin.table(self.table_name).select("*").eq("id", admin_id).execute()
        
        if not response.data:
            # Token valid but admin deleted
            del self.token_store[token]
            return None
        
        admin = response.data[0]
        
        # Check if admin is still active
        if not admin.get("is_active", True):
            del self.token_store[token]
            return None
        
        return AdminResponse(
            id=admin["id"],
            username=admin["username"],
            email=admin.get("email"),
            is_active=admin["is_active"],
            created_at=datetime.fromisoformat(admin["created_at"].replace("Z", "+00:00")),
            last_login=datetime.fromisoformat(admin["last_login"].replace("Z", "+00:00")) if admin.get("last_login") else None
        )
    
    def logout(self, token: str):
        """Remove a session token"""
        if token in self.token_store:
            del self.token_store[token]
    
    def get_admin_by_id(self, admin_id: str) -> Optional[AdminResponse]:
        """Get admin by ID"""
        response = supabase_admin.table(self.table_name).select("*").eq("id", admin_id).execute()
        
        if not response.data:
            return None
        
        admin = response.data[0]
        return AdminResponse(
            id=admin["id"],
            username=admin["username"],
            email=admin.get("email"),
            is_active=admin["is_active"],
            created_at=datetime.fromisoformat(admin["created_at"].replace("Z", "+00:00")),
            last_login=datetime.fromisoformat(admin["last_login"].replace("Z", "+00:00")) if admin.get("last_login") else None
        )

