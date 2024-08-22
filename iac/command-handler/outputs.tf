output "event_bus_name" {
  value = aws_cloudwatch_event_bus.event_bridge_bus.name
}

output "event_log_name" {
  value = aws_dynamodb_table.aggregate_event_log.name
}

output "snapshot_db_name" {
  value = aws_dynamodb_table.aggregate_snapshots.name
}