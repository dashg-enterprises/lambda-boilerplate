output "pool_id" {
    value = aws_cognito_user_pool.pool.id
}

output "pool_client_id" {
    value = aws_cognito_user_pool_client.client.id
}

output "authorizer_id" {
    value = aws_api_gateway_authorizer.auth.id
}

output "apigw_execution_arn" {
  value = aws_api_gateway_rest_api.my_api.execution_arn
}

output "apigw_id" {
  value = aws_api_gateway_rest_api.my_api.id
}

output "apigw_name" {
  value = aws_api_gateway_rest_api.my_api.name
}

output "apigw_root_resource_id" {
  value = aws_api_gateway_rest_api.my_api.root_resource_id
}

output "url" {
  value = "https://${aws_api_gateway_domain_name.gw_domain.domain_name}"
}