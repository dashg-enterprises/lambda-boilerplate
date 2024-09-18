output "event_bus_name" {
  value = module.example_lambda_context.event_bus_name
}

output "event_log_table_name" {
  value = module.example_lambda_context.event_log_table_name
}

output "snapshot_table_name" {
  value = module.example_lambda_context.snapshot_table_name
}

output "lambda_uris" {
  value = module.example_lambda_context.lambda_uris
}

output "event_topic_arn" {
  value = module.example_lambda_context.event_topic_arn
}

