# Step-by-Step Setup Instructions

## ⚠️ IMPORTANT: You MUST create the table in Supabase first!

The error `Could not find the table 'public.sections'` means the table doesn't exist yet. Follow these steps:

## Step 1: Open Supabase Dashboard

1. Go to: **https://supabase.com/dashboard**
2. Log in to your account
3. Click on your project (or create a new one if you haven't)

## Step 2: Open SQL Editor

1. In the left sidebar, click **"SQL Editor"**
2. Click the **"New query"** button (top right)

## Step 3: Copy and Run the SQL

1. Open the file `database_setup_simple.sql` in this folder
2. **Select ALL** the text (Ctrl+A, then Ctrl+C)
3. **Paste** it into the Supabase SQL Editor
4. Click the **"Run"** button (or press Ctrl+Enter)

You should see a success message like: "Success. No rows returned"

## Step 4: Verify Table Was Created

1. In Supabase, go to **"Table Editor"** (left sidebar)
2. You should see a table called **"sections"**
3. Click on it to see the columns

## Step 5: Wait for Schema Cache (IMPORTANT!)

Supabase needs time to refresh its API cache. **Wait 15-30 seconds** after creating the table.

## Step 6: Test Connection

Run this command in your terminal:

```bash
python test_connection.py
```

This will:
- Check your environment variables
- Test the connection
- Verify the table exists
- Show you the exact SQL if needed

## Step 7: Initialize Data

Once `test_connection.py` shows success, run:

```bash
python init_data.py
```

You should see:
```
✓ Created section: About Me
✓ Created section: Accomplishments and Challenges
...
```

## Troubleshooting

### Still getting "table not found" after creating it?

1. **Wait longer** - Sometimes it takes 30-60 seconds
2. **Check table name** - Must be exactly `sections` (lowercase, no spaces)
3. **Refresh Supabase** - Try refreshing your browser
4. **Check schema** - Table should be in `public` schema (default)
5. **Re-run SQL** - Sometimes running the SQL again helps

### Getting permission errors?

Make sure your `.env` file has:
- `SUPABASE_SERVICE_KEY` (not just the anon key)
- Correct project URL
- No extra spaces or quotes

### Can't find SQL Editor?

- Look in the left sidebar menu
- It might be under "Database" → "SQL Editor"
- Or use the search bar in Supabase dashboard

## Quick Reference: SQL Script Location

The SQL script is in: `Backend/database_setup_simple.sql`

You can also see it by running:
```bash
type database_setup_simple.sql
```

