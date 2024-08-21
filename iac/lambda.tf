resource "aws_iam_role" "lambda_role" {
  name               = "${var.application_name}-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = "sts:AssumeRole",
        Effect = "Allow",
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_policy" "iam_policy_for_lambda" {
  name        = "${var.application_name}-policy"
  path        = "/"
  description = "AWS IAM Policy for managing aws lambda role"
  policy      = <<EOF
{
 "Version": "2012-10-17",
 "Statement": [
   {
     "Action": [
       "logs:CreateLogGroup",
       "logs:CreateLogStream",
       "logs:PutLogEvents"
     ],
     "Resource": "arn:aws:logs:*:*:*",
     "Effect": "Allow"
   },
   {
      "Action": [
        "s3:GetObject"
      ],
      "Effect": "Allow",
      "Resource": [
        "arn:aws:s3:::${var.build_bucket_name}/*"
      ]
    }
 ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "attach_iam_policy_to_iam_role" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = aws_iam_policy.iam_policy_for_lambda.arn
}

resource "aws_lambda_function" "lambda_bounded_context" {
  function_name = var.application_name
  s3_bucket     = var.build_bucket_name
  s3_key        = var.build_id
  role          = aws_iam_role.lambda_role.arn
  handler       = "index.lambdaHandler"
  runtime       = "nodejs18.x"
  depends_on = [
    aws_iam_role_policy_attachment.attach_iam_policy_to_iam_role
  ]
}

# resource "aws_dynamodb_table" "aggregate_event_log" {
#   name         = "${var.aggregate_root_name}EventLog_${var.environment_name}"
#   billing_mode = "PAY_PER_REQUEST"
#   # read_capacity  = 10
#   # write_capacity = 5

#   hash_key = "aggregateId"
#   attribute {
#     name = "aggregateId"
#     type = "S" # String data type
#   }

#   attribute {
#     name = "sequenceId"
#     type = "S" # String data type
#   }

#   global_secondary_index {
#     name            = "sequence_id_index"
#     hash_key        = "sequenceId"
#     projection_type = "ALL"
#   }

#   tags = {
#     Name = "${var.aggregate_root_name}EventLog"
#   }
# }

# resource "aws_dynamodb_table" "aggregate_snapshots" {
#   name         = "${var.aggregate_root_name}Snapshots_${var.environment_name}"
#   billing_mode = "PAY_PER_REQUEST"
#   # read_capacity  = 10
#   # write_capacity = 5

#   hash_key = "id"
#   attribute {
#     name = "id"
#     type = "S" # String data type
#   }

#   tags = {
#     Name = "${var.aggregate_root_name}Snapshots"
#   }
# }

# resource "aws_cloudwatch_event_bus" "event_bridge_bus" {
#   name = "${var.aggregate_root_name}EventBus_${var.environment_name}"
# }
