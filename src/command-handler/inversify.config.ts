import { Host } from "@dashg-enterprises/ddd-platform";
import { Example } from "./domain/Example";
import { CreateExampleHandler, ICreateExampleHandler } from "./application/CreateExampleHandler";
import { CreateExample } from "./commands/CreateExample";
import { TYPES } from "./TYPES";
import { IScheduleExampleHandler, ScheduleExampleHandler } from "./application/ScheduleExampleHandler";
import { ScheduleExample } from "./commands/ScheduleExample";

export const host = new Host()
    .withDDD(Example)
    
    .withExplicitHandler<ICreateExampleHandler, CreateExampleHandler, CreateExample>(CreateExampleHandler, TYPES.ICreateExampleHandler)
    .withNamedHandler<CreateExample>(CreateExampleHandler, CreateExample.name)
    .withHandler<CreateExampleHandler, CreateExample>(CreateExampleHandler, CreateExample.name)

    .withExplicitHandler<IScheduleExampleHandler, ScheduleExampleHandler, ScheduleExample>(ScheduleExampleHandler, TYPES.IScheduleExampleHandler)
    .withNamedHandler<ScheduleExample>(ScheduleExampleHandler, ScheduleExample.name)
    .withHandler<ScheduleExampleHandler, ScheduleExample>(ScheduleExampleHandler, ScheduleExample.name);