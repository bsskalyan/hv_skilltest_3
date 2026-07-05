# Multi-Service Node.js E-commerce App (Terraform + Docker + AWS)

This is my DevOps skill test submission.

I deployed a Node.js e-commerce application with 5 Dockerized services:
- user-service on port 3001
- products-service on port 3002
- orders-service on port 3003
- cart-service on port 3004
- frontend-service on port 3000 (published on EC2 port 80)

DockerHub username used in this project: bsskalyan

## What I built

1. 5 separate Node.js services with their own Dockerfiles
2. Terraform infrastructure on AWS
3. EC2 bootstrap script (user-data) to install Docker and run all containers
4. Public frontend access using EC2 public IP/DNS

## Project folders

- services/user-service
- services/products-service
- services/orders-service
- services/cart-service
- services/frontend-service
- infra/terraform
- docker-compose.yml

## Prerequisites

- Docker
- Terraform 1.5+
- AWS credentials configured locally
- DockerHub account

## Step-by-step process I followed

### 1) Created application services and Dockerfiles

Each service contains:
- index.js
- package.json
- Dockerfile

Sample responses:
- user-service -> User Service Running
- products-service -> Products Service Running
- orders-service -> Orders Service Running
- cart-service -> Cart Service Running
- frontend-service -> Frontend is Live

### 2) Built and tested locally

From root folder:

```bash
docker compose up --build
```

Checked locally:
- http://localhost:3000
- http://localhost:3001
- http://localhost:3002
- http://localhost:3003
- http://localhost:3004

Stopped local containers:

```bash
docker compose down
```

### 3) Tagged and pushed images to DockerHub

```bash
docker login

docker build -t bsskalyan/user-service:latest ./services/user-service
docker build -t bsskalyan/products-service:latest ./services/products-service
docker build -t bsskalyan/orders-service:latest ./services/orders-service
docker build -t bsskalyan/cart-service:latest ./services/cart-service
docker build -t bsskalyan/frontend-service:latest ./services/frontend-service

docker push bsskalyan/user-service:latest
docker push bsskalyan/products-service:latest
docker push bsskalyan/orders-service:latest
docker push bsskalyan/cart-service:latest
docker push bsskalyan/frontend-service:latest
```

Optional shortcut:

```powershell
./scripts/build-and-push.ps1
```

### 4) Provisioned AWS infrastructure using Terraform

Terraform folder:

```bash
cd infra/terraform
```

Initialized and applied:

```bash
terraform init
terraform apply -auto-approve
```

This creates:
- VPC
- public subnet
- internet gateway + route table
- security group
- EC2 instance (Ubuntu 22.04)

### 5) Deployed containers on EC2 using user-data

User-data script actions:
- installs Docker
- starts and enables Docker service
- creates a Docker network
- pulls all 5 images from DockerHub
- runs all 5 containers
- maps frontend from container port 3000 to host port 80

### 6) Verified deployment and accessibility

Terraform outputs:

```bash
terraform output
terraform output frontend_url
terraform output instance_public_ip
terraform output instance_public_dns
```

Opened frontend URL in browser and verified message:
- Frontend is Live

Backend verification from EC2:

```bash
ssh -i <your-key.pem> ubuntu@<PUBLIC_IP>
docker ps
curl http://localhost:3001
curl http://localhost:3002
curl http://localhost:3003
curl http://localhost:3004
```

## Security group rules

- inbound 80 from 0.0.0.0/0 for public frontend
- inbound 22 from configured ssh_cidr
- inbound 3001-3004 allowed only within the same security group (internal service communication)
- all outbound traffic allowed

## Terraform outputs included

- instance_public_ip
- instance_public_dns
- frontend_url

## Reproducibility

This deployment is reproducible with:

```bash
terraform init
terraform apply -auto-approve
```

## Cleanup

```bash
terraform destroy -auto-approve
```

## Final checklist before submission

- all five Docker images are pushed under bsskalyan and public
- terraform apply completes without error
- frontend_url opens from browser
- frontend shows Frontend is Live
- backend containers are running and reachable from EC2 using curl
