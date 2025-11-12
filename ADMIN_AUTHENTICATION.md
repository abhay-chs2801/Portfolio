# Admin Authentication System

## ✅ What's Been Implemented

### Backend
- ✅ Admin table in database (`admins` table)
- ✅ Password hashing with bcrypt
- ✅ Token-based authentication
- ✅ Protected admin endpoints (require authentication)
- ✅ Login/logout endpoints
- ✅ Script to create admin users (`create_admin.py`)

### Frontend
- ✅ Login page (`/login`)
- ✅ Auth service for managing authentication
- ✅ Auth guard to protect admin routes
- ✅ Unauthorized page for non-admin users
- ✅ Header shows Login/Logout based on auth state
- ✅ Admin panel shows current user and logout button

## 🔐 Security Features

1. **Password Security**
   - Passwords are hashed using bcrypt
   - Never stored in plain text
   - Secure password verification

2. **Token-Based Auth**
   - Session tokens for authentication
   - Tokens verified on each request
   - Automatic logout on token expiration

3. **Route Protection**
   - Admin routes protected by AuthGuard
   - Unauthorized users redirected to login
   - Proper error messages for unauthorized access

4. **No Public Registration**
   - Admins can only be created via backend script
   - No "Sign Up" button in UI
   - Full control over who has admin access

## 📋 Setup Instructions

### 1. Create Admin Table
Run the SQL script in Supabase:
```sql
-- See Backend/database_setup_admin.sql
```

### 2. Install Dependencies
```bash
cd Backend
pip install -r requirements.txt  # Installs bcrypt
```

### 3. Create First Admin
```bash
python create_admin.py admin mypassword123 admin@example.com
```

### 4. Test Login
- Go to http://localhost:4200/login
- Enter your credentials
- You'll be redirected to admin panel

## 🎯 How It Works

### User Flow

1. **Unauthenticated User**
   - Tries to access `/admin` → Redirected to `/login`
   - Sees "Login" link in header
   - Can view public portfolio pages

2. **Login Process**
   - User enters username/password
   - Backend verifies credentials
   - Returns session token
   - Token stored in localStorage
   - User redirected to admin panel

3. **Authenticated User**
   - Sees "Admin" link in header
   - Can access admin panel
   - All admin API calls include auth token
   - Can logout anytime

4. **Unauthorized Access**
   - Non-admin users see proper error message
   - Clear indication they don't have privileges

## 📁 Key Files

### Backend
- `Backend/database_setup_admin.sql` - Admin table schema
- `Backend/app/services/admin_service.py` - Admin authentication logic
- `Backend/app/routers/auth.py` - Login/logout endpoints
- `Backend/app/routers/admin.py` - Protected admin endpoints
- `Backend/create_admin.py` - Script to create admin users

### Frontend
- `Frontend/src/app/features/login/login.component.ts` - Login page
- `Frontend/src/app/core/services/auth.service.ts` - Auth service
- `Frontend/src/app/core/guards/auth.guard.ts` - Route protection
- `Frontend/src/app/features/unauthorized/unauthorized.component.ts` - Unauthorized page

## 🔧 API Endpoints

### Public
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/verify` - Verify token

### Protected (Require Auth Token)
- `GET /api/admin/sections` - Get all sections
- `POST /api/admin/sections` - Create section
- `PUT /api/admin/sections/{id}` - Update section
- `DELETE /api/admin/sections/{id}` - Delete section

All protected endpoints require header:
```
Authorization: Bearer <token>
```

## 👥 Managing Admins

### Create New Admin
```bash
python create_admin.py <username> <password> [email]
```

### List Admins
Check Supabase Table Editor → `admins` table

### Deactivate Admin
Update `is_active = false` in Supabase for that admin

### Change Password
Currently requires database update. Future enhancement could add password change endpoint.

## 🚨 Important Notes

1. **Token Storage**: Currently in-memory on backend. For production, consider Redis or database storage.

2. **Password Security**: Always use strong passwords. The system hashes them securely.

3. **Admin Creation**: Only through backend script - no UI for registration (by design).

4. **Session Management**: Tokens are valid until logout or server restart. Consider adding expiration.

5. **CORS**: Make sure CORS is configured correctly for your frontend URL.

## 🐛 Troubleshooting

### Can't Login
- Check admin exists in database
- Verify password is correct
- Check backend is running
- Check browser console for errors

### "Not authenticated" Errors
- Make sure you're logged in
- Check token in localStorage
- Try logging out and back in

### Admin Panel Not Accessible
- Check AuthGuard is working
- Verify route protection
- Check token is being sent in requests

## 📚 Next Steps (Optional Enhancements)

- [ ] Add password change functionality
- [ ] Add token expiration
- [ ] Add "Remember Me" option
- [ ] Add admin activity logging
- [ ] Add two-factor authentication
- [ ] Store tokens in database/Redis for production

