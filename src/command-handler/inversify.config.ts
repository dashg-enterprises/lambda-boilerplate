import { Host } from "@dashg-enterprises/ddd-platform";
import { Example } from "./domain/Example";
import { CreateExampleHandler } from "./application/CreateExampleHandler";
import { CreateExample } from "./commands/CreateExample";
import { TYPES } from "./TYPES";

export const host = new Host()
    .withDDD(Example)
    .withHandler<CreateExampleHandler, CreateExample>(TYPES.ICreateExampleHandler, CreateExampleHandler);