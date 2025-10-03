# Google Agent Development Kit (ADK) Quick Reference

Essential guide for building AI agents with Google's Agent Development Kit.

## Prerequisites

- **uv**: Python package manager
- **gcloud**: Google Cloud CLI
- **terraform**: Infrastructure management
- **python 3.10+**: Required version

## Project Structure

```
haiku-app/
├── app/
│   ├── agent.py          # Main agent definition
│   ├── server.py         # FastAPI server
│   └── sub_agents/       # Specialized agents
├── deployment/           # Terraform configurations
└── tests/               # Test suites
```

## Quick Start

### Install Dependencies
```bash
make install
```

### Configure Authentication
```bash
gcloud auth login
gcloud auth application-default login
export GOOGLE_CLOUD_PROJECT=your-project-id
```

### Run Locally
```bash
make local-backend
# Visit http://localhost:8000/docs
```

## Core Concepts

- **Agent**: The main AI unit (`LlmAgent` or `BaseAgent`)
- **Tool**: Function providing external capabilities
- **Session**: Stateful conversation with history
- **State**: Key-value storage for session data
- **Memory**: Long-term knowledge beyond single session

## Building Agents

### Basic Agent
```python
from google.adk.agents import Agent

root_agent = Agent(
    name="game_generator",
    model="gemini-2.5-flash",
    instruction="You are a game generation specialist.",
    description="Creates interactive educational games",
    tools=[your_tool_function]
)
```

### Structured Output
```python
from pydantic import BaseModel, Field

class GameResponse(BaseModel):
    title: str = Field(description="Game title")
    instructions: str = Field(description="Game instructions")
    code: str = Field(description="JavaScript game code")

agent = Agent(
    model="gemini-2.5-flash",
    output_schema=GameResponse,
    output_key="generated_game"
)
```

## Common Commands

| Command | Description |
|---------|-------------|
| `make install` | Install dependencies |
| `make local-backend` | Start development server |
| `make playground` | Launch web interface |
| `make backend` | Deploy to Cloud Run |
| `make test` | Run test suite |

## Tools Development

```python
from google.adk.tools import ToolContext

def generate_game(content: str, game_type: str, tool_context: ToolContext) -> dict:
    """Generates an educational game from content.
    
    Args:
        content: Lecture material to convert
        game_type: Type of game to create
        
    Returns:
        dict: Game data with status and code
    """
    # Tool implementation
    return {
        "status": "success",
        "game_code": generated_javascript,
        "title": game_title
    }
```

## Workflow Agents

### Sequential Execution
```python
from google.adk.agents import SequentialAgent

pipeline = SequentialAgent(
    name="game_pipeline",
    sub_agents=[analyzer_agent, generator_agent, validator_agent]
)
```

### Parallel Execution
```python
from google.adk.agents import ParallelAgent

analyzer = ParallelAgent(
    name="parallel_analysis",
    sub_agents=[content_analyzer, difficulty_analyzer]
)
```

## Testing

### Programmatic Testing
```python
async def test_agent():
    session_service = InMemorySessionService()
    runner = Runner(agent=root_agent, session_service=session_service)
    
    async for event in runner.run_async(
        user_id="test",
        session_id="test",
        new_message=Content(parts=[Part(text="Generate a math quiz")]
    ):
        if event.is_final_response():
            print(event.content.parts[0].text)
```

### Evaluation Sets
Create `tests/my_agent.evalset.json`:
```json
{
  "eval_set_id": "game_generator_test",
  "eval_cases": [{
    "conversation": [{
      "user_content": {"parts": [{"text": "Create a physics game"}]},
      "final_response": {"parts": [{"text": "Generated game..."}]}
    }]
  }]
}
```

Run evaluation:
```bash
adk eval tests/my_agent.evalset.json
```

## Deployment

### Cloud Run
```bash
make backend
```

### Agent Engine (Managed)
```bash
adk deploy agent_engine --project your-project
```

### Terraform Infrastructure
```bash
cd deployment
terraform init
terraform apply
```

## Troubleshooting

**Authentication Issues:**
```bash
gcloud auth login
gcloud auth application-default login
gcloud config set project YOUR-PROJECT-ID
```

**Model Issues:**
- Use `gemini-2.5-flash` for efficiency
- Use `gemini-2.5-pro` for complex tasks
- Check GOOGLE_CLOUD_PROJECT environment variable

**Tool Development:**
- Always add `description` field to tool functions
- Use TypeScript-style type hints
- Return dict with status field

## Best Practices

1. **Start Simple**: Begin with `LlmAgent`, add tools gradually
2. **Clear Instructions**: Be specific about agent behavior
3. **Error Handling**: Implement robust try/catch in tools
4. **Testing**: Write tests for tools and agent flows
5. **Documentation**: Document tool purpose and parameters

## Resources

- [ADK Samples Repository](https://github.com/google/adk-samples)
- [Official Documentation](https://googlecloudplatform.github.io/agent-starter-pack/)
- [Gemini Models Guide](https://ai.google.dev/docs/gemini_api_overview)

---

For complete reference, see the original extensive documentation in repository history.