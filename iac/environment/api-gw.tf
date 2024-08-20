resource "aws_api_gateway_rest_api" "my_api" {
  name = "${local.organization_environment_name}-apigw"
  description = "API Gateway for ${local.organization_environment_name}"

  endpoint_configuration {
    types = ["REGIONAL"]
  }
}

resource "aws_api_gateway_deployment" "deployment" {
  rest_api_id = aws_api_gateway_rest_api.my_api.id
  stage_name  = "apigw"
}