
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

# // External subscriptions
# Queue policy allowing send messages from the required topic
data "aws_iam_policy_document" "queue_policy_document" {
  statement {
    effect = "Allow"
    actions = ["sqs:SendMessage"]
    principals {
      type        = "Service"
      identifiers = ["sns.amazonaws.com"]
    }
    resources = [aws_sqs_queue.foreign_context_subscriber.arn]
    condition {
      test     = "ArnEquals"
      variable = "aws:SourceArn"
      values   = [var.example_topic_arn]
    }
  }
}

# resource "aws_iam_policy" "iam_policy_for_sqs" {
#   name        = "${var.application_name}-sqs-policy"
#   path        = "/"
#   description = "AWS IAM Policy for managing aws lambda role"
#   policy      = jsonencode({
#     Version = "2012-10-17",
#     Statement = [{
#       Action = [
#         "sqs:SendMessage"
#       ],
#       Resource = [
#         "${var.example_topic_arn}"
#       ],
#       Principal = "sns.amazonaws.com"
#       Effect = "Allow"
#     }]
#   })
# }

resource "aws_sqs_queue_policy" "queue_policy" {
  queue_url = aws_sqs_queue.foreign_context_subscriber.id
  policy    = data.aws_iam_policy_document.queue_policy_document.json
}

resource "aws_sns_topic_subscription" "foreign_context_subscription" {
  topic_arn = var.example_topic_arn
  protocol  = "sqs"
  endpoint  = aws_sqs_queue.foreign_context_subscriber.arn
}

resource "aws_sqs_queue" "foreign_context_subscriber" {
  name = "foreign-event-listener-queue"

  redrive_policy = jsonencode({
    deadLetterTargetArn = aws_sqs_queue.foreign_context_dlq.arn
    maxReceiveCount     = 4
  })
}

resource "aws_sqs_queue" "foreign_context_dlq" {
  name = "foreign-event-listener-dlq"
}

resource "aws_sqs_queue_redrive_allow_policy" "foreign_context_dlq_policy" {
  queue_url = aws_sqs_queue.foreign_context_dlq.id

  redrive_allow_policy = jsonencode({
    redrivePermission = "byQueue",
    sourceQueueArns   = [aws_sqs_queue.foreign_context_subscriber.arn]
  })
}

resource "aws_lambda_event_source_mapping" "event_source_mapping" {
  event_source_arn = aws_sqs_queue.foreign_context_subscriber.arn
  enabled          = true
  function_name    = aws_lambda_function.lambda_bounded_context.function_name
  batch_size       = 1
}