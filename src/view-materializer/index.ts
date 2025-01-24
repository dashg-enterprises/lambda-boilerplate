import 'reflect-metadata';
import { APIGatewayProxyResult, APIGatewayEvent, Handler, SQSEvent } from 'aws-lambda';
import { host } from './inversify.config';
import { TYPES } from './TYPES';
import { IExampleRepository } from './infrastructure/IExampleRepository';
import { Example } from './infrastructure/Example';
import { ExampleCreated } from '../command-handler/events/ExampleCreated';

/*global handler @preserve*/
export const handler: Handler<SQSEvent & APIGatewayEvent> = async (awsEvent, context): Promise<APIGatewayProxyResult> => {
    console.log(`Event: ${JSON.stringify(awsEvent, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);
    if (!awsEvent.body) throw new Error("Body required");
    const rawDomainEvent = awsEvent.body ?? awsEvent.Records[0].body;
    const exampleCreated = JSON.parse(rawDomainEvent) as ExampleCreated;

    const newExample = new Example();
    newExample.id = exampleCreated.event.exampleId;
    newExample.name = exampleCreated.event.name;
    newExample.userId = exampleCreated.event.userId;
    newExample.status = exampleCreated.event.status;
    
    const exampleRepo = host.get<IExampleRepository>(TYPES.IExampleRepository);
    const createdExample = await exampleRepo.create(newExample);
    
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: createdExample,
        }),
    };
};