# Educational Game Generator

An AI-powered system that transforms lecture PDFs into interactive educational games using Google's Agent Development Kit (ADK).

## Overview

This application analyzes uploaded lecture documents and generates custom JavaScript-based interactive games to enhance learning through gamification.

## Project Structure

```
haiku-app/
├── app/                 # Core agent application
│   ├── agent.py         # Main game generation agent
│   ├── server.py        # FastAPI backend server
│   └── sub_agents/      # Specialized validation agents
├── deployment/          # Infrastructure and CI/CD
├── notebooks/           # Development and evaluation notebooks
├── tests/               # Unit, integration, and load tests
└── pyproject.toml       # Dependencies and configuration
```

## Requirements

Before you begin, ensure you have:
- **uv**: Python package manager (used for all dependency management in this project) - [Install](https://docs.astral.sh/uv/getting-started/installation/) ([add packages](https://docs.astral.sh/uv/concepts/dependencies/) with `uv add <package>`)
- **Google Cloud SDK**: For GCP services - [Install](https://cloud.google.com/sdk/docs/install)
- **Terraform**: For infrastructure deployment - [Install](https://developer.hashicorp.com/terraform/downloads)
- **make**: Build automation tool - [Install](https://www.gnu.org/software/make/) (pre-installed on most Unix-based systems)


## Quick Start

### Local Development
```bash
# Install dependencies
make install

# Start local backend server
make local-backend
```

### API Testing
```bash
# Interactive web interface
make playground

# Run tests
make test
```

## Available Commands

| Command              | Description                                        |
| -------------------- | -------------------------------------------------- |
| `make install`       | Install Python dependencies                        |
| `make local-backend` | Start local development server                     |
| `make playground`    | Launch web interface for testing                  |
| `make backend`       | Deploy to Cloud Run                               |
| `make test`          | Run unit and integration tests                     |
| `make lint`          | Code quality checks                                |

See [Makefile](Makefile) for complete command reference.


## How It Works

1. **PDF Upload**: Upload a lecture PDF document
2. **Text Extraction**: Extract readable text content using pdf-parse
3. **Game Generation**: AI agent analyzes content and generates interactive JavaScript games
4. **Game Execution**: Play the generated games in a secure iframe sandbox

## Development Workflow

1. **Development**: Modify `app/agent.py` for game generation logic
2. **Testing**: Use `make playground` for interactive debugging
3. **Deployment**: Run `make backend` to deploy to Cloud Run
4. **Monitoring**: Track performance through Cloud Logging and Tracing


## Deployment

### Quick Deploy
```bash
gcloud config set project <your-project-id>
make backend
```

### Infrastructure Setup
For comprehensive CI/CD setup including staging/production environments, see [deployment/README.md](deployment/README.md).

## Monitoring

- **Cloud Logging**: All requests and agent interactions
- **Cloud Tracing**: Performance monitoring  
- **BigQuery**: Long-term analytics storage
- **Dashboard**: [Looker Studio template](https://lookerstudio.google.com/reporting/46b35167-b38b-4e44-bd37-701ef4307418/page/tEnnC)
