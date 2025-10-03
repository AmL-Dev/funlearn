# ADK Integration Guide for FunLearn Kids

## Overview

This guide explains how to integrate your FunLearn Kids project with Google Cloud's Agent Development Kit (ADK) to enable AI-powered lesson processing and game generation.

## Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Next.js App   │───▶│   API Routes    │───▶│   ADK Agent     │
│   (Frontend)    │    │   (/api/*)      │    │   (Python)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

**Simplified Integration**: Direct HTTP API calls to ADK agent without complex middleware.

## Setup Instructions

### 1. Install Dependencies

Install the basic dependencies:

```bash
npm install
```

**Note**: This simplified integration doesn't require additional CopilotKit packages. The ADK integration is handled through direct API calls to your ADK agent.

### 2. Environment Configuration

Copy the environment template and configure your ADK agent:

```bash
cp env.example .env.local
```

Update `.env.local` with your ADK agent details:

```env
ADK_AGENT_URL=http://localhost:8000
ADK_API_KEY=your_adk_api_key_here
GOOGLE_CLOUD_PROJECT_ID=your_project_id
```

### 3. ADK Agent Setup

#### Option A: Use the Sample Agent

Run the provided Python agent:

```bash
# Install Python dependencies
pip install flask

# Run the ADK agent
python adk-agent-example.py
```

#### Option B: Deploy to Google Cloud

1. **Create a Google Cloud Project**
2. **Enable ADK API**
3. **Deploy your agent to Cloud Run or App Engine**
4. **Update the `ADK_AGENT_URL` in your environment**

### 4. Test the Integration

1. Start your Next.js app:
   ```bash
   npm run dev
   ```

2. Start the ADK agent:
   ```bash
   python adk-agent-example.py
   ```

3. Test the connection:
   ```bash
   curl http://localhost:3000/api/copilotkit
   ```

## API Endpoints

### `/api/copilotkit`
- **Purpose**: Main CopilotKit integration endpoint
- **Methods**: GET, POST
- **Function**: Connects frontend to ADK agent

### `/api/process-lesson`
- **Purpose**: Process uploaded lessons with AI
- **Methods**: POST
- **Input**: FormData with file and grade
- **Output**: Processed lesson with generated games

## ADK Agent Features

The sample ADK agent (`adk-agent-example.py`) provides:

### Core Functionality
- **File Processing**: Handles PDF, images, and text files
- **Content Analysis**: Determines subject (math, reading, science)
- **Game Generation**: Creates age-appropriate educational games
- **Grade Adaptation**: Adjusts difficulty based on grade level

### Generated Game Types
- **Math Games**: Quizzes, puzzles, memory games
- **Reading Games**: Vocabulary, comprehension, word puzzles
- **Science Games**: Exploration activities, experiments, fact quizzes

## Integration Flow

1. **User uploads lesson** → Frontend sends file to `/api/process-lesson`
2. **API processes file** → Converts to base64 and sends to ADK agent
3. **ADK agent analyzes** → Determines subject and difficulty
4. **Games are generated** → Creates educational activities
5. **Results returned** → Frontend displays generated games

## Customization

### Adding New Game Types

Modify the `game_templates` in the ADK agent:

```python
self.game_templates['new_subject'] = {
    'game_type': 'Template for grade {grade} with {difficulty} level'
}
```

### Extending Content Analysis

Enhance the `_analyze_subject` method to recognize more content types:

```python
def _analyze_subject(self, content: str) -> str:
    # Add your custom analysis logic
    pass
```

## Deployment

### Local Development
- Next.js app: `http://localhost:3000`
- ADK agent: `http://localhost:8000`

### Production Deployment

1. **Deploy ADK agent to Google Cloud Run**
2. **Update environment variables with production URLs**
3. **Deploy Next.js app to Vercel**

## Troubleshooting

### Common Issues

1. **Connection Refused**
   - Ensure ADK agent is running on correct port
   - Check `ADK_AGENT_URL` in environment

2. **File Processing Errors**
   - Verify file types are supported
   - Check file size limits

3. **Game Generation Issues**
   - Review ADK agent logs
   - Ensure proper content analysis

### Debug Mode

Enable debug logging in the ADK agent:

```python
app.run(host='0.0.0.0', port=8000, debug=True)
```

## Security Considerations

1. **API Key Protection**: Store ADK API keys securely
2. **File Validation**: Validate uploaded files
3. **Rate Limiting**: Implement rate limiting for API calls
4. **CORS Configuration**: Configure CORS for production

## Next Steps

1. **Enhance AI Processing**: Add more sophisticated content analysis
2. **Real-time Updates**: Implement WebSocket connections
3. **Analytics**: Add usage tracking and analytics
4. **Multi-language**: Support multiple languages
5. **Advanced Games**: Create more complex educational games

## Support

For ADK-specific issues:
- [Google Cloud ADK Documentation](https://cloud.google.com/adk)
- [CopilotKit Documentation](https://docs.copilotkit.ai/)

For FunLearn Kids issues:
- Check the project README
- Review API endpoint logs
- Test ADK agent connectivity
