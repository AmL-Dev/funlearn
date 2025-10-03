# 🚀 Complete Setup Guide: Lecture Game Generator

This guide helps you run the complete Lecture Game Generator system with both the Next.js frontend and the modified Google ADK backend.

## 📁 Project Structure

```
funlearn/
├── haiku-app/                    # Modified Google ADK backend
│   ├── app/
│   │   ├── agent.py             # Main agent (now generates games!)
│   │   ├── server.py            # FastAPI server
│   │   └── sub_agents/
│   │       └── game_validator/  # New game validation agent
├── lecture-game-app/            # Next.js frontend
│   ├── src/app/
│   │   ├── page.tsx             # Main UI
│   │   └── api/                 # API routes
└── SETUP_GUIDE.md               # This file
```

## 🛠️ Prerequisites

Before starting, ensure you have:

- **Node.js** (v18 or later) - [Download](https://nodejs.org/)
- **Python** (v3.10+) - [Download](https://python.org/)
- **uv** (Python package manager) - [Install Guide](https://docs.astral.sh/uv/getting-started/installation/)
- **Google Cloud SDK** - [Install Guide](https://cloud.google.com/sdk/docs/install)

## 🚶‍♂️ Step-by-Step Setup

### 1. Backend Setup (Modified ADK Agent)

```bash
# Navigate to the haiku-app directory
cd haiku-app

# Install Python dependencies
make install

# Set up Google Cloud credentials
gcloud auth login
gcloud auth application-default login

# Configure your project (replace with your GCP project ID)
export GOOGLE_CLOUD_PROJECT=your-project-id
```

**What we modified:**
- Changed `app/agent.py` from haiku generator → JavaScript game generator
- Created `app/sub_agents/game_validator/` for code validation
- Updated agent prompts to focus on educational game generation

### 2. Frontend Setup (Next.js App)

```bash
# Navigate to the lecture-game-app directory
cd ../lecture-game-app

# Install dependencies
npm install

# Set up environment variables
npm run setup
```

**Features included:**
- PDF upload and text extraction interface
- Beautiful modern UI with Tailwind CSS
- Secure iframe game execution
- Fallback game generator (works without backend)

### 3. Run Both Applications

**Terminal 1 - Start Backend:**
```bash
cd haiku-app
make local-backend
```
✅ Backend runs on: `http://localhost:8000`

**Terminal 2 - Start Frontend:**
```bash
cd lecture-game-app
npm run dev:local
```
✅ Frontend runs on: `http://localhost:3001`

## 🎮 Usage

1. **Access the App**: Visit `http://localhost:3001`
2. **Upload PDF**: Select a lecture PDF file
3. **Extract Text**: Click "Extract Text" to process the PDF
4. **Generate Game**: Click "Generate Game" to create an interactive game
5. **Play**: The generated game runs directly in the browser!

## 🔧 Configuration Options

### Backend Configuration
Edit `haiku-app/app/agent.py` to customize:
- Game types generated
- Code validation rules
- AI model parameters

### Frontend Configuration
Edit `lecture-game-app/.env.local`:
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

## 🧪 Testing

### Test PDF Processing
```bash
cd lecture-game-app
npm run dev:local
# Upload any PDF file and test text extraction
```

### Test Backend Without PDF
```bash
cd haiku-app
make local-backend
# Visit http://localhost:8000/docs for API documentation
```

### Test AI Game Generation
- Use the frontend to upload a PDF
- Check if game generation uses backend (check network tab for API calls)
- Fallback generator should work even if backend is offline

## 🐛 Troubleshooting

### Common Issues

**1. "Backend Connection Failed"**
- Ensure `make local-backend` is running
- Check `NEXT_PUBLIC_BACKEND_URL` in `.env.local`
- App automatically falls back to local generation

**2. "PDF Upload Not Working"**
- Ensure PDF is not password-protected
- Try smaller PDF files first
- Check browser console for errors

**3. "Game Not Displaying"**
- Check that the generated JavaScript code is valid
- Look for syntax errors in browser console
- Iframe sandbox should isolate execution safely

**4. "Python/UV Issues"**
```bash
# Reinstall Python dependencies
cd haiku-app
make install

# Check Python version (should be 3.10+)
python --version
```

**5. "Google Cloud Authentication Issues"**
```bash
# Re-authenticate
gcloud auth login
gcloud auth application-default login
gcloud config set project YOUR-PROJECT-ID
```

## 🔄 Development Mode

### Hot Reload (Recommended)
Both backend and frontend support hot reload:
- Backend: `make local-backend` (auto-restarts on file changes)
- Frontend: `npm run dev:local` (Hot reload with Turbopack)

### Making Changes

**Backend Changes:**
1. Modify `haiku-app/app/agent.py`
2. Backend automatically restarts
3. Test via frontend or API docs

**Frontend Changes:**
1. Modify `lecture-game-app/src/app/`
2. Pages auto-reload in browser
3. No restart needed

## 🚀 Production Deployment

### Option 1: Vercel + Google Cloud Run
- Deploy frontend to Vercel
- Deploy backend to Google Cloud Run
- Update `NEXT_PUBLIC_BACKEND_URL`

### Option 2: Full Google Cloud
- Use existing Terraform setup in `haiku-app/deployment/`
- Deploy both frontend and backend to Cloud Run
- Configure custom domains

## 📊 Monitoring

The backend includes built-in monitoring:
- **Cloud Logging**: All API requests and agent interactions
- **Cloud Tracing**: Performance monitoring
- **BigQuery**: Long-term analytics storage

## 🎯 Next Steps

1. **Enhance Game Types**: Add more sophisticated game mechanics
2. **User Accounts**: Add authentication and game history
3. **Collaboration**: Allow multiple users to play games together
4. **Analytics**: Track learning effectiveness
5. **Mobile**: Optimize for mobile devices

## 📝 Key Files Modified

### Backend Changes
- `haiku-app/app/agent.py` - Main agent prompts and tools
- `haiku-app/app/sub_agents/game_validator/agent.py` - New validation system
- Existing `server.py` and infrastructure remain unchanged

### Frontend Created
- `lecture-game-app/src/app/page.tsx` - Complete UI implementation
- `lecture-game-app/src/app/api/extract-text/route.ts` - PDF processing
- `lecture-game-app/src/app/api/generate-game/route.ts` - Backend integration

---

**🎉 You're all set! Start by uploading a PDF lecture and watching it transform into fascinating educational games!**
