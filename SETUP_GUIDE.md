# Complete Setup Guide: Lecture Game Generator

Full-stack application that converts lecture ISBNs into educational games using Next.js frontend and Google ADK backend.

## Project Structure

```
funlearn/
├── lecture-game-backend/ # AI Game Generation Backend (ADK)
│   ├── app/game_generator.py # Main game generation agent
│   └── app/server.py     # FastAPI server
├── lecture-game-app/     # Web Frontend (Next.js)
│   ├── src/app/page.tsx  # Main UI
│   └── src/app/api/      # API endpoints
└── SETUP_GUIDE.md
```

## Prerequisites

- **Node.js** (v18+) - [Download](https://nodejs.org/)
- **Python** (v3.10+) - [Download](https://python.org/)
- **uv** - [Install Guide](https://docs.astral.sh/uv/getting-started/installation/)
- **Google Cloud SDK** - [Install Guide](https://cloud.google.com/sdk/docs/install)

## Setup Instructions

### 1. Backend Setup

```bash
cd lecture-game-backend

# Install dependencies
make install

# Configure Google Cloud
gcloud auth login
gcloud auth application-default login
export GOOGLE_CLOUD_PROJECT=your-project-id
```

**Core Components:**
- `app/game_generator.py` - Main game generation agent
- `app/sub_agents/game_validator/` - Code validation system

### 2. Frontend Setup

```bash
cd lecture-game-app

# Install dependencies
npm install

# Environment setup (optional)
npm run setup
```

**Features:**
- PDF upload and text extraction
- Modern UI with Tailwind CSS
- Secure iframe game execution
- Fallback generator (works without backend)

### 3. Running Both Applications

**Start Backend:**
```bash
cd lecture-game-backend && make local-backend
# Runs on: http://localhost:8000
```

**Start Frontend:**
```bash
cd lecture-game-app && npm run dev:local
# Runs on: http://localhost:3001
```

## Usage

1. Visit `http://localhost:3001`
2. Upload a lecture PDF
3. Click "Extract Text" 
4. Click "Generate Game"
5. Play the generated game in your browser

## Configuration

### Backend Configuration
Edit `lecture-game-backend/app/game_generator.py` to customize:
- Game types generated
- Code validation rules
- AI model parameters

### Frontend Configuration
Edit `lecture-game-app/.env.local`:
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

## Testing

### Frontend Testing
```bash
cd lecture-game-app && npm run dev:local
# Upload PDF and test functionality
```

### Backend Testing
```bash
cd lecture-game-backend && make local-backend
# Visit http://localhost:8000/docs for API docs
```

## Troubleshooting

**Backend Connection Issues:**
- Ensure `make local-backend` is running
- Check `NEXT_PUBLIC_BACKEND_URL` in `.env.local`

**PDF Upload Issues:**
- Ensure PDF is not password-protected
- Try smaller files first
- Check browser console for errors

**Authentication Issues:**
```bash
gcloud auth login
gcloud auth application-default login
gcloud config set project YOUR-PROJECT-ID
```

## Development

Both backend and frontend support hot reload:
- Backend: `make local-backend` (auto-restarts on changes)
- Frontend: `npm run dev:local` (hot reload)

## Deployment

### Quick Deploy
```bash
# Backend to Cloud Run
cd lecture-game-backend && make backend

# Frontend to Vercel (optional)
cd lecture-game-app && npm run build
```

### Production Setup
See [lecture-game-backend/deployment/README.md](lecture-game-backend/deployment/README.md) for full infrastructure setup.

---

**Ready to transform your lectures into educational games!**
