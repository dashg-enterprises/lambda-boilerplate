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
      values   = [var.foreign_topic_arn]
    }
  }
}

resource "aws_sqs_queue_policy" "queue_policy" {
  queue_url = aws_sqs_queue.foreign_context_subscriber.id
  policy    = data.aws_iam_policy_document.queue_policy_document.json
}

resource "aws_sns_topic_subscription" "foreign_context_subscription" {
  topic_arn = var.foreign_topic_arn
  protocol  = "sqs"
  endpoint  = aws_sqs_queue.foreign_context_subscriber.arn
}

resource "aws_sqs_queue" "foreign_context_subscriber" {
  name = "foreign-event-listener-queue"

  redrive_policy = jsonencode({
    deadLetterTargetArn = aws_sqs_queue.foreign_context_dlq.arn
    maxReceiveCount     = 4
  })
  depends_on = [ aws_sqs_queue.foreign_context_dlq ]
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
  function_name    = var.lambda_event_handler_arn
  batch_size       = 1
}