include "root" {
  path = find_in_parent_folders()
}

locals {
  application_image = ""
  repo_path         = ""
  repo_name         = ""
  environment_name  = ""
}

terraform {
  source = "git::https://github.com/${local.repo_path}.git//iac?ref=main"
}

dependency "cloudscape" {
  config_path = "../../cloudscape"
}

dependency "initialization" {
  config_path = "../../../_initializations/${local.repo_name}"
}

locals {
  command_handler_build_id   = ""
  view_materializer_build_id = ""
  view_api_build_id          = ""
  environment                = ""
}

inputs = {
  environment_name  = "${local.environment}"
  build_bucket_name = "examplecontext-builds"
  handlers = [{
      name             = "command-handler-${local.environment}"
      build_id         = local.command_handler_build_id
      handles_commands = true
      event_sources    = []
    }, {
      name     = "view-materializer-${local.environment}"
      build_id = local.view_materializer_build_id
    }, {
      name     = "view-api-${local.environment}"
      build_id = local.view_api_build_id
  }]
}
