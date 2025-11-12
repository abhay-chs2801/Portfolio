"""
Script to create an admin user
Usage: python create_admin.py <username> <password> [email]
"""
import sys
import asyncio
from app.services.admin_service import AdminService
from app.models import AdminCreate

def create_admin():
    if len(sys.argv) < 3:
        print("Usage: python create_admin.py <username> <password> [email]")
        print("\nExample:")
        print("  python create_admin.py admin admin123 admin@example.com")
        sys.exit(1)
    
    username = sys.argv[1]
    password = sys.argv[2]
    email = sys.argv[3] if len(sys.argv) > 3 else None
    
    service = AdminService()
    
    try:
        admin_data = AdminCreate(
            username=username,
            password=password,
            email=email
        )
        admin = service.create_admin(admin_data)
        print(f"✓ Admin created successfully!")
        print(f"  Username: {admin.username}")
        print(f"  Email: {admin.email or 'Not provided'}")
        print(f"  ID: {admin.id}")
        print(f"\nYou can now login with username: {username}")
    except ValueError as e:
        print(f"✗ Error: {str(e)}")
        sys.exit(1)
    except Exception as e:
        print(f"✗ Failed to create admin: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    create_admin()

