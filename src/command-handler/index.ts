import { Handler } from 'aws-lambda';
import { EventBridgeEvent, DomainEventPublisher } from './publishEvent';
import { EventBridgeClient } from '@aws-sdk/client-eventbridge';
import { SnapshotRepository } from './SnapshotRepository';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

/*global handler @preserve*/
export const handler: Handler<EventBridgeEvent> = async (event, context) => {
    console.log('EVENT: \n' + JSON.stringify(event, null, 2));

    const publisher = new DomainEventPublisher(new EventBridgeClient(), "Example", "example-command-handler-localEventBus");
    await publisher.publish({greeting: "Hello, world!"}, "greeting");

    const snapshotRepository = new SnapshotRepository(new DynamoDBClient(), "example-command-handler-localSnapshots");
    await snapshotRepository.save({id: Math.random().toString().substring(2), state: "Said hello"});

    return context.logStreamName;
};