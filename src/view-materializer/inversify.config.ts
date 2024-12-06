import { Host } from "@dashg-enterprises/ddd-platform";
import { Container } from "inversify";
import { TYPES } from "./TYPES";
import { ExampleRepository } from "./infrastructure/ExampleRepository";
import { IExampleRepository } from "./infrastructure/IExampleRepository";
import { EntityManager, getEntityManager } from "@typedorm/core";
import { connect } from "./infrastructure/table.config";
import { PLATFORM_TYPES } from "./PLATFORM_TYPES";

const container = new Container();
container.bind<IExampleRepository>(TYPES.IExampleRepository).to(ExampleRepository);

container.bind<EntityManager>(PLATFORM_TYPES.EntityManager)
    .toDynamicValue(() => connect() && getEntityManager());

export const host = new Host(container);