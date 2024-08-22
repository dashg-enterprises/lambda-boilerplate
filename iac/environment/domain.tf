data "aws_route53_zone" "my_domain" {
  name = "dashglabs.com"
  private_zone = false
}

data "aws_region" "current" {}

# resource "aws_acm_certificate" "cert" {
#   domain_name               = var.domain_name
#   subject_alternative_names = ["*.${var.domain_name}"]

#   validation_method = "DNS"

#   # lifecycle {
#   #   create_before_destroy = true
#   # }
# }

resource "aws_route53_record" "validation_record" {
  for_each = {
    for dvo in aws_acm_certificate.my_api_cert.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = data.aws_route53_zone.my_domain.zone_id
}

resource "aws_acm_certificate_validation" "cert_validation" {
  certificate_arn         = aws_acm_certificate.my_api_cert.arn
  validation_record_fqdns = [for record in aws_route53_record.validation_record : record.fqdn]
}

# resource "aws_route53_record" "api_domain_record" {
#   name = "${var.environment_name}.api" # The subdomain (dev.api.dashglabs.com)
#   type = "CNAME"
#   ttl = "300" # TTL in seconds

#   records = ["${aws_api_gateway_rest_api.my_api.id}.execute-api.${data.aws_region.current.name}.amazonaws.com"]

#   zone_id = data.aws_route53_zone.my_domain.zone_id
# }

# Example DNS record using Route53.
# Route53 is not specifically required; any DNS host can be used.
resource "aws_route53_record" "apigw_domain_alias" {
  zone_id = data.aws_route53_zone.my_domain.zone_id # See aws_route53_zone for how to create this

  name = aws_api_gateway_domain_name.gw_domain.domain_name
  type = "A"

  alias {
    name                   = aws_api_gateway_domain_name.gw_domain.cloudfront_domain_name
    zone_id                = aws_api_gateway_domain_name.gw_domain.cloudfront_zone_id
    evaluate_target_health = false
  }
}