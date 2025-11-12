# Portfolio Website Setup Guide

Follow these steps to set up your portfolio website.

## Step 1: Supabase Setup

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Wait for the project to be fully provisioned
4. Go to **Settings** → **API** to get your credentials:
   - Project URL (SUPABASE_URL)
   - anon/public key (SUPABASE_KEY)
   - service_role key (SUPABASE_SERVICE_KEY) - Keep this secret!

5. Go to **SQL Editor** in Supabase dashboard
6. Copy and paste the contents of `Backend/database_setup.sql`
7. Run the SQL script to create the `sections` table

## Step 2: Backend Setup

1. Open a terminal and navigate to the Backend folder:
```bash
cd Backend
```

2. Create a Python virtual environment:
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Mac/Linux
python3 -m venv venv
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create a `.env` file in the Backend folder:
```bash
# Windows
copy .env.example .env

# Mac/Linux
cp .env.example .env
```

5. Edit `.env` and add your Supabase credentials:
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_anon_key_here
SUPABASE_SERVICE_KEY=your_service_role_key_here
CORS_ORIGINS=http://localhost:4200
```

6. (Optional) Initialize with your portfolio data:
```bash
python init_data.py
```

7. Start the backend server:
```bash
uvicorn main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`
You can view the API documentation at `http://localhost:8000/docs`

## Step 3: Frontend Setup

1. Open a **new terminal** and navigate to the Frontend folder:
```bash
cd Frontend
```

2. Install Node.js dependencies:
```bash
npm install
```

3. (Optional) Update API URL in `src/environments/environment.ts` if your backend runs on a different port

4. Start the Angular development server:
```bash
npm start
```

The frontend will be available at `http://localhost:4200`

## Step 4: Verify Setup

1. Open `http://localhost:4200` in your browser
2. You should see your portfolio with all sections
3. Navigate to `http://localhost:4200/admin` to access the admin panel
4. Try adding, editing, or deleting a section to verify everything works

## Troubleshooting

### Backend Issues

- **Import errors**: Make sure you activated the virtual environment
- **Supabase connection errors**: Verify your `.env` file has correct credentials
- **Port already in use**: Change the port in the uvicorn command: `--port 8001`

### Frontend Issues

- **npm install fails**: Make sure you have Node.js 18+ installed
- **API connection errors**: Check that the backend is running and CORS is configured
- **Module not found**: Run `npm install` again

### Database Issues

- **Table doesn't exist**: Run the SQL script from `Backend/database_setup.sql` in Supabase SQL Editor
- **Permission errors**: Make sure you're using the correct keys (anon key for reads, service key for writes)

## Next Steps

1. Customize the content in the admin panel
2. Modify styles in `Frontend/src/styles.css`
3. Add more section types by creating new components
4. Deploy to production when ready

## Production Deployment

### Backend
- Use a production ASGI server like Gunicorn with Uvicorn workers
- Set up environment variables securely
- Configure proper CORS origins

### Frontend
- Build for production: `npm run build`
- Deploy the `dist/portfolio` folder to a static hosting service
- Update `environment.prod.ts` with your production API URL

### Database
- Supabase handles the database hosting automatically
- Consider setting up database backups in Supabase dashboard

