import 'reflect-metadata';
import { APIGatewayEvent, Handler, APIGatewayProxyResultV2 } from 'aws-lambda';
import { host } from '../view-materializer/inversify.config';
import ExampleController from './presentation/ExampleController';
import { TYPES } from '../view-materializer/TYPES';
import { IExampleController } from './presentation/IExampleController';

/*global handler @preserve*/
export const handler: Handler<APIGatewayEvent> = async (event, context): Promise<APIGatewayProxyResultV2<object>> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);
    const exampleController = host.get<IExampleController>(TYPES.IExampleController);

    switch (event.path) {
        case ExampleController.getPath:
            return await exampleController.get(event);
        case ExampleController.getByIdPath:
            return await exampleController.getById(event);
        default:
            return exampleController.pathNotFound(event.path);
    }
};