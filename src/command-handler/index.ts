import 'reflect-metadata'
import { APIGatewayEvent, EventBridgeEvent, Handler, SQSEvent } from 'aws-lambda';
import { CreateExample, CreateExampleCommand } from "./commands/CreateExample";
import { Host, IDomainCommand, IDomainEvent, IHandler, Snapshot } from '@dashg-enterprises/ddd-platform';
import { TYPES } from './TYPES';
import { ICreateExampleHandler } from './application/CreateExampleHandler';
import { host } from './inversify.config';

/*global handler @preserve*/
export const handler: Handler<SQSEvent & APIGatewayEvent, LambdaResponse> = async (awsEvent, context) => {
    console.log('EVENT: \n' + JSON.stringify(awsEvent, null, 2));
    const inboundCommand = JSON.parse(awsEvent.Records[0].body) as IDomainCommand;
    const command = inboundCommand instanceof CreateExample ? inboundCommand : new CreateExample(new CreateExampleCommand("Hello, world!"));

    const commandHandler = host.getNamedHandler(command);
    const whatHappened = await commandHandler.handle(command);
    return responseFrom(whatHappened);

    try {
        switch (command.metadata.type) {
            case CreateExample.name: {
                const createExampleHandler = host.get<ICreateExampleHandler>(TYPES.ICreateExampleHandler);
                const result = await createExampleHandler.handle(command);
                return responseFrom(result);
            } default: {
                const commandHandler = host.getNamedHandler(command);
                // const commandHandler = host.getHandler<IHandler<IDomainCommand>, IDomainCommand>(command);
                const result = await commandHandler.handle(command);
                return responseFrom(result);
            }
        }
    } catch (error) {
        return errorFrom(command);
    }
};

export interface LambdaResponse {
    isBase64Encoded: boolean,
    statusCode: number,
    headers: object,
    multiValueHeaders: object,
    body: string
};

function responseFrom(whatHappened: [IDomainEvent, Snapshot]): LambdaResponse {
    const [domainEvent, snapshot] = whatHappened;
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
}

function errorFrom(command: IDomainCommand, message?: string): LambdaResponse {
    return {
        isBase64Encoded: false,
        statusCode: 500,
        headers: {},
        multiValueHeaders: {},
        body: JSON.stringify({
            error: {
                message: message || `No handler registered for ${command.metadata.type}`
            },
            command
        })
    };
}