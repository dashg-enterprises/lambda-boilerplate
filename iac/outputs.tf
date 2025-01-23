output "event_bus_name" {
  value = module.serverless_bounded_context.event_bus_name
}

output "event_log_table_name" {
  value = module.serverless_bounded_context.event_log_table_name
}

output "snapshot_table_name" {
  value = module.serverless_bounded_context.snapshot_table_name
}

output "lambda_uris" {
  value = module.serverless_bounded_context.lambda_uris
}

output "event_topic_arn" {
  value = module.serverless_bounded_context.event_topic_arn
}

