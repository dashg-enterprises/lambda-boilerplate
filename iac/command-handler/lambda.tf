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
       "events:PutEvents",
       "s3:GetObject",
       "logs:CreateLogGroup",
       "logs:CreateLogStream",
       "logs:PutLogEvents",
       "dynamodb:PutItem",
       "dynamodb:GetItem",
       "dynamodb:UpdateItem",
       "dynamodb:DeleteItem",
     ],
      "Resource": [
        "${aws_cloudwatch_event_bus.event_bridge_bus.arn}",
        "arn:aws:s3:::${var.build_bucket_name}/*",
        "arn:aws:logs:*:*:*",
        "${aws_dynamodb_table.aggregate_snapshots.arn}",
        "${aws_dynamodb_table.aggregate_event_log}"
      ],
     "Effect": "Allow"
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
  handler       = "index.handler"
  runtime       = "nodejs20.x"
  depends_on = [
    aws_iam_role_policy_attachment.attach_iam_policy_to_iam_role
  ]
}