from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import sections, admin, auth, admin_users
from app.config import settings

app = FastAPI(
    title="Portfolio API",
    description="Backend API for Portfolio Website",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(sections.router, prefix="/api/sections", tags=["sections"])
app.include_router(admin.router, prefix="/api/admin", tags=["admin"])
app.include_router(auth.router, prefix="/api/auth", tags=["authentication"])
app.include_router(admin_users.router, prefix="/api/admin/users", tags=["admin-users"])

@app.get("/")
async def root():
    return {"message": "Portfolio API is running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

