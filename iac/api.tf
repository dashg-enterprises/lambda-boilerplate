# resource "aws_api_gateway_resource" "root" {
#   rest_api_id = var.apigw_id
#   parent_id = var.apigw_root_resource_id
#   path_part = "${lower(var.aggregate_root_name)}s"
# }

# resource "aws_api_gateway_method" "proxy" {
#   rest_api_id = var.apigw_id
#   resource_id = aws_api_gateway_resource.root.id
#   http_method = "POST"
#   # authorization = "NONE"

#   authorization = "COGNITO_USER_POOLS"
#   authorizer_id = var.authorizer_id
# }

# resource "aws_api_gateway_integration" "lambda_integration" {
#   rest_api_id = var.apigw_id
#   resource_id = aws_api_gateway_resource.root.id
#   http_method = aws_api_gateway_method.proxy.http_method
#   integration_http_method = "POST"
#   type = "AWS"
#   uri = aws_lambda_function.lambda_bounded_context.invoke_arn
# }

# resource "aws_api_gateway_method_response" "proxy" {
#   rest_api_id = var.apigw_id
#   resource_id = aws_api_gateway_resource.root.id
#   http_method = aws_api_gateway_method.proxy.http_method
#   status_code = "200"

#   //cors section
#   response_parameters = {
#     "method.response.header.Access-Control-Allow-Headers" = true,
#     "method.response.header.Access-Control-Allow-Methods" = true,
#     "method.response.header.Access-Control-Allow-Origin" = true
#   }
# }

# resource "aws_api_gateway_integration_response" "proxy" {
#   rest_api_id = var.apigw_id
#   resource_id = aws_api_gateway_resource.root.id
#   http_method = aws_api_gateway_method.proxy.http_method
#   status_code = aws_api_gateway_method_response.proxy.status_code

#   //cors
#   response_parameters = {
#     "method.response.header.Access-Control-Allow-Headers" =  "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'",
#     "method.response.header.Access-Control-Allow-Methods" = "'GET,OPTIONS,POST,PUT'",
#     "method.response.header.Access-Control-Allow-Origin" = "'*'"
#   }

#   depends_on = [
#     aws_api_gateway_method.proxy,
#     aws_api_gateway_integration.lambda_integration
#   ]
# }

# //options
# resource "aws_api_gateway_method" "options" {
#   rest_api_id = var.apigw_id
#   resource_id = aws_api_gateway_resource.root.id
#   http_method = "OPTIONS"
#   # authorization = "NONE"

#   authorization = "COGNITO_USER_POOLS"
#   authorizer_id = var.authorizer_id
# }

# resource "aws_api_gateway_integration" "options_integration" {
#   rest_api_id             = var.apigw_id
#   resource_id             = aws_api_gateway_resource.root.id
#   http_method             = aws_api_gateway_method.options.http_method
#   integration_http_method = "OPTIONS"
#   type                    = "MOCK"
#   request_templates = {
#     "application/json" = "{\"statusCode\": 200}"
#   }
# }

# resource "aws_api_gateway_method_response" "options_response" {
#   rest_api_id = var.apigw_id
#   resource_id = aws_api_gateway_resource.root.id
#   http_method = aws_api_gateway_method.options.http_method
#   status_code = "200"

#   response_parameters = {
#     "method.response.header.Access-Control-Allow-Headers" = true,
#     "method.response.header.Access-Control-Allow-Methods" = true,
#     "method.response.header.Access-Control-Allow-Origin"  = true
#   }
# }

# resource "aws_api_gateway_integration_response" "options_integration_response" {
#   rest_api_id = var.apigw_id
#   resource_id = aws_api_gateway_resource.root.id
#   http_method = aws_api_gateway_method.options.http_method
#   status_code = aws_api_gateway_method_response.options_response.status_code

#   response_parameters = {
#     "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'",
#     "method.response.header.Access-Control-Allow-Methods" = "'GET,OPTIONS,POST,PUT'",
#     "method.response.header.Access-Control-Allow-Origin"  = "'*'"
#   }

#   depends_on = [
#     aws_api_gateway_method.options,
#     aws_api_gateway_integration.options_integration,
#   ]
# }

# resource "aws_api_gateway_deployment" "deployment" {
#   depends_on = [
#     aws_api_gateway_integration.lambda_integration,
#     aws_api_gateway_integration.options_integration
#   ]
#   stage_name = "main"
#   rest_api_id = var.apigw_id
# }

# resource "aws_api_gateway_base_path_mapping" "gw_mapping" {
#   domain_name = "local.api.dashglabs.com" #local.environment_api_fqdn
#   api_id      = var.apigw_id
#   stage_name  = aws_api_gateway_deployment.deployment.stage_name
# }

# resource "aws_iam_role_policy_attachment" "lambda_basic" {
#   policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
#   role = aws_iam_role.lambda_role.name
# }

# resource "aws_lambda_permission" "apigw_lambda" {
#   statement_id = "AllowExecutionFromAPIGateway"
#   action = "lambda:InvokeFunction"
#   function_name = aws_lambda_function.lambda_bounded_context.function_name
#   principal = "apigateway.amazonaws.com"

#   source_arn = "${var.apigw_execution_arn}/*/*/*"
# }