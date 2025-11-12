"""
Test Supabase connection and provide detailed diagnostics
"""
import os
from dotenv import load_dotenv
from supabase import create_client, Client

def test_connection():
    """Test Supabase connection and provide diagnostics"""
    load_dotenv()
    
    # Check environment variables
    supabase_url = os.getenv("SUPABASE_URL")
    supabase_key = os.getenv("SUPABASE_KEY")
    supabase_service_key = os.getenv("SUPABASE_SERVICE_KEY")
    
    print("=" * 60)
    print("Supabase Connection Diagnostics")
    print("=" * 60)
    
    # Check if env vars are set
    if not supabase_url or supabase_url.startswith("your_"):
        print("✗ SUPABASE_URL is not set or is a placeholder")
        print("  Please update your .env file")
        return False
    else:
        print(f"✓ SUPABASE_URL: {supabase_url[:30]}...")
    
    if not supabase_key or supabase_key.startswith("your_"):
        print("✗ SUPABASE_KEY is not set or is a placeholder")
        print("  Please update your .env file")
        return False
    else:
        print(f"✓ SUPABASE_KEY: {supabase_key[:20]}...")
    
    if not supabase_service_key or supabase_service_key.startswith("your_"):
        print("✗ SUPABASE_SERVICE_KEY is not set or is a placeholder")
        print("  Please update your .env file")
        return False
    else:
        print(f"✓ SUPABASE_SERVICE_KEY: {supabase_service_key[:20]}...")
    
    print("\n" + "-" * 60)
    print("Testing Connection...")
    print("-" * 60)
    
    try:
        # Test connection with anon key
        client = create_client(supabase_url, supabase_key)
        print("✓ Successfully created Supabase client with anon key")
        
        # Try to query a non-existent table to see the error format
        try:
            response = client.table("sections").select("id").limit(1).execute()
            print("✓ Table 'sections' EXISTS and is accessible!")
            print(f"✓ Found {len(response.data)} records")
            return True
        except Exception as e:
            error_str = str(e)
            if "PGRST205" in error_str or "Could not find the table" in error_str:
                print("✗ Table 'sections' does NOT exist")
                print("\n" + "=" * 60)
                print("SOLUTION: Create the table in Supabase")
                print("=" * 60)
                print("\nOption 1: Using SQL Editor (Recommended)")
                print("1. Go to: https://supabase.com/dashboard")
                print("2. Select your project")
                print("3. Click 'SQL Editor' in the left sidebar")
                print("4. Click 'New query'")
                print("5. Copy the SQL from 'database_setup_simple.sql'")
                print("6. Paste and click 'Run'")
                print("7. Wait 15-30 seconds")
                print("8. Run this script again to verify")
                
                print("\nOption 2: Using Table Editor (GUI)")
                print("1. Go to Supabase Dashboard → Table Editor")
                print("2. Click 'New table'")
                print("3. Name: sections")
                print("4. Add columns (see QUICK_START.md for details)")
                
                # Show the SQL they need to run
                print("\n" + "=" * 60)
                print("SQL to run in Supabase SQL Editor:")
                print("=" * 60)
                try:
                    with open("database_setup_simple.sql", "r") as f:
                        print(f.read())
                except:
                    print("(Could not read database_setup_simple.sql)")
                
            else:
                print(f"✗ Unexpected error: {error_str}")
                print("\nThis might be a connection or permissions issue.")
                print("Check:")
                print("- Your Supabase project is active")
                print("- Your internet connection")
                print("- Your API keys are correct")
            return False
            
    except Exception as e:
        print(f"✗ Failed to connect to Supabase: {str(e)}")
        print("\nPossible issues:")
        print("- Invalid SUPABASE_URL")
        print("- Invalid SUPABASE_KEY")
        print("- Supabase project is paused or deleted")
        print("- Network connectivity issues")
        return False

if __name__ == "__main__":
    test_connection()

