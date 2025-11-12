# ✅ Setup Checklist

Use this checklist to track your progress:

## Phase 1: Supabase Setup
- [ ] Created Supabase account
- [ ] Created new project in Supabase
- [ ] Opened SQL Editor in Supabase
- [ ] Copied SQL from `Backend/database_setup_simple.sql`
- [ ] Ran SQL in Supabase (clicked "Run")
- [ ] Verified table "sections" exists in Table Editor
- [ ] Waited 15-30 seconds for cache refresh

## Phase 2: Backend Setup
- [ ] Navigated to Backend folder
- [ ] Created virtual environment (`python -m venv venv`)
- [ ] Activated virtual environment (`.\venv\Scripts\Activate.ps1`)
- [ ] Installed dependencies (`pip install -r requirements.txt`)
- [ ] Created `.env` file from `.env.example`
- [ ] Added Supabase credentials to `.env`:
  - [ ] SUPABASE_URL
  - [ ] SUPABASE_KEY
  - [ ] SUPABASE_SERVICE_KEY
  - [ ] CORS_ORIGINS
- [ ] Ran `python test_connection.py` - Got success message
- [ ] (Optional) Ran `python init_data.py` - Data initialized

## Phase 3: Start Servers
- [ ] Backend server running (`uvicorn main:app --reload --port 8000`)
- [ ] Backend accessible at http://localhost:8000/docs
- [ ] Frontend dependencies installed (`npm install` - ✅ DONE!)
- [ ] Frontend server running (`npm start`)
- [ ] Frontend accessible at http://localhost:4200

## Phase 4: Verify Everything Works
- [ ] Portfolio page loads at http://localhost:4200
- [ ] Can see sections/content on homepage
- [ ] Admin panel accessible at http://localhost:4200/admin
- [ ] Can add/edit/delete sections in admin panel

## 🎉 All Done!
Your portfolio website is ready to use!

---

## Quick Status Check

Run these commands to check your setup:

```powershell
# Check backend connection
cd Backend
.\venv\Scripts\Activate.ps1
python test_connection.py

# Check if backend is running
# Open: http://localhost:8000/docs

# Check if frontend is running  
# Open: http://localhost:4200
```

