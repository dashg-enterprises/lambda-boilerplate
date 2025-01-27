import { IRepository } from "@dashg-enterprises/ddd-platform";
import { Example } from "./Example";
import { ExamplePartitionKey, ExampleSortKey } from "./ExampleRepository";

export interface IExampleRepository extends IRepository<Example, ExamplePartitionKey, ExampleSortKey> {
}
