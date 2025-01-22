terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.59.0"
    }
  }

  required_version = ">= 1.2.0"
}

locals {
  bounded_context_name = "ExampleContext"
}

module "serverless_bounded_context_initialization" {
  source = "git::https://github.com/dashg-enterprises/cloud-platform.git//modules/bounded-context/aws/serverless/initialization?ref=main"
  bounded_context_name = local.bounded_context_name
}