terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.59.0"
    }
  }

  required_version = ">= 1.2.0"
}

module "example_command_handler" {
  source = "git::https://github.com/dashg-enterprises/cloud-platform.git//modules/bounded-context/aws/serverless/lambda?ref=main"
  bounded_context_name = "LambdaBoilerplate"
  aggregate_root_name = "Example"
  application_name = "example-command-handler-local"
  build_bucket_name = var.build_bucket_name
  build_id = var.build_id
  foreign_topics = var.foreign_topics
  # apigw_id = var.apigw_id 
  # apigw_root_resource_id = var.apigw_root_resource_id
}