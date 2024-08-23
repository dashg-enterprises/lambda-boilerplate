import { Handler } from 'aws-lambda';
import { EventBridgeEvent, DomainEventPublisher } from './publishEvent';
import { EventBridgeClient } from '@aws-sdk/client-eventbridge';
import { SnapshotRepository } from './SnapshotRepository';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

/*global handler @preserve*/
export const handler: Handler<EventBridgeEvent> = async (event, context) => {
    console.log('EVENT: \n' + JSON.stringify(event, null, 2));

    const eventBusName = process.env.EVENT_BUS_NAME;
    const snapshotTableName = process.env.SNAPSHOT_TABLE_NAME;
    const eventLogTableName = process.env.EVENT_LOG_TABLE_NAME;
    console.log(eventBusName, snapshotTableName, eventLogTableName);

    const publisher = new DomainEventPublisher(new EventBridgeClient(), "Example", eventBusName);
    var domainEvent = {greeting: "Hello, world!"};
    await publisher.publish(domainEvent, "greeting");

    const snapshotRepository = new SnapshotRepository(new DynamoDBClient(), snapshotTableName);
    const snapshot = {id: Math.random().toString().substring(2), state: "Said hello"};
    await snapshotRepository.save(snapshot);

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