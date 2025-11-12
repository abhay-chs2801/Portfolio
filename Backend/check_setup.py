"""
Quick setup verification script
Run this to check if your backend is configured correctly
"""
import os
from dotenv import load_dotenv

def check_setup():
    """Check if environment variables are set"""
    load_dotenv()
    
    required_vars = [
        'SUPABASE_URL',
        'SUPABASE_KEY',
        'SUPABASE_SERVICE_KEY'
    ]
    
    missing_vars = []
    for var in required_vars:
        value = os.getenv(var)
        if not value or value.startswith('your_'):
            missing_vars.append(var)
        else:
            print(f"✓ {var} is set")
    
    if missing_vars:
        print(f"\n✗ Missing or incomplete environment variables: {', '.join(missing_vars)}")
        print("Please update your .env file with your Supabase credentials.")
        return False
    
    print("\n✓ All environment variables are set!")
    print("\nNext steps:")
    print("1. Make sure you've run the database_setup.sql in Supabase")
    print("2. Run: python init_data.py (optional, to populate initial data)")
    print("3. Run: uvicorn main:app --reload --port 8000")
    return True

if __name__ == "__main__":
    check_setup()

