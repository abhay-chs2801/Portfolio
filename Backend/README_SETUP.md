# 🚀 Quick Setup Guide

## The Problem
You're seeing: `Could not find the table 'public.sections' in the schema cache`

**This means the table doesn't exist in Supabase yet!**

## The Solution (3 Steps)

### Step 1: Create the Table in Supabase

1. **Open Supabase Dashboard**
   - Go to: https://supabase.com/dashboard
   - Click on your project

2. **Open SQL Editor**
   - Left sidebar → Click **"SQL Editor"**
   - Click **"New query"** button

3. **Run the SQL Script**
   - Open file: `database_setup_simple.sql`
   - Copy **ALL** the text (Ctrl+A, Ctrl+C)
   - Paste into Supabase SQL Editor
   - Click **"Run"** button (or Ctrl+Enter)

4. **Verify**
   - Go to **"Table Editor"** in Supabase
   - You should see table **"sections"**

### Step 2: Wait for Cache Refresh

**Wait 15-30 seconds** after creating the table. Supabase needs time to update its API cache.

### Step 3: Test and Initialize

Run these commands (make sure you're in the Backend folder):

```powershell
# Activate virtual environment (if not already active)
.\venv\Scripts\Activate.ps1

# Test connection
python test_connection.py

# If test passes, initialize data
python init_data.py
```

## Alternative: Use the Helper Script

```powershell
.\setup_helper.ps1
```

This script will:
- Activate/create virtual environment
- Install dependencies if needed
- Test the connection
- Show you next steps

## Still Having Issues?

1. **Double-check your `.env` file** has correct Supabase credentials
2. **Wait longer** - Sometimes cache takes 60 seconds
3. **Re-run the SQL** - Sometimes running it again helps
4. **Check Supabase project status** - Make sure it's not paused

## Files You Need

- `database_setup_simple.sql` - SQL to run in Supabase
- `test_connection.py` - Test if table exists
- `init_data.py` - Populate initial data
- `SETUP_STEPS.md` - Detailed step-by-step guide

## Visual Guide

```
Supabase Dashboard
    ↓
SQL Editor (left sidebar)
    ↓
New Query
    ↓
Paste SQL from database_setup_simple.sql
    ↓
Click Run
    ↓
Wait 15-30 seconds
    ↓
Run: python test_connection.py
    ↓
If success: python init_data.py
```

