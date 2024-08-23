resource "aws_api_gateway_rest_api" "my_api" {
  name = "${local.organization_environment_name}-apigw"
  description = "API Gateway for ${local.organization_environment_name}"

  body = jsonencode({
    openapi = "3.0.1"
    info = {
      title   = "DashG Labs API"
      version = "1.0"
    }
    paths = merge({
      "/ip-ranges" = {
        get = {
          x-amazon-apigateway-integration = {
            httpMethod           = "GET"
            payloadFormatVersion = "1.0"
            type                 = "HTTP_PROXY"
            uri                  = "https://ip-ranges.amazonaws.com/ip-ranges.json"
          }
        }
      }
    }, var.bounded_contexts[0].openapi_spec)
  })

  put_rest_api_mode = "merge"

  endpoint_configuration {
    types = ["REGIONAL"]
  }
}

resource "aws_api_gateway_deployment" "deployment" {
  rest_api_id = aws_api_gateway_rest_api.my_api.id

  triggers = {
    redeployment = sha1(jsonencode(aws_api_gateway_rest_api.my_api.body))
  }

  stage_name = "main"
}

# resource "aws_api_gateway_stage" "main_stage" {
#   deployment_id = aws_api_gateway_deployment.example.id
#   rest_api_id   = aws_api_gateway_rest_api.example.id
#   stage_name    = "main"
# }

resource "aws_lambda_permission" "apigw_lambda" {
  count = length(var.bounded_contexts[0].lambdas)
  statement_id = "AllowExecutionFromAPIGateway"
  action = "lambda:InvokeFunction"
  function_name = var.bounded_contexts[0].lambdas[count.index]
  principal = "apigateway.amazonaws.com"

  source_arn = "${aws_api_gateway_rest_api.my_api.execution_arn}/*/*/*"
}