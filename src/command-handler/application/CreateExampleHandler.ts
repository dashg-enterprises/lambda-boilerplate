import { HandlerBase, IAggregateService, IHandler, PLATFORM_TYPES } from "@dashg-enterprises/ddd-platform";
import { CreateExample } from "../commands/CreateExample";
import { inject } from "inversify";

export interface ICreateExampleHandler extends IHandler<CreateExample> {
}

export class CreateExampleHandler extends HandlerBase<CreateExample> implements ICreateExampleHandler {
    constructor(@inject(PLATFORM_TYPES.IAggregateService) service: IAggregateService) {
        super(service);
    }
}