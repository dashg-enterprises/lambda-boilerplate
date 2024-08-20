terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.59.0"
    }
  }

  required_version = ">= 1.2.0"
}

module "lambda_bounded_context" {
  source = "git::https://github.com/dashg-enterprises/cloud-platform.git//modules/bounded-context/aws/serverless?ref=feature/aws-lambda-boilerplate-deployment"
  bounded_context_name = "LambdaBoilerplate"
  aggregate_root_name = "Example"
  application_name = "src-lambda-${var.environment_name}"
  environment_name = var.environment_name 
  build_bucket_name = var.build_bucket_name 
  build_id = var.build_id 
  apigw_id = var.apigw_id 
  apigw_root_resource_id = var.apigw_root_resource_id
}