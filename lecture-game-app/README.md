# Lecture Game Generator Frontend

Next.js web application that transforms lecture PDFs into interactive JavaScript educational games using AI-powered backend systems.

## Features

- **PDF Upload**: Upload lecture PDFs and extract text automatically
- **AI Game Generation**: Connects to Google ADK backend for game creation
- **Interactive Game Playground**: Secure iframe execution of generated games
- **Modern UI**: Responsive interface with Tailwind CSS
- **Fallback Generator**: Works offline with local game generation

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **PDF Processing**: pdf-parse library  
- **AI Backend**: Google ADK with Gemini models
- **Game Execution**: Secure iframe sandbox

## Installation

```bash
npm install
```

## Environment Setup

```bash
npm run setup
```
Creates `.env.local` with default backend URL.

## Quick Start

### Standalone Mode
```bash
npm run dev:local
```
Visit `http://localhost:3001` - includes fallback game generator.

### With Backend
1. Start backend: `cd ../lecture-game-backend && make local-backend`
2. Start frontend: `npm run dev:local`
3. Cloud Run service: `https://your-service.run.app/api/extract-text`
4. Frontend: `http://localhost:3000`

## How It Works

1. **Upload PDF**: Drag & drop or select lecture PDF
2. **Extract Text**: System processes PDF using pdf-parse
3. **Generate Game**: AI analyzes content and creates JavaScript games
4. **Play**: Games execute in secure iframe sandbox

## Game Types

- **Quiz Games**: Multiple choice and fill-in-the-blank
- **Memory Games**: Concept matching
- **Puzzle Games**: Problem-solving scenarios
- **Simulation Games**: Interactive demonstrations

## Development

```
src/
├── app/
│   ├── api/              # API endpoints
│   │   ├── extract-text/  # PDF processing
│   │   └── generate-game/ # Game generation
│   └── page.tsx          # Main UI
```

## API Endpoints

- `POST /api/extract-text` - Extract text from uploaded PDFs
- `POST /api/generate-game` - Generate JavaScript games from content

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_BACKEND_URL` | Backend API URL | `http://localhost:8000` |

## Development Commands

```bash
npm run dev:local    # Development server
npm run build        # Production build
npm run lint         # Code linting
npm run setup        # Create .env.local
```

## Troubleshooting

**Backend Connection Issues:**
- Ensure ADK backend is running: `cd ../lecture-game-backend && make local-backend`
- Check `.env.local` for correct `NEXT_PUBLIC_BACKEND_URL`
- App automatically falls back to local generation if backend unavailable

**PDF Issues:**
- Ensure PDF is not password-protected
- Try smaller files first
- Check browser console for errors

---

**Upload your PDF and start creating interactive educational games!**