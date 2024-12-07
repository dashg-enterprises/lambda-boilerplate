import { Host } from "@dashg-enterprises/ddd-platform";
import { Container } from "inversify";
import { TYPES } from "./TYPES";
import { ExampleRepository } from "./infrastructure/ExampleRepository";
import { IExampleRepository } from "./infrastructure/IExampleRepository";
import { EntityManager, getEntityManager, ScanManager, getScanManager } from "@typedorm/core";
import { connect } from "./infrastructure/table.config";
import { PLATFORM_TYPES } from "./PLATFORM_TYPES";
import { IExampleController } from "../view-api/presentation/IExampleController";
import ExampleController from "../view-api/presentation/ExampleController";

const container = new Container();
container.bind<IExampleRepository>(TYPES.IExampleRepository).to(ExampleRepository);
container.bind<IExampleController>(TYPES.IExampleController).to(ExampleController);

container.bind<EntityManager>(PLATFORM_TYPES.EntityManager)
    .toDynamicValue(() => connect() && getEntityManager());

container.bind<ScanManager>(PLATFORM_TYPES.ScanManager)
    .toDynamicValue(() => connect() && getScanManager());

export const host = new Host(container);