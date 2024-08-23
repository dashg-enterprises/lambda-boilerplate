# // domain
resource "aws_acm_certificate" "my_api_cert" {
  domain_name               = var.domain_name
  subject_alternative_names = [local.environment_api_fqdn]
  validation_method         = "DNS"
}

# resource "aws_acm_certificate" "wildcard_cert" {
#   domain_name               = var.domain_name
#   subject_alternative_names = ["*.${var.domain_name}"]
#   validation_method         = "DNS"
# }

resource "aws_api_gateway_domain_name" "gw_domain" {
  certificate_arn = aws_acm_certificate.my_api_cert.arn
  domain_name     = local.environment_api_fqdn
  security_policy = "TLS_1_2"
  depends_on = [aws_acm_certificate_validation.cert_validation]
}

resource "aws_api_gateway_base_path_mapping" "gw_mapping" {
  domain_name = aws_api_gateway_domain_name.gw_domain.domain_name #"local.api.dashglabs.com" #local.environment_api_fqdn
  api_id      = aws_api_gateway_rest_api.my_api.id
  stage_name  = aws_api_gateway_deployment.deployment.stage_name
  lifecycle {
    create_before_destroy = true
  }
}