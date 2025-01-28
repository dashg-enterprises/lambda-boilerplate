import { BaseHttpController, controller, httpGet, httpPost } from "inversify-express-utils";
import { Request } from "express";

@controller("/")
export default class HealthController extends BaseHttpController {
    @httpGet("/")
    private async checkHealth(request: Request) {
        return this.ok();
    }
}