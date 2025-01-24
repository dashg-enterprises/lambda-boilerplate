variable "environment_name" {
  type = string
}

variable "build_bucket_name" {
  type = string
}

variable "handlers" {
  type = list(object({
    name = string
    handles_commands = optional(bool, false)
    materializes_views = optional(bool, false)
    event_sources = optional(list(string), [])
    build_id = string
  }))
}