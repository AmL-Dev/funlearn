# Load Testing

Load testing framework using Locust for the lecture game generator application.

## Prerequisites

- FastAPI server running locally
- Python environment with Locust

## Local Setup

### 1. Start Backend Server
```bash
uv run uvicorn app.server:app --host 0.0.0.0 --port 8000 --reload
```

### 2. Install Locust
```bash
python3 -m venv .locust_env
source .locust_env/bin/activate
pip install locust==2.31.1
```

### 3. Run Load Test
```bash
locust -f tests/load_test/load_test.py \
  -H http://127.0.0.1:8000 \
  --headless \
  -t 30s -u 10 -r 2 \
  --csv=tests/load_test/.results/results \
  --html=tests/load_test/.results/report.html
```

**Parameters:**
- `-t 30s`: Test duration (30 seconds)
- `-u 10`: Maximum concurrent users
- `-r 2`: Users spawned per second

**Results:** Generated in `tests/load_test/.results/`

## Remote Testing (Cloud Run)

Test against deployed Cloud Run instances.

### Prerequisites
- Cloud Run Invoker role (`roles/run.invoker`)
- Locust environment (see local setup)

### Setup

**1. Get Service URL:**
```bash
export RUN_SERVICE_URL=https://your-cloud-run-service-url.run.app
```

**2. Get Authentication Token:**
```bash
export _ID_TOKEN=$(gcloud auth print-identity-token -q)
```

### Run Test
```bash
locust -f tests/load_test/load_test.py \
  -H $RUN_SERVICE_URL \
  --headless \
  -t 30s -u 60 -r 2 \
  --csv=tests/load_test/.results/results \
  --html=tests/load_test/.results/report.html
```

**Note:** Higher user count (60) for remote testing due to better infrastructure.
