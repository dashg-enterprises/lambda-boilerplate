variable "organization_name" {
  type = string
}

variable "environment_name" {
  type = string
}

variable "environment_subdomain" {
  type = string
}

variable "domain_name" {
  type = string
}

variable "bounded_contexts" {
  type = list(object({
    name = string
    lambdas = list(string)
    openapi_spec = map(any)
  }))
}

# variable "lambda_uri" {
#   type = string
# }

# variable "lambda_name" {
#   type = string
# }

# variable "view_lambda_uri" {
#   type = string
# }

# variable "view_lambda_name" {
#   type = string
# }