data "archive_file" "lambda_package" {
  type        = "zip"
  source_file = var.source_code_path
  output_path = "index.zip"
}

resource "aws_s3_object" "dist" {
  bucket = aws_s3_bucket.build_bucket.id
  key    = var.build_id
  source = data.archive_file.lambda_package.output_path
  etag = data.archive_file.lambda_package.output_md5
}
