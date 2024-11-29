import 'reflect-metadata'
import { APIGatewayEvent, EventBridgeEvent, Handler, SQSEvent } from 'aws-lambda';
import { CreateExample, CreateExampleCommand } from "./commands/CreateExample";
import { Host, IHandler } from '@dashg-enterprises/ddd-platform';
import { TYPES } from './TYPES';
import { ICreateExampleHandler } from './application/CreateExampleHandler';

/*global handler @preserve*/
export const handler: Handler<SQSEvent & APIGatewayEvent> = async (awsEvent, context) => {
    console.log('EVENT: \n' + JSON.stringify(awsEvent, null, 2));
    const inboundCommand = JSON.parse(awsEvent.Records[0].body) as CreateExample;

    const command = inboundCommand instanceof CreateExample ? inboundCommand : new CreateExample(new CreateExampleCommand("Hello, world!"));

    const host = new Host();
    const createExampleHandler = host.get<ICreateExampleHandler>(TYPES.ICreateExampleHandler);

    const [domainEvent, snapshot] = await createExampleHandler.handle(command);

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