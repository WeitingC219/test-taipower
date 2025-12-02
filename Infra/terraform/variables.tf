variable "region" {
  type    = string
  default = "ap-southeast-1"
}

variable "instance_type" {
  type    = string
  default = "t3.micro"
}

variable "image" {
  description = "Full container image with tag, e.g. ghcr.io/xxx/app:release-1.2.3-abc1234"
  type        = string
}

variable "ghcr_username" {
  type      = string
  sensitive = true
}

variable "ghcr_token" {
  type      = string
  sensitive = true
}