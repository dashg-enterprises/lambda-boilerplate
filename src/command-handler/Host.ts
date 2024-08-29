import { DomainEventPublisher } from '../DDD/DomainEventPublisher';
import { EventBridgeClient } from '@aws-sdk/client-eventbridge';
import { SnapshotRepository } from '../DDD/SnapshotRepository';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DomainEventBroadcaster } from '../DDD/DomainEventBroadcaster';
import { EventLogRepository } from '../DDD/EventLogRepository';
import { ExampleRepository } from './infrastructure/ExampleRepository';
import { ExampleService } from './application/ExampleService';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

export class Host {

    get<T>(): T {
        const eventTopicArn = process.env.EVENT_TOPIC_ARN;
        const eventBusName = process.env.EVENT_BUS_NAME;
        const snapshotTableName = process.env.SNAPSHOT_TABLE_NAME;
        const eventLogTableName = process.env.EVENT_LOG_TABLE_NAME;

        const broadcaster = new DomainEventBroadcaster(eventTopicArn);
        const publisher = new DomainEventPublisher(new EventBridgeClient(), "Example", eventBusName);
        const docDbClient = DynamoDBDocumentClient.from(new DynamoDBClient(), this.getDynamoConfig());
        const eventLogRepository = new EventLogRepository(docDbClient, eventLogTableName);
        const snapshotRepository = new SnapshotRepository(docDbClient, snapshotTableName);
        const exampleRepository = new ExampleRepository(eventLogRepository, snapshotRepository);
        const exampleService = new ExampleService(exampleRepository, broadcaster, publisher);

        return exampleService as T;
    }

    private getDynamoConfig = () => {
        const marshallOptions = {
            // Whether to automatically convert empty strings, blobs, and sets to `null`.
            // convertEmptyValues: false, // false, by default.
            // Whether to remove undefined values while marshalling.
            removeUndefinedValues: true, // false, by default.
            // Whether to convert typeof object to map attribute.
            convertClassInstanceToMap: true // false, by default. <---- Set this flag
          }
          
          const unmarshallOptions = {
            // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
            // wrapNumbers: false, // false, by default.
          }
          
          const translateConfig = { marshallOptions, unmarshallOptions };
          return translateConfig;
    }
}