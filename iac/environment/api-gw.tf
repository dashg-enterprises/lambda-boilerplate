resource "aws_api_gateway_rest_api" "my_api" {
  name = "${local.organization_environment_name}-apigw"
  description = "API Gateway for ${local.organization_environment_name}"

  body = jsonencode({
    openapi = "3.0.1"
    info = {
      title   = "ip-ranges"
      version = "1.0"
    }
    paths = {
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
      "/examples" = {
        post = {
          x-amazon-apigateway-integration = {
            httpMethod           = "POST"
            payloadFormatVersion = "2.0"
            type                 = "AWS_PROXY"
            uri                  = var.lambda_uri
          }
        }
      }
    }
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

  # depends_on = [
  #   aws_api_gateway_integration.lambda_integration,
  #   aws_api_gateway_integration.options_integration
  # ]
}

# resource "aws_api_gateway_stage" "main_stage" {
#   deployment_id = aws_api_gateway_deployment.example.id
#   rest_api_id   = aws_api_gateway_rest_api.example.id
#   stage_name    = "main"
# }

resource "aws_lambda_permission" "apigw_lambda" {
  statement_id = "AllowExecutionFromAPIGateway"
  action = "lambda:InvokeFunction"
  function_name = var.lambda_name
  principal = "apigateway.amazonaws.com"

  source_arn = "${aws_api_gateway_rest_api.my_api.execution_arn}/*/*/*"
}