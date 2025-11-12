"""
Script to verify if the sections table exists in Supabase
"""
from app.database import supabase

def verify_table():
    """Check if the sections table exists and is accessible"""
    try:
        # Try to query the table
        response = supabase.table("sections").select("id").limit(1).execute()
        print("✓ Table 'sections' exists and is accessible!")
        print(f"✓ Found {len(response.data)} existing records")
        return True
    except Exception as e:
        error_msg = str(e)
        if "PGRST205" in error_msg or "Could not find the table" in error_msg:
            print("✗ Table 'sections' does not exist in Supabase")
            print("\nTo fix this:")
            print("1. Go to your Supabase project dashboard")
            print("2. Navigate to SQL Editor")
            print("3. Copy and paste the contents of 'database_setup_simple.sql'")
            print("4. Click 'Run' to execute the SQL")
            print("5. Wait 10-15 seconds for Supabase to refresh the schema cache")
            print("6. Run this script again to verify")
            print("\nOr see QUICK_START.md for detailed instructions")
        else:
            print(f"✗ Error accessing table: {error_msg}")
            print("\nPossible issues:")
            print("- Check your .env file has correct Supabase credentials")
            print("- Verify your Supabase project is active")
            print("- Check your internet connection")
        return False

if __name__ == "__main__":
    verify_table()

