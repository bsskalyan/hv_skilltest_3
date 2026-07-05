# Multi-Service Node.js E-commerce App (Docker + Terraform + AWS)

This repository deploys a 5-service Node.js application:
- `user-service` (port 3001)
- `products-service` (port 3002)
- `orders-service` (port 3003)
- `cart-service` (port 3004)
- `frontend-service` (port 3000, exposed publicly via EC2 port 80)

Terraform provisions AWS networking and EC2, then `user_data` installs Docker and runs all containers.

## 1) Build and Test Locally

From repository root:

```bash
docker compose up --build
```

Validate endpoints:
- Frontend: http://localhost:3000
- User: http://localhost:3001
- Products: http://localhost:3002
- Orders: http://localhost:3003
- Cart: http://localhost:3004

Expected sample messages include `"User Service Running"` and `"Frontend is Live"`.

## 2) Tag and Push Images to DockerHub

DockerHub username is prefilled as `bsskalyan`.

```bash
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

PowerShell shortcut from repo root:

```powershell
./scripts/build-and-push.ps1
```

## 3) Provision Infrastructure with Terraform

```bash
cd infra/terraform
terraform init
```

Create your variables file:

```bash
cp terraform.tfvars.example terraform.tfvars
```

`terraform.tfvars` is already prefilled in this repo with `dockerhub_username = "bsskalyan"`.

Edit `terraform.tfvars` and set at least:
- `dockerhub_username = "bsskalyan"`
- optionally `key_name` for SSH
- optionally `ssh_cidr` to your public IP `/32`

Deploy:

```bash
terraform apply -auto-approve
```

## 4) Access and Verify Deployment

Print outputs:

```bash
terraform output
```

Use `frontend_url` in a browser. You should see **Frontend is Live**.

Optional backend checks from your machine:
- `http://<PUBLIC_IP>:3001`
- `http://<PUBLIC_IP>:3002`
- `http://<PUBLIC_IP>:3003`
- `http://<PUBLIC_IP>:3004`

## Notes

- Uses Ubuntu 22.04 AMI.
- Security Group allows:
  - inbound `80` (public)
  - inbound `22` (configurable by `ssh_cidr`)
  - internal `3001-3004` for service communication.
- All infrastructure is reproducible via `terraform apply`.

## Cleanup

```bash
terraform destroy -auto-approve
```

## Exam Submission Checklist

- `docker compose up --build` works locally.
- All 5 images are pushed under `bsskalyan/*` and are public.
- `terraform apply -auto-approve` completes successfully.
- `terraform output frontend_url` opens and shows **Frontend is Live**.
- Backend checks return sample responses:
  - `http://<PUBLIC_IP>:3001`
  - `http://<PUBLIC_IP>:3002`
  - `http://<PUBLIC_IP>:3003`
  - `http://<PUBLIC_IP>:3004`
