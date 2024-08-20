locals {
    organization_environment_name = "${var.organization_name}-${var.environment_name}"
    environment_api_fqdn = "${var.environment_subdomain}.api.${var.domain_name}"
}