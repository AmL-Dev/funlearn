# 📚 Lecture Game Generator

A Next.js application that transforms lecture PDFs into interactive JavaScript educational games using AI-powered agentic systems.

## 🚀 Features

- **PDF Upload & Text Extraction**: Upload lecture PDFs and extract text automatically
- **AI Game Generation**: Uses Google's Agent Development Kit (ADK) to generate educational games
- **Interactive Game Playground**: Execute generated JavaScript games in a secure iframe sandbox
- **Modern UI**: Beautiful, responsive interface built with Tailwind CSS
- **Real-time Generation**: Fast PDF processing and game generation

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **PDF Processing**: pdf-parse library
- **AI Backend**: Google ADK with Gemini 2.5 Flash model
- **Game Execution**: Secure iframe sandbox

## 📦 Installation

1. **Clone and Install Dependencies**:
   ```bash
   cd lecture-game-app
   npm install
   ```

2. **Environment Setup**:
   ```bash
   npm run setup
   ```
   This creates a `.env.local` file with default backend URL.

3. **Configure Backend URL** (Optional):
   Edit `.env.local` to point to your backend server:
   ```env
   NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
   ```

## 🚶‍♂️ Quick Start

### Option 1: Standalone Mode
The app includes a fallback game generator that works without the backend:

```bash
npm run dev:local
```

Visit `http://localhost:3001` and upload a PDF to create a quiz game.

### Option 2: Full Setup with Backend
1. **Start the ADK Backend**:
   ```bash
   cd ../haiku-app
   make local-backend
   ```

2. **Start the Frontend**:
   ```bash
   npm run dev:local
   ```

3. **Access the Application**:
   - Frontend: `http://localhost:3001`
   - Backend: `http://localhost:8000`

## 🎮 How It Works

### Step 1: Upload PDF
- Drag and drop or select a PDF lecture file
- The system extracts text using pdf-parse

### Step 2: Extract Text
- Automatically processes the PDF and extracts readable text
- Displays a preview of the extracted content

### Step 3: Generate Game
- Sends extracted text to the AI agent
- The agent analyzes the content and generates appropriate JavaScript games
- Supports multiple game types: quizzes, memory games, puzzles, simulations

### Step 4: Play & Enjoy
- Generated games execute in a secure iframe
- Interactive and engaging learning experiences
- Completely self-contained HTML/CSS/JavaScript

## 🎯 Game Types

The AI agent can generate various educational games based on content:

- **Quiz Games**: Multiple choice and fill-in-the-blank questions
- **Memory Games**: Concept matching and identification
- **Puzzle Games**: Problem-solving scenarios
- **Simulation Games**: Interactive process demonstrations

## 🔧 Development

### Project Structure
```
src/
├── app/
│   ├── api/
│   │   ├── extract-text/     # PDF text extraction endpoint
│   │   └── generate-game/     # Game generation endpoint
│   ├── page.tsx              # Main application page
│   └── layout.tsx            # App layout
├── components/               # Reusable components (if any)
└── styles/                   # Global styles
```

### API Endpoints

#### POST `/api/extract-text`
Extracts text from uploaded PDF files.

**Request**: `FormData` with PDF file
**Response**: 
```json
{
  "text": "extracted text content",
  "pages": 5
}
```

#### POST `/api/generate-game`
Generates JavaScript games from lecture content.

**Request**: 
```json
{
  "lectureContent": "text to convert into a game"
}
```

**Response**: 
```json
{
  "gameScript": "JavaScript game code",
  "message": "Game generated successfully",
  "source": "backend"
}
```

## 🔒 Security

- Games execute in isolated iframes
- No direct file system access
- Sanitized JavaScript execution environment
- Server-side PDF processing

## 🧪 Testing

```bash
# Run linting
npm run lint

# Build for production
npm run build

# Start production server
npm run start
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy via Vercel CLI or GitHub integration
```

### Traditional Deployment
```bash
npm run build
npm run start
```

## 🐛 Troubleshooting

### Backend Connection Issues
- Ensure the ADK backend is running on the correct port
- Check `.env.local` for correct `NEXT_PUBLIC_BACKEND_URL`
- The app will automatically fall back to local generation if backend is unavailable

### PDF Processing Issues
- Ensure PDF is not password-protected
- Try with smaller PDF files first
- Check browser console for error details

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_BACKEND_URL` | FastAPI backend URL | `http://localhost:8000` |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is part of a hackathon demonstration. Please check with project maintainers for licensing terms.

---

**Ready to transform your lectures into interactive learning experiences? Upload your PDF and let the AI create engaging educational games! 🎮**