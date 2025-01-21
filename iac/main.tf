module "example_lambda_context" {
  source = "git::https://github.com/dashg-enterprises/cloud-platform.git//modules/bounded-context/aws/serverless/context?ref=main"
  bounded_context_name = "ExampleContext"
  aggregate_root_name = "Example"
  application_name = "example-handlers-${var.environment_name}"
  build_bucket_name = var.build_bucket_name
  handlers = var.handlers
}