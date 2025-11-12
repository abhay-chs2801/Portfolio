# Portfolio Website

A modern, interactive portfolio website built with Angular 19 (frontend) and FastAPI with Python 3.13.9 (backend), using Supabase as the database.

## Features

- **Modular Architecture**: Organized into feature-based modules for better maintainability
- **Dynamic Content Management**: Admin panel to add, edit, and delete portfolio sections
- **Interactive UI**: Modern, responsive design with smooth animations
- **Full-Stack Development**: Complete separation of frontend and backend
- **Database Integration**: Supabase for data persistence

## Tech Stack

### Frontend
- Angular 19
- TypeScript
- CSS3 with modern styling

### Backend
- FastAPI (Python 3.13.9)
- Supabase (PostgreSQL)
- RESTful API

## Project Structure

```
My Portfolio/
├── Frontend/          # Angular 19 application
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/         # Core services
│   │   │   ├── features/     # Feature modules
│   │   │   └── shared/       # Shared components
│   │   └── environments/     # Environment config
│   └── package.json
│
└── Backend/           # FastAPI application
    ├── app/
    │   ├── routers/   # API routes
    │   ├── services/  # Business logic
    │   └── models.py  # Data models
    ├── main.py
    └── requirements.txt
```

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- Python 3.13.9
- Supabase account

### Backend Setup

1. Navigate to the Backend directory:
```bash
cd Backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create a `.env` file:
```bash
cp .env.example .env
```

5. Add your Supabase credentials to `.env`:
```
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_key
CORS_ORIGINS=http://localhost:4200
```

6. Set up the database in Supabase:
   - Go to SQL Editor in Supabase dashboard
   - Run the SQL from `Backend/README.md` to create the `sections` table

7. Initialize data (optional):
```bash
python init_data.py
```

8. Run the server:
```bash
uvicorn main:app --reload --port 8000
```

### Frontend Setup

1. Navigate to the Frontend directory:
```bash
cd Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Update `src/environments/environment.ts` if your API URL is different

4. Run the development server:
```bash
npm start
```

The application will be available at `http://localhost:4200`

## Usage

### Viewing Portfolio
- Navigate to `http://localhost:4200` to view your portfolio
- All active sections will be displayed in order

### Admin Panel
- Navigate to `http://localhost:4200/admin` to manage sections
- Add new sections with custom content
- Edit existing sections
- Delete sections
- Toggle section visibility (active/inactive)

## API Endpoints

### Public Endpoints
- `GET /api/sections/` - Get all active sections
- `GET /api/sections/{section_id}` - Get a specific section
- `GET /api/sections/type/{section_type}` - Get sections by type

### Admin Endpoints
- `POST /api/admin/sections` - Create a new section
- `PUT /api/admin/sections/{section_id}` - Update a section
- `DELETE /api/admin/sections/{section_id}` - Delete a section
- `GET /api/admin/sections` - Get all sections (including inactive)

## Section Types

- `about` - About section
- `skills` - Technical skills
- `accomplishments` - Projects and accomplishments
- `pocs` - Proof of concepts
- `other_skills` - Soft skills
- `opportunities` - Growth opportunities
- `custom` - Custom section type

## Development

### Adding New Section Types

1. Create a new component in `Frontend/src/app/features/`
2. Add the component to `home.component.ts` switch statement
3. Import and use the component

### Modifying Styles

Global styles are in `Frontend/src/styles.css`. Component-specific styles are in each component's `styles` array.

## License

This project is for personal portfolio use.

