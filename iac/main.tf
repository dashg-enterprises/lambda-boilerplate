terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.59.0"
    }
  }

  required_version = ">= 1.2.0"
}

module "example_lambda_context" {
  source = "git::https://github.com/dashg-enterprises/cloud-platform.git//modules/bounded-context/aws/serverless/context?ref=feature/lambda-bounded-context"
  bounded_context_name = "LambdaBoilerplate"
  aggregate_root_name = "Example"
  application_name = "example-handlers-${var.environment_name}"
  build_bucket_name = var.build_bucket_name
  handlers = var.handlers
}