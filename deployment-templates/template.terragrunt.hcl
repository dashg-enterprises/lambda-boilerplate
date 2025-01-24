include "root" {
  path = find_in_parent_folders()
}

locals {
  repo_path                  = ""
  repo_name                  = ""
  command_handler_build_id   = ""
  view_materializer_build_id = ""
  view_api_build_id          = ""
  environment_name           = ""
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

inputs = {
  environment_name  = "${local.environment_name}"
  build_bucket_name = dependency.initialization.outputs.build_bucket_name
  handlers = [{
      name             = "command-handler"
      build_id         = local.command_handler_build_id
      handles_commands = true
      event_sources    = []
    }, {
      name               = "view-materializer"
      build_id           = local.view_materializer_build_id
      materializes_views = true
    }, {
      name     = "view-api"
      build_id = local.view_api_build_id
  }]
}
