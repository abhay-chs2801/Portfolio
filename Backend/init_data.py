"""
Script to initialize portfolio data in Supabase
Run this after setting up your Supabase database
"""
import asyncio
import sys
from app.database import supabase_admin
from app.models import SectionCreate
from app.services.section_service import SectionService

async def init_data():
    # First, verify table exists
    print("Checking if 'sections' table exists...")
    try:
        from app.database import supabase
        test_response = supabase.table("sections").select("id").limit(1).execute()
        print("✓ Table 'sections' exists!\n")
    except Exception as e:
        error_msg = str(e)
        if "PGRST205" in error_msg or "Could not find the table" in error_msg:
            print("✗ ERROR: Table 'sections' does not exist in Supabase!")
            print("\n" + "="*60)
            print("YOU MUST CREATE THE TABLE FIRST!")
            print("="*60)
            print("\nSteps to fix:")
            print("1. Go to https://supabase.com/dashboard")
            print("2. Select your project")
            print("3. Click 'SQL Editor' → 'New query'")
            print("4. Copy contents of 'database_setup_simple.sql'")
            print("5. Paste and click 'Run'")
            print("6. Wait 15-30 seconds")
            print("7. Run this script again")
            print("\nSee SETUP_STEPS.md for detailed instructions")
            sys.exit(1)
        else:
            print(f"✗ Connection error: {error_msg}")
            print("\nCheck your .env file and Supabase connection")
            sys.exit(1)
    
    service = SectionService()
    
    # About Section
    about_section = SectionCreate(
        title="About Me",
        section_type="about",
        order=1,
        content={
            "description": "Full-stack developer with expertise in Python, Angular, and GenAI technologies. Passionate about building scalable applications and solving complex challenges.",
            "highlights": [
                "Full-stack development experience",
                "GenAI and Agentic AI expertise",
                "Strong problem-solving skills",
                "Adaptable to changing requirements"
            ]
        }
    )
    
    # Accomplishments Section
    accomplishments = SectionCreate(
        title="Accomplishments and Challenges",
        section_type="accomplishments",
        order=2,
        content={
            "items": [
                {
                    "title": "Single Sign-On Implementation for Data Copy Tool",
                    "description": "Implemented SSO login feature using Microsoft Entra platform for TMO, achieving easy and secure Authentication and Authorization. Overcame challenges with syncing between Python APIs and PHP by learning PHP and implementing the solution.",
                    "technologies": ["Python", "PHP", "Microsoft Entra"]
                },
                {
                    "title": "Single Sign-On for Data360 Tool",
                    "description": "Implemented SSO login feature with MS Entra and Role-based access control. Successfully synced Angular frontend with Python backend for smooth and efficient operation.",
                    "technologies": ["Angular", "Python", "Microsoft Entra"]
                },
                {
                    "title": "Agentic AI Bot using GenAI for ALDM",
                    "description": "Developed an Agentic AI Bot using GenAI for ALDM, fine-tuning the model over ALDM data to enable querying over documents and databases. Overcame challenges of learning GenAI and gathering knowledge about Langgraph during its early development phase.",
                    "technologies": ["GenAI", "Langgraph", "Langchain"]
                },
                {
                    "title": "Data Migration in Optus",
                    "description": "Migrated customer CC tokens by decrypting old tokens, sending to client's third-party CC token generator, and re-encrypting new tokens for storage. Worked through all phases from initial development to testing and deployment, learning Amdocs DB tables and production procedures.",
                    "technologies": ["Shell Script", "Database", "Encryption"]
                },
                {
                    "title": "Data Visualization in Data360",
                    "description": "Developed new features for Data360 tool including visualization of customer data in Tree table, Graph, JSON and other formats. Applied proper data structures for fetching and organizing data.",
                    "technologies": ["Angular", "Python", "Data Structures"]
                }
            ]
        }
    )
    
    # POCs Section
    pocs = SectionCreate(
        title="Proof of Concepts",
        section_type="pocs",
        order=3,
        content={
            "items": [
                "Kleopatra PGP Data Encryption/Decryption Tool",
                "Apache Airflow",
                "Langchain",
                "Langgraph",
                "Langflow",
                "Agentic AI",
                "Pickle Encryption/Decryption"
            ]
        }
    )
    
    # Technical Skills Section
    technical_skills = SectionCreate(
        title="Technical Skills",
        section_type="skills",
        order=4,
        content={
            "programming_languages": ["Python", "C", "C++", "SQL", "HTML", "CSS", "JavaScript", "TypeScript", "Shell"],
            "frameworks": ["FastAPI", "Streamlit", "Angular"],
            "genai_frameworks": ["RASA", "Langchain", "Langgraph", "Langflow", "OpenAI", "Ollama"],
            "apis": ["Swagger UI", "RESTful APIs"],
            "databases": ["PostgreSQL", "Oracle"],
            "tools": ["Jupyter Notebook", "Microsoft Entra", "Informatica", "Wireshark", "DBeaver", "Kleopatra", "Postman"],
            "cicd": ["Git", "GitLab"],
            "devops": ["Jenkins", "Maven", "Confluence", "Agile (JIRA)"],
            "containerization": ["Docker"],
            "data_processing": ["PySpark", "Apache Airflow"],
            "other": ["GenAI", "Agentic AI", "Data Warehouse", "System Design", "Unix/Linux OS", "Networking", "Data Structures", "OOP", "Access Management"],
            "familiarity": ["Databricks", "Java"]
        }
    )
    
    # Other Skills Section
    other_skills = SectionCreate(
        title="Other Skills",
        section_type="other_skills",
        order=5,
        content={
            "skills": [
                "Adaptability under pressure",
                "Flexibility to meet changing client requirements"
            ]
        }
    )
    
    # Opportunities to Grow Section
    opportunities = SectionCreate(
        title="Opportunities to Grow",
        section_type="opportunities",
        order=6,
        content={
            "areas": [
                "Data Science",
                "Data Warehousing",
                "Data Engineering"
            ]
        }
    )
    
    sections = [about_section, accomplishments, pocs, technical_skills, other_skills, opportunities]
    
    print("Initializing portfolio data...")
    print("-" * 60)
    success_count = 0
    for section in sections:
        try:
            result = await service.create_section(section)
            print(f"✓ Created section: {result.title}")
            success_count += 1
        except Exception as e:
            error_msg = str(e)
            if "PGRST205" in error_msg or "Could not find the table" in error_msg:
                print(f"✗ Failed: Table still not found. Wait longer and try again.")
                print("   Supabase schema cache may need more time to refresh.")
            else:
                print(f"✗ Failed to create section {section.title}: {error_msg}")
    
    print("-" * 60)
    print(f"\nData initialization complete!")
    print(f"Successfully created: {success_count}/{len(sections)} sections")
    if success_count < len(sections):
        print("\n⚠ Some sections failed to create. Check errors above.")

if __name__ == "__main__":
    asyncio.run(init_data())

