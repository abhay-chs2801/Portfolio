# Admin Authentication Setup Guide

## Step 1: Create Admin Table in Supabase

1. Go to Supabase Dashboard → SQL Editor
2. Copy and paste the contents of `database_setup_admin.sql`
3. Click "Run"
4. Wait 10-15 seconds for schema cache to refresh

## Step 2: Install Backend Dependencies

Make sure you have the new dependency installed:

```bash
cd Backend
.\venv\Scripts\Activate.ps1  # Activate virtual environment
pip install -r requirements.txt
```

This will install `bcrypt` for password hashing.

## Step 3: Create Your First Admin User

Use the provided script to create an admin:

```bash
python create_admin.py <username> <password> [email]
```

**Example:**
```bash
python create_admin.py admin mypassword123 admin@example.com
```

Or without email:
```bash
python create_admin.py admin mypassword123
```

**Important:** 
- Choose a strong password
- Remember your credentials - you'll need them to login
- You can create multiple admins using this script

## Step 4: Test the Setup

1. **Start the backend server:**
   ```bash
   uvicorn main:app --reload --port 8000
   ```

2. **Test login endpoint:**
   - Go to http://localhost:8000/docs
   - Find `/api/auth/login` endpoint
   - Try logging in with your credentials

3. **Start the frontend:**
   ```bash
   cd Frontend
   npm start
   ```

4. **Test login page:**
   - Go to http://localhost:4200/login
   - Enter your username and password
   - You should be redirected to the admin panel

## Step 5: Access Admin Panel

1. Navigate to http://localhost:4200/admin
2. You'll be redirected to login if not authenticated
3. After login, you'll have access to the admin panel

## Security Features

✅ **Password Hashing:** All passwords are hashed using bcrypt  
✅ **Token-based Auth:** Session tokens for authentication  
✅ **Route Protection:** Admin routes are protected by AuthGuard  
✅ **Backend Validation:** All admin operations require valid token  
✅ **No User Registration:** Admins can only be created via backend script  

## Creating Additional Admins

To add more admins, simply run:

```bash
python create_admin.py <new_username> <new_password> [email]
```

Each admin will have full access to the admin panel.

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login and get token
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current admin info
- `GET /api/auth/verify` - Verify token validity

### Admin Operations (Require Authentication)
- `GET /api/admin/sections` - Get all sections
- `POST /api/admin/sections` - Create section
- `PUT /api/admin/sections/{id}` - Update section
- `DELETE /api/admin/sections/{id}` - Delete section

All admin endpoints require the `Authorization: Bearer <token>` header.

## Troubleshooting

### "Table 'admins' does not exist"
- Make sure you ran the SQL script in Supabase
- Wait 15-30 seconds after creating the table

### "Invalid username or password"
- Check that you created the admin user correctly
- Verify username and password are correct
- Make sure the admin is active in the database

### "Not authenticated" errors
- Make sure you're logged in
- Check that the token is being sent in requests
- Try logging out and logging back in

### Frontend login not working
- Check that backend is running on port 8000
- Check browser console for errors
- Verify CORS is configured correctly in backend

## Notes

- Tokens are stored in-memory on the backend (for production, consider using Redis or database)
- Passwords are never stored in plain text
- Admin users can only be created through the backend script (no UI for registration)
- All admin operations require authentication

