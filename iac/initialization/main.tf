locals {
  bounded_context_name = "ExampleContext"
}

module "serverless_bounded_context_initialization" {
  source = "git::https://github.com/dashg-enterprises/cloud-platform.git//modules/bounded-context/aws/serverless/initialization?ref=main"
  bounded_context_name = local.bounded_context_name
}