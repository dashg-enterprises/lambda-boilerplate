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
  default = [{
    name = "LambdaBoilerplate"
    lambdas = [
      "example-command-handler-local",
      "example-view-materializer-local"
    ]
    openapi_spec = {
      "/examples" = {
        post = {
          x-amazon-apigateway-integration = {
            httpMethod           = "POST"
            payloadFormatVersion = "1.0"
            type                 = "AWS_PROXY"
            uri                  = "arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-1:624626124579:function:example-command-handler-local/invocations"
          }
        }
        get = {
          x-amazon-apigateway-integration = {
            httpMethod           = "POST"
            payloadFormatVersion = "1.0"
            type                 = "AWS_PROXY"
            uri                  = "arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-1:624626124579:function:example-view-materializer-local/invocations"
          }
        }
      }
    }
  }]
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