# Portfolio Frontend

Angular 19 frontend for the portfolio website.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Update `src/environments/environment.ts` with your API URL if needed (defaults to `http://localhost:8000`)

3. Run the development server:
```bash
npm start
```

The application will be available at `http://localhost:4200`

## Project Structure

- `src/app/core/services/` - API service for backend communication
- `src/app/features/` - Feature modules (home, admin, about, skills, etc.)
- `src/app/shared/components/` - Shared components (header, footer)
- `src/environments/` - Environment configuration

## Features

- Modular architecture with feature-based components
- Dynamic section rendering based on section type
- Admin panel for managing portfolio sections
- Responsive design with modern UI
- Interactive components with animations

