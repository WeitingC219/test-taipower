terraform {
  required_version = ">= 1.6.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.region
}

# 安全群組：開 HTTP 80，其他全關
resource "aws_security_group" "app_sg" {
  name_prefix = "devsecops-app-"
  description = "Security group for ephemeral app"
  vpc_id      = data.aws_vpc.default.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "devsecops-app-sg"
  }
}

# 取得 default VPC & subnet（簡化用）
data "aws_vpc" "default" {
  default = true
}

data "aws_subnet_ids" "default" {
  vpc_id = data.aws_vpc.default.id
}

# 找一個 Amazon Linux 2023 AMI
data "aws_ami" "amazon_linux" {
  most_recent = true

  owners = ["amazon"]

  filter {
    name   = "name"
    values = ["al2023-ami-*-x86_64"]
  }
}

resource "aws_instance" "app" {
  ami           = data.aws_ami.amazon_linux.id
  instance_type = var.instance_type
  subnet_id     = data.aws_subnet_ids.default.ids[0]
  vpc_security_group_ids = [aws_security_group.app_sg.id]

  associate_public_ip_address = true

  user_data = <<-EOF
    #!/bin/bash
    dnf update -y
    dnf install -y docker
    systemctl enable docker
    systemctl start docker

    # Login GHCR (用 PAT 的話要自己改環境變數)
    echo "${var.ghcr_token}" | docker login ghcr.io -u ${var.ghcr_username} --password-stdin

    # 拉 image 並跑在 3000 port，對外 80
    docker run -d \
      --name app \
      -p 80:3000 \
      ${var.image}
  EOF

  tags = {
    Name = "devsecops-ephemeral-app"
  }
}

output "app_url" {
  value = "http://${aws_instance.app.public_dns}"
}