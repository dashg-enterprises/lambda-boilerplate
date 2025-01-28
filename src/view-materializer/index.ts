import 'reflect-metadata';
import { APIGatewayProxyResult, APIGatewayEvent, Handler, SQSEvent, SNSMessage } from 'aws-lambda';
import { host } from './inversify.config';
import { TYPES } from './TYPES';
import { IExampleRepository } from './infrastructure/IExampleRepository';
import { Example } from './infrastructure/Example';
import { ExampleCreated } from '../command-handler/events/ExampleCreated';
import { IDomainEvent } from '@dashg-enterprises/ddd-platform';
import { createResponse, LambdaResponse, materializerNotFound, notFound } from '../command-handler/infrastructure/LambdaResponse';

function responseFrom(example: Example) {
    return createResponse(200, example);
}

/*global handler @preserve*/
export const handler: Handler<SQSEvent> = async (awsEvent, context): Promise<LambdaResponse> => {
    console.log(`Event: ${JSON.stringify(awsEvent, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);
    const rawSnsMessage = awsEvent.Records[0].body;
    const snsMessage = JSON.parse(rawSnsMessage) as SNSMessage;
    const domainEvent = JSON.parse(snsMessage.Message) as IDomainEvent;

    try {
        switch (true) {
            case ExampleCreated.isTypeOf(domainEvent): {
                const exampleCreated: ExampleCreated = domainEvent;

                const newExample = new Example();
                newExample.id = exampleCreated.event.exampleId;
                newExample.name = exampleCreated.event.name;
                newExample.userId = exampleCreated.event.userId;
                newExample.status = exampleCreated.event.status;

                const exampleRepo = host.get<IExampleRepository>(TYPES.IExampleRepository);
                const createdExample = await exampleRepo.create(newExample);
                return responseFrom(createdExample);
            }
            default: {
                throw new Error("Event not materialized");
            }
        }
    } catch (e) {
        console.error(e);
        return materializerNotFound(domainEvent);
    }
};