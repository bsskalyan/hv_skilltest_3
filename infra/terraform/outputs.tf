output "instance_public_ip" {
  description = "Public IP of the EC2 instance hosting the app"
  value       = aws_instance.app.public_ip
}

output "instance_public_dns" {
  description = "Public DNS of the EC2 instance hosting the app"
  value       = aws_instance.app.public_dns
}

output "frontend_url" {
  description = "Public URL of frontend service"
  value       = "http://${aws_instance.app.public_ip}"
}
