import 'reflect-metadata'
import { Handler } from 'aws-lambda';
import { EventBridgeEvent, DomainEventPublisher } from './DDD/DomainEventPublisher';
import { EventBridgeClient } from '@aws-sdk/client-eventbridge';
import { SnapshotRepository } from './DDD/SnapshotRepository';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DomainEventBroadcaster } from './DDD/DomainEventBroadcaster';
import { SNSClient } from '@aws-sdk/client-sns';
import { DomainEvent } from './DDD/DomainEvent';
import { ExampleCreated } from './ExampleCreated';
import { CreateExample, Example } from './Example';
import { EventLogRepository } from './DDD/EventLogRepository';
import { ExampleRepository } from './ExampleRepository';

/*global handler @preserve*/
export const handler: Handler<EventBridgeEvent> = async (event, context) => {
    console.log('EVENT: \n' + JSON.stringify(event, null, 2));
    const inboundCommand = new CreateExample("Hello, world!");

    const eventTopicArn = process.env.EVENT_TOPIC_ARN;
    const eventBusName = process.env.EVENT_BUS_NAME;
    const snapshotTableName = process.env.SNAPSHOT_TABLE_NAME;
    const eventLogTableName = process.env.EVENT_LOG_TABLE_NAME;

    const example = new Example();
    example.handle(inboundCommand);
    const eventLog = example.getEventLog();
    const snapshot = example.toSnapshot();
    const domainEvent = eventLog.mostRecent();

    const broadcaster = new DomainEventBroadcaster(eventTopicArn);
    await broadcaster.publish(domainEvent);

    const publisher = new DomainEventPublisher(new EventBridgeClient(), "Example", eventBusName);
    await publisher.publish(domainEvent, domainEvent.type);

    const eventLogRepository = new EventLogRepository(new DynamoDBClient(), eventLogTableName);
    const snapshotRepository = new SnapshotRepository(new DynamoDBClient(), snapshotTableName);
    const exampleRepository = new ExampleRepository(eventLogRepository, snapshotRepository);
    await exampleRepository.save(example);

    return {
        isBase64Encoded: false,
        statusCode: 200,
        headers: {},
        multiValueHeaders: {},
        body: JSON.stringify({
            domainEvent,
            snapshot
        })
    };
};