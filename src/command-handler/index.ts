import { Handler } from 'aws-lambda';
import { EventBridgeEvent, DomainEventPublisher } from './publishEvent';
import { EventBridgeClient } from '@aws-sdk/client-eventbridge';

/*global handler @preserve*/
export const handler: Handler<EventBridgeEvent> = async (event, context) => {
    console.log('EVENT: \n' + JSON.stringify(event, null, 2));

    const publisher = new DomainEventPublisher(new EventBridgeClient(), "Example", "ExampleEventBus_local");
    await publisher.publish({greeting: "Hello, world!"}, "greeting");

    return context.logStreamName;
};