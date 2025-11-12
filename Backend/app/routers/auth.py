from fastapi import APIRouter, HTTPException, Depends, Header
from typing import Optional
from app.models import AdminLogin, TokenResponse, AdminResponse
from app.services.admin_service import AdminService

router = APIRouter()
admin_service = AdminService()

@router.post("/login", response_model=TokenResponse)
async def login(credentials: AdminLogin):
    """Login endpoint for admin users"""
    admin = admin_service.authenticate(credentials.username, credentials.password)
    
    if not admin:
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password"
        )
    
    token = admin_service.generate_token(admin)
    
    return TokenResponse(
        access_token=token,
        token_type="bearer",
        admin=admin
    )

@router.post("/logout")
async def logout(authorization: Optional[str] = Header(None)):
    """Logout endpoint"""
    if authorization and authorization.startswith("Bearer "):
        token = authorization.split(" ")[1]
        admin_service.logout(token)
    
    return {"message": "Logged out successfully"}

@router.get("/me", response_model=AdminResponse)
async def get_current_admin(authorization: Optional[str] = Header(None)):
    """Get current authenticated admin"""
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

@router.get("/verify", response_model=dict)
async def verify_token(authorization: Optional[str] = Header(None)):
    """Verify if token is valid"""
    if not authorization or not authorization.startswith("Bearer "):
        return {"valid": False, "message": "No token provided"}
    
    token = authorization.split(" ")[1]
    admin = admin_service.verify_token(token)
    
    if not admin:
        return {"valid": False, "message": "Invalid or expired token"}
    
    return {"valid": True, "admin": admin.model_dump()}

