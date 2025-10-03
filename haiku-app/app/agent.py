import os

import google.auth
from google.adk.agents import Agent
# UPDATE: Import AgentTool
from google.adk.tools.agent_tool import AgentTool

_, project_id = google.auth.default()
os.environ.setdefault("GOOGLE_CLOUD_PROJECT", project_id)
os.environ.setdefault("GOOGLE_CLOUD_LOCATION", "global")
os.environ.setdefault("GOOGLE_GENAI_USE_VERTEXAI", "True")

# UPDATE: Import the game validator sub-agent
from .sub_agents.game_validator.agent import game_validator_agent

# UPDATE: Additional instruction line at the end of the prompt
PROMPT = """
You are a JavaScript educational game generator. 
You receive lecture content and transform it into interactive JavaScript games.
Your goal is to make learning engaging through gamification.

Create different types of games based on the content:
1. Quiz games for factual content
2. Memory games for concepts
3. Puzzle games for problem-solving
4. Simulation games for processes

Always generate clean, executable JavaScript code that runs in a browser environment.
The code should be self-contained and include HTML, CSS, and JavaScript.
Use modern web APIs, create interactive elements, and provide feedback to users.
Keep games simple but engaging.

If the user asks you to validate the game code, use the game_validator_agent tool.
"""

def validate_game_code(code: str) -> str:
    """Validates JavaScript game code for errors and provides improvement suggestions."""
    try:
        # Basic syntax validation
        if 'function' not in code and 'const' not in code and 'let' not in code:
            return "Invalid: Code should contain JavaScript functions or variables"
        
        if code.count('{') != code.count('}'):
            return "Invalid: Mismatched braces in code"
            
        if code.count('(') != code.count(')'):
            return "Invalid: Mismatched parentheses in code"
            
        return "Valid: JavaScript code structure looks good"
    except Exception as e:
        return f"Invalid: {str(e)}"

root_agent = Agent(
    name="root_agent",
    model="gemini-2.5-flash",
    instruction=PROMPT,
    tools=[
        # UPDATE: Add validator agent as an AgentTool
        AgentTool(agent=game_validator_agent),
        validate_game_code
        ],
)