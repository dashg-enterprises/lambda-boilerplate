locals {
  bounded_context_name = "ExampleContext"
  aggregate_root_name = "Example"
  application_name = "serverless-example"
}

module "serverless_bounded_context" {
  source = "git::https://github.com/dashg-enterprises/cloud-platform.git//modules/bounded-context/aws/serverless/context?ref=main"
  bounded_context_name = local.bounded_context_name
  aggregate_root_name = local.aggregate_root_name
  application_name = "${local.application_name}-${var.environment_name}"
  build_bucket_name = var.build_bucket_name
  handlers = var.handlers
}