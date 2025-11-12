# Quick Start Guide - Fix "Table Not Found" Error

If you're seeing the error: `Could not find the table 'public.sections' in the schema cache`

## Step-by-Step Fix

### Step 1: Create the Table in Supabase

1. **Open Supabase Dashboard**
   - Go to [supabase.com](https://supabase.com)
   - Log in and select your project

2. **Open SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New query"

3. **Run the SQL Script**
   - Open the file `database_setup_simple.sql` in this folder
   - Copy ALL the contents
   - Paste into the Supabase SQL Editor
   - Click the "Run" button (or press Ctrl+Enter)

4. **Verify the Table was Created**
   - You should see a success message
   - Go to "Table Editor" in the left sidebar
   - You should see a table called "sections"

### Step 2: Wait for Schema Cache Refresh

Supabase needs a few seconds to refresh its schema cache. Wait 10-15 seconds after creating the table.

### Step 3: Verify Setup

Run this command to verify everything is working:

```bash
python verify_table.py
```

You should see: `✓ Table 'sections' exists and is accessible!`

### Step 4: Initialize Data

Now you can run the initialization script:

```bash
python init_data.py
```

You should see success messages for each section created.

## Alternative: Using Supabase Table Editor (GUI)

If you prefer using the GUI instead of SQL:

1. Go to **Table Editor** in Supabase
2. Click **"New table"**
3. Name it: `sections`
4. Add these columns:

| Column Name | Type | Default Value | Nullable |
|------------|------|---------------|----------|
| id | uuid | gen_random_uuid() | No (Primary Key) |
| title | text | - | No |
| content | jsonb | - | No |
| section_type | text | - | No |
| order | int4 | - | No |
| is_active | bool | true | Yes |
| created_at | timestamptz | now() | Yes |
| updated_at | timestamptz | now() | Yes |

5. Click **"Save"**

**Note:** You'll still need to create the trigger manually via SQL Editor for the `updated_at` auto-update feature.

## Troubleshooting

### Still getting "Table not found" after creating it?

1. **Wait longer** - Supabase schema cache can take 30-60 seconds to refresh
2. **Check table name** - Make sure it's exactly `sections` (lowercase)
3. **Check schema** - Make sure the table is in the `public` schema
4. **Refresh Supabase** - Try refreshing your Supabase dashboard
5. **Check credentials** - Verify your `.env` file has the correct Supabase URL and keys

### Getting permission errors?

Make sure you're using the correct keys:
- Use `SUPABASE_KEY` (anon key) for read operations
- Use `SUPABASE_SERVICE_KEY` (service_role key) for write operations

The service_role key bypasses Row Level Security (RLS).

