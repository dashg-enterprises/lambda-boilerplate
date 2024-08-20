terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.59.0"
    }
  }

  required_version = ">= 1.2.0"
}

module "fargate_bounded_context_initialization" {
  source = "git::https://github.com/dashg-enterprises/cloud-platform.git//modules/bounded-context/aws/serverless/initialization?ref=feature/aws-lambda-boilerplate-deployment"
  bounded_context_name = "LambdaBoilerplate"
  build_id = var.build_id
  source_code_path = "${path.module}/../../out/index.js"
}