# 🚀 Portfolio Website - Complete Setup Guide

## ✅ What You've Done So Far
- ✓ Frontend dependencies installed (npm install completed)
- ✓ Project structure created

## 📋 What's Left to Do

### Step 1: Set Up Supabase Database (5 minutes)

**This is REQUIRED before the backend will work!**

1. **Go to Supabase Dashboard**
   - Visit: https://supabase.com/dashboard
   - Log in and select your project (or create one)

2. **Open SQL Editor**
   - Click "SQL Editor" in left sidebar
   - Click "New query"

3. **Run the SQL Script**
   - Open: `Backend/database_setup_simple.sql`
   - Copy ALL contents (Ctrl+A, Ctrl+C)
   - Paste into Supabase SQL Editor
   - Click "Run" button

4. **Verify Table Created**
   - Go to "Table Editor" in Supabase
   - You should see table "sections"

5. **Wait 15-30 seconds** for Supabase cache to refresh

### Step 2: Configure Backend (2 minutes)

1. **Navigate to Backend folder**
   ```powershell
   cd Backend
   ```

2. **Create/Activate Virtual Environment**
   ```powershell
   # If venv doesn't exist:
   python -m venv venv
   
   # Activate it:
   .\venv\Scripts\Activate.ps1
   ```

3. **Install Dependencies**
   ```powershell
   pip install -r requirements.txt
   ```

4. **Set Up Environment Variables**
   - Copy `.env.example` to `.env` (if not exists)
   - Edit `.env` and add your Supabase credentials:
     ```
     SUPABASE_URL=https://your-project.supabase.co
     SUPABASE_KEY=your_anon_key_here
     SUPABASE_SERVICE_KEY=your_service_role_key_here
     CORS_ORIGINS=http://localhost:4200
     ```
   - Get these from: Supabase Dashboard → Settings → API

5. **Test Connection**
   ```powershell
   python test_connection.py
   ```
   Should show: `✓ Table 'sections' exists and is accessible!`

6. **Initialize Data (Optional)**
   ```powershell
   python init_data.py
   ```
   This populates your portfolio with your information.

### Step 3: Start Backend Server

**In Backend folder (with venv activated):**
```powershell
uvicorn main:app --reload --port 8000
```

You should see:
```
INFO:     Uvicorn running on http://127.0.0.1:8000
```

✅ Backend is running! Keep this terminal open.

**Test it:** Open http://localhost:8000/docs in browser to see API documentation.

### Step 4: Start Frontend Server

**Open a NEW terminal window:**

```powershell
cd Frontend
npm start
```

You should see:
```
✔ Browser application bundle generation complete.
** Angular Live Development Server is listening on localhost:4200 **
```

✅ Frontend is running!

**Open in browser:** http://localhost:4200

## 🎉 You're Done!

- **Portfolio:** http://localhost:4200
- **Admin Panel:** http://localhost:4200/admin
- **API Docs:** http://localhost:8000/docs

## 🔧 Troubleshooting

### Backend Issues

**"Table not found" error:**
- Make sure you created the table in Supabase (Step 1)
- Wait longer (up to 60 seconds) for cache refresh
- Run `python test_connection.py` to verify

**"Module not found" error:**
- Make sure virtual environment is activated
- Run `pip install -r requirements.txt` again

**Port 8000 already in use:**
- Change port: `uvicorn main:app --reload --port 8001`
- Update `Frontend/src/environments/environment.ts` with new port

### Frontend Issues

**"Cannot find module" errors:**
- Run `npm install` again in Frontend folder
- Delete `node_modules` and `package-lock.json`, then `npm install`

**"API connection failed":**
- Make sure backend is running on port 8000
- Check `Frontend/src/environments/environment.ts` has correct API URL
- Check CORS settings in backend `.env` file

### Database Issues

**"Permission denied" errors:**
- Make sure you're using `SUPABASE_SERVICE_KEY` (not just anon key)
- Check Supabase project is active (not paused)

## 📚 Additional Resources

- `Backend/README_SETUP.md` - Detailed backend setup
- `Backend/SETUP_STEPS.md` - Step-by-step database setup
- `Backend/QUICK_START.md` - Quick troubleshooting
- `SETUP_GUIDE.md` - Full setup guide

## 🎨 Next Steps

1. **Customize Content**
   - Go to http://localhost:4200/admin
   - Add, edit, or delete sections

2. **Modify Styling**
   - Edit `Frontend/src/styles.css` for global styles
   - Edit component files for component-specific styles

3. **Add More Sections**
   - Use admin panel to add custom sections
   - Or create new component types in `Frontend/src/app/features/`

## 💡 Quick Commands Reference

```powershell
# Backend
cd Backend
.\venv\Scripts\Activate.ps1
python test_connection.py      # Test Supabase connection
python init_data.py            # Initialize data
uvicorn main:app --reload --port 8000

# Frontend
cd Frontend
npm start                      # Start dev server
npm run build                  # Build for production
```

---

**Need Help?** Check the troubleshooting section or the detailed guides in the Backend folder.

