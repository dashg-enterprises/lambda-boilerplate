import 'reflect-metadata';
import { APIGatewayEvent, Handler } from 'aws-lambda';
import { hostApi } from '../view-materializer/inversify.config';

/*global handler @preserve*/
export const handler: Handler<APIGatewayEvent> = hostApi.withServerlessApi();