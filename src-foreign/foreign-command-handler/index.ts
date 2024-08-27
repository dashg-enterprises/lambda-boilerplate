import 'reflect-metadata'
import { Handler, SQSEvent } from 'aws-lambda';
import { Host } from './Host';
import { IDemonstrationService } from './application/DemonstrationService';
import { ExampleCreated } from '../../src/command-handler/events/ExampleCreated';

/*global handler @preserve*/
export const handler: Handler<SQSEvent> = async (sqsEvent, context) => {
    console.log('EVENT: \n' + JSON.stringify(sqsEvent, null, 2));
    const host = new Host();
    const demonstrationService = host.get<IDemonstrationService>();
    const exampleCreated = JSON.parse(sqsEvent.Records[0].body) as ExampleCreated;

    const [domainEvent, snapshot] = await demonstrationService.handle(exampleCreated);

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