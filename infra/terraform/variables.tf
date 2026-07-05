variable "aws_region" {
  description = "AWS region for deployment"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Prefix used for resource names"
  type        = string
  default     = "ecommerce-skilltest"
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.micro"
}

variable "key_name" {
  description = "Optional EC2 key pair name for SSH"
  type        = string
  default     = ""
}

variable "ssh_cidr" {
  description = "CIDR range allowed to SSH"
  type        = string
  default     = "0.0.0.0/0"
}

variable "dockerhub_username" {
  description = "DockerHub username where images are pushed"
  type        = string
}

variable "image_tag" {
  description = "Docker image tag for all services"
  type        = string
  default     = "latest"
}
