include "root" {
  path = find_in_parent_folders()
}

locals {
  repo_path = ""
}

terraform {
  source = "git::https://github.com/${local.repo_path}.git//iac/initialization?ref=main"
}

inputs = {
}