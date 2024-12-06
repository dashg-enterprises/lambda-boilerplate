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
    const exampleRepo = host.get<IExampleRepository>(TYPES.IExampleRepository);
    const newExample = await exampleRepo.create(snapshot);
    const example = await exampleRepo.findOne({id: snapshot.id});
    const examples = await exampleRepo.find({});
    
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: example,
        }),
    };
};