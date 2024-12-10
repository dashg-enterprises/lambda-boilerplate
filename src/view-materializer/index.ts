import 'reflect-metadata';
import { APIGatewayProxyResult, APIGatewayEvent, Handler } from 'aws-lambda';
import { host } from './inversify.config';
import { TYPES } from './TYPES';
import { IExampleRepository } from './infrastructure/IExampleRepository';
import { Example } from './infrastructure/Example';

/*global handler @preserve*/
export const handler: Handler<APIGatewayEvent> = async (event, context): Promise<APIGatewayProxyResult> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);
    if (!event.body) throw new Error("Body required");
    const snapshot = JSON.parse(event.body) as Example;
    const newExample = new Example();
    newExample.id = snapshot.id;
    newExample.name = snapshot.name;
    newExample.userId = snapshot.userId;
    newExample.status = snapshot.status;
    const exampleRepo = host.get<IExampleRepository>(TYPES.IExampleRepository);
    const createdExample = await exampleRepo.create(newExample);
    
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: createdExample,
        }),
    };
};