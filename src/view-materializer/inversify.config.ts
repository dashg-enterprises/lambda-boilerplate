import { Host } from "@dashg-enterprises/ddd-platform";
import { Container } from "inversify";
import { TYPES } from "./TYPES";
import { ExampleRepository } from "./infrastructure/ExampleRepository";
import { IExampleRepository } from "./infrastructure/IExampleRepository";
import { SingleTableConnection } from "./infrastructure/SingleTableConnection";
import { EntityManager, getEntityManager } from "@typedorm/core";
import { Table } from "@typedorm/common";
import { table } from "./infrastructure/table.config";

const container = new Container();
container.bind<IExampleRepository>(TYPES.IExampleRepository).to(ExampleRepository);

container.bind(Table).toConstantValue(table);
container.bind(SingleTableConnection).toSelf();
container.bind(EntityManager).toDynamicValue(() => getEntityManager());

export const host = new Host(container);