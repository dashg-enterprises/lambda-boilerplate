output "event_bus_name" {
  value = aws_cloudwatch_event_bus.event_bridge_bus.name
}

output "event_log_table_name" {
  value = aws_dynamodb_table.aggregate_event_log.name
}

output "snapshot_table_name" {
  value = aws_dynamodb_table.aggregate_snapshots.name
}

output "lambda_uri" {
  value = aws_lambda_function.lambda_bounded_context.invoke_arn
}