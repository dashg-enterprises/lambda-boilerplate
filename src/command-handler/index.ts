import 'reflect-metadata'
import { APIGatewayEvent, EventBridgeEvent, Handler, SQSEvent } from 'aws-lambda';
import { CreateExample, CreateExampleCommand } from "./commands/CreateExample";
import { Host, IDomainCommandPublisher, IDomainCommand, IDomainEvent, IHandler, PLATFORM_TYPES, Snapshot } from '@dashg-enterprises/ddd-platform';
import { TYPES } from './TYPES';
import { ICreateExampleHandler } from './application/CreateExampleHandler';
import { host } from './inversify.config';
import { ScheduleExample } from './commands/ScheduleExample';
import { IScheduleExampleHandler } from './application/ScheduleExampleHandler';
import { UpdateExample } from './commands/UpdateExample';

/*global handler @preserve*/
export const handler: Handler<SQSEvent & APIGatewayEvent, LambdaResponse> = async (awsEvent, context) => {
    let command: IDomainCommand;
    try {
        console.log('EVENT: \n' + JSON.stringify(awsEvent, null, 2));
        const rawCommand = awsEvent.body ?? awsEvent.Records[0].body;
        command = JSON.parse(rawCommand) as IDomainCommand;

        console.log("-------------command----------------");
        console.log(JSON.stringify(command));
        console.log("-------------container--------------");
        console.log(host.eject());
        console.log("------------------------------------");
    } catch(e: unknown) {
        return badRequest(e as Error);
    }

    // const commandHandler = host.getNamedHandler(command);
    // const whatHappened = await commandHandler.handle(command);
    // return responseFrom(whatHappened);
    try {
        switch (true) {
            case CreateExample.isTypeOf(command): {
                const createExampleHandler = host.get<ICreateExampleHandler>(TYPES.ICreateExampleHandler);
                const result = await createExampleHandler.handle(command);
                return responseFrom(result);
            }
            default: {
                const commandHandler = host.getHandler<IHandler<IDomainCommand>, IDomainCommand>(command);
                const result = await commandHandler.handle(command);
                return responseFrom(result);
            }
        }
    } catch (e) {
        console.error(e);
        return notFound(command);
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
    return createResponse(200, {
        domainEvent,
        snapshot
    });
}

function notFound(command: IDomainCommand, message?: string): LambdaResponse {
    return createResponse(404, {
        error: {
            message: message || `Handler not found for ${command.metadata.type}`
        },
        command
    });
}

function badRequest(error: Error): LambdaResponse {
    return createResponse(400, {
        error: {
            message: error.message,
            stack: error.stack,
            name: error.name
        }
    });
}

function createResponse(status: number, body: object): LambdaResponse {
    return {
        isBase64Encoded: false,
        statusCode: status,
        headers: {},
        multiValueHeaders: {},
        body: JSON.stringify(body)
    };
}