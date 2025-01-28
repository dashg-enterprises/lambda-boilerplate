import { Host, HostApi } from "@dashg-enterprises/ddd-platform";
import { TYPES } from "./TYPES";
import { IExampleRepository } from "./infrastructure/IExampleRepository";
import { Example } from "./infrastructure/Example";
import { ExamplePartitionKey, ExampleRepository, ExampleSortKey } from "./infrastructure/ExampleRepository";
import "../view-api/presentation/HealthCheckController";
import "../view-api/presentation/ExampleController";

export const host = new Host()
    .withMaterializedView<
        Example,
        ExamplePartitionKey,
        ExampleSortKey,
        ExampleRepository,
        IExampleRepository
    >(Example, ExampleRepository, TYPES.IExampleRepository);

export const hostApi = new HostApi(host);