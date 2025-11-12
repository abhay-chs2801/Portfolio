# Portfolio Backend API

FastAPI backend for the portfolio website with Supabase integration.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Create a `.env` file based on `.env.example` and add your Supabase credentials:
```
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_key
CORS_ORIGINS=http://localhost:4200
```

3. Run the server:
```bash
uvicorn main:app --reload --port 8000
```

## Database Setup

Create a table in Supabase with the following SQL:

```sql
CREATE TABLE sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    content JSONB NOT NULL,
    section_type TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_section_type ON sections(section_type);
CREATE INDEX idx_order ON sections("order");
```

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

