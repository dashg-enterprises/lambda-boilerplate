import { Handler } from 'aws-lambda';
import { EventBridgeEvent, DomainEventPublisher } from './DomainEventPublisher';
import { EventBridgeClient } from '@aws-sdk/client-eventbridge';
import { SnapshotRepository } from './SnapshotRepository';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DomainEventBroadcaster } from './DomainEventBroadcaster';
import { SNSClient } from '@aws-sdk/client-sns';

/*global handler @preserve*/
export const handler: Handler<EventBridgeEvent> = async (event, context) => {
    console.log('EVENT: \n' + JSON.stringify(event, null, 2));

    const eventTopicArn = process.env.EVENT_TOPIC_ARN;
    const eventBusName = process.env.EVENT_BUS_NAME;
    const snapshotTableName = process.env.SNAPSHOT_TABLE_NAME;
    const eventLogTableName = process.env.EVENT_LOG_TABLE_NAME;

    const id = Math.random().toString().substring(2);
    var domainEvent = {id, greeting: "Hello, world!"};
    const snapshot = {id, state: "Said hello"};

    const broadcaster = new DomainEventBroadcaster(eventTopicArn);
    await broadcaster.publish(domainEvent);

    const publisher = new DomainEventPublisher(new EventBridgeClient(), "Example", eventBusName);
    await publisher.publish(domainEvent, "greeting");

    const snapshotRepository = new SnapshotRepository(new DynamoDBClient(), snapshotTableName);
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