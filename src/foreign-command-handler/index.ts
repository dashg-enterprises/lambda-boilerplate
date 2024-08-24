import { Handler } from 'aws-lambda';
import { EventBridgeEvent, DomainEventPublisher } from './DomainEventPublisher';
import { EventBridgeClient } from '@aws-sdk/client-eventbridge';
import { SnapshotRepository } from './SnapshotRepository';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DomainEventBroadcaster } from './DomainEventBroadcaster';
import { SNSClient } from '@aws-sdk/client-sns';
import { DomainEvent } from './DomainEvent';
import { DemonstrationCreated } from './DemonstrationCreated';
import { CreateDemonstration, Demonstration } from './Demonstration';
import { EventLogRepository } from './EventLogRepository';

/*global handler @preserve*/
export const handler: Handler<EventBridgeEvent> = async (event, context) => {
    console.log('EVENT: \n' + JSON.stringify(event, null, 2));
    const inboundCommand = new CreateDemonstration("Hello, world!");

    const eventTopicArn = process.env.EVENT_TOPIC_ARN;
    const eventBusName = process.env.EVENT_BUS_NAME;
    const snapshotTableName = process.env.SNAPSHOT_TABLE_NAME;
    const eventLogTableName = process.env.EVENT_LOG_TABLE_NAME;

    const demonstrationModel = new Demonstration();
    demonstrationModel.handle(inboundCommand);
    const eventLog = demonstrationModel.getEventLog();
    const snapshot = demonstrationModel.toSnapshot();
    const domainEvent = eventLog[eventLog.length - 1];

    const broadcaster = new DomainEventBroadcaster(eventTopicArn);
    await broadcaster.publish(domainEvent);

    const publisher = new DomainEventPublisher(new EventBridgeClient(), "Demonstration", eventBusName);
    await publisher.publish(domainEvent, domainEvent.type);

    const eventLogRepository = new EventLogRepository(new DynamoDBClient(), eventLogTableName);
    await eventLogRepository.save(demonstrationModel.getEventLog());

    const snapshotRepository = new SnapshotRepository(new DynamoDBClient(), snapshotTableName);
    await snapshotRepository.save(demonstrationModel.toSnapshot());

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