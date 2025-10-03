# Deployment Guide

Terraform configurations for deploying the lecture game generator to Google Cloud.

## Quick Deploy

Recommended: Use the automated setup:
```bash
uvx agent-starter-pack setup-cicd
```

## Manual Deployment

### Infrastructure Setup
```bash
cd deployment
terraform init
terraform plan -var-file=vars/env.tfvars
terraform apply -var-file=vars/env.tfvars
```

### Deploy Application
```bash
make backend
```

## Documentation

For detailed deployment instructions, see:
**[Agent Starter Pack Deployment Guide](https://googlecloudplatform.github.io/agent-starter-pack/guide/deployment.html)**