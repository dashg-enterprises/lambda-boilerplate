
resource "aws_dynamodb_table" "aggregate_event_log" {
  name         = "${var.application_name}EventLog"
  billing_mode = "PAY_PER_REQUEST"
  # read_capacity  = 10
  # write_capacity = 5

  hash_key = "aggregateId"
  attribute {
    name = "aggregateId"
    type = "S" # String data type
  }

  attribute {
    name = "sequenceId"
    type = "S" # String data type
  }

  global_secondary_index {
    name            = "sequence_id_index"
    hash_key        = "sequenceId"
    projection_type = "ALL"
  }

  tags = {
    Name = "${var.application_name}EventLog"
  }
}

resource "aws_dynamodb_table" "aggregate_snapshots" {
  name         = "${var.application_name}Snapshots"
  billing_mode = "PAY_PER_REQUEST"
  # read_capacity  = 10
  # write_capacity = 5

  hash_key = "id"
  attribute {
    name = "id"
    type = "S" # String data type
  }

  tags = {
    Name = "${var.application_name}Snapshots"
  }
}

resource "aws_cloudwatch_event_bus" "event_bridge_bus" {
  name = "${var.application_name}EventBus"
}

resource "aws_sns_topic" "event_log_broadcast" {
  name                        = "${var.application_name}-topic.fifo"
  fifo_topic                  = true
  content_based_deduplication = true
}

module "bounded_context_subscription" {
  for_each = toset(var.foreign_topics)
  source = "./modules/bounded-context-subscription"
  application_name = var.application_name
  foreign_topic_arn = each.key
  lambda_event_handler_arn = aws_lambda_function.lambda_bounded_context.arn
}