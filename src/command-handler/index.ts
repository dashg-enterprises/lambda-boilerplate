import 'reflect-metadata'
import { Handler } from 'aws-lambda';
import { EventBridgeEvent } from '../DDD/DomainEventPublisher';
import { CreateExample } from "./commands/CreateExample";
import { Host } from './Host';
import { IExampleService } from './application/ExampleService';

/*global handler @preserve*/
export const handler: Handler<EventBridgeEvent> = async (event, context) => {
    console.log('EVENT: \n' + JSON.stringify(event, null, 2));
    const command = new CreateExample("Hello, world!");

    const host = new Host();
    const exampleService = host.get<IExampleService>();

    const [domainEvent, snapshot] = await exampleService.createExample(command);

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