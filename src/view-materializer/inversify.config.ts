import { Host } from "@dashg-enterprises/ddd-platform";
import { Container } from "inversify";
import {DocumentClientV3} from '@typedorm/document-client';
import { TYPES } from "./TYPES";
import { ExampleRepository } from "./infrastructure/ExampleRepository";
import { IExampleRepository } from "./infrastructure/IExampleRepository";
import { SingleTableConnection } from "./infrastructure/SingleTableConnection";
import { getEntityManager } from "@typedorm/core";
import { table } from "./infrastructure/table.config";
import { PLATFORM_TYPES } from "./PLATFORM_TYPES";
import {DynamoDBClient} from '@aws-sdk/client-dynamodb';

const container = new Container();
container.bind<IExampleRepository>(TYPES.IExampleRepository).to(ExampleRepository);

container.bind(PLATFORM_TYPES.DocumentClientV3).toConstantValue(new DocumentClientV3(new DynamoDBClient({})));
container.bind(PLATFORM_TYPES.Table).toConstantValue(table);
container.bind(PLATFORM_TYPES.EntityManager).toDynamicValue(() => getEntityManager());
container.bind(PLATFORM_TYPES.SingleTableConnection).to(SingleTableConnection);

export const host = new Host(container);