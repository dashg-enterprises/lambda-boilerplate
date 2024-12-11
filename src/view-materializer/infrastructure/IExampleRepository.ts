import { Example } from "./Example";
import { ExamplePartitionKey, ExampleSortKey } from "./ExampleRepository";
import { IRepository } from "./IRepository";

export interface IExampleRepository extends IRepository<Example, ExamplePartitionKey, ExampleSortKey> {
}
