variable "aws_region" {
  type    = string
  default = "eu-west-1"
}

variable "project_name" {
  type    = string
  default = "vedant-portfolio"
}

variable "domain_name" {
  type = string
  # example: vedantchavan01.vip
}

variable "www_domain_name" {
  type    = string
  default = ""
  # example: www.vedantchavan01.vip
}

# GitHub repo for OIDC deploy role (ORG/USER and repo name)
variable "github_owner" { type = string }
variable "github_repo"  { type = string }
variable "github_branch" {
  type    = string
  default = "main"
}

# Use aliases only AFTER certificate is ISSUED (Phase 2)
variable "enable_custom_domain" {
  type    = bool
  default = false
}
