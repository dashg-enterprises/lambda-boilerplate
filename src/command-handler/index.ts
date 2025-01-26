import 'reflect-metadata'
import { APIGatewayEvent, Handler, SQSEvent } from 'aws-lambda';
import { CreateExample } from "./commands/CreateExample";
import { IDomainCommand, IHandler } from '@dashg-enterprises/ddd-platform';
import { TYPES } from './TYPES';
import { ICreateExampleHandler } from './application/CreateExampleHandler';
import { host } from './inversify.config';
import { LambdaResponse, badRequest, responseFrom, notFound } from './infrastructure/LambdaResponse';

/*global handler @preserve*/
export const handler: Handler<SQSEvent & APIGatewayEvent, LambdaResponse> = async (awsEvent, context) => {
    let command: IDomainCommand;
    try {
        console.debug('AWS EVENT: \n' + JSON.stringify(awsEvent, null, 2));
        const rawCommand = awsEvent.body ?? awsEvent.Records[0].body;
        command = JSON.parse(rawCommand) as IDomainCommand;
        console.debug(JSON.stringify(command));
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