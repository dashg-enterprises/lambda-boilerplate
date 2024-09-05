variable "environment_name" {
  type = string
}

variable "build_bucket_name" {
  type = string
}

variable "handlers" {
  type = list(object({
    name = string
    # command_source = string
    event_sources = list(string)
    build_id = string
  }))
}