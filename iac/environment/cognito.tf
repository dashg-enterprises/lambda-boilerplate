resource "aws_cognito_user_pool" "pool" {
  name = "${local.organization_environment_name}-pool"
}

resource "aws_cognito_user_pool_client" "client" {
  name                                 = "${local.organization_environment_name}-pool-client"
  allowed_oauth_flows_user_pool_client = true
  generate_secret                      = false
  allowed_oauth_scopes                 = ["aws.cognito.signin.user.admin", "email", "openid", "profile"]
  allowed_oauth_flows                  = ["implicit", "code"]
  explicit_auth_flows                  = ["ADMIN_NO_SRP_AUTH", "USER_PASSWORD_AUTH"]
  supported_identity_providers         = ["COGNITO"]


  user_pool_id  = aws_cognito_user_pool.pool.id
  callback_urls = ["https://${var.environment_subdomain}.${var.domain_name}"]
  logout_urls   = ["https://${var.environment_subdomain}.${var.domain_name}"]
}

resource "aws_cognito_user" "example" {
  user_pool_id = aws_cognito_user_pool.pool.id
  username     = "chadgarlandscg"
  password     = "TFtest@1234"
}

resource "aws_api_gateway_authorizer" "auth" {
  name          = "${local.organization_environment_name}-authorizer"
  rest_api_id   = aws_api_gateway_rest_api.my_api.id
  type          = "COGNITO_USER_POOLS"
  provider_arns = [aws_cognito_user_pool.pool.arn]
}