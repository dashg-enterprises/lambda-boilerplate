import 'reflect-metadata';
import {describe, expect, test} from '@jest/globals';
import { Example } from '../../src/command-handler/domain/Example';
import { CreateExample, CreateExampleCommand } from '../../src/command-handler/commands/CreateExample';
import { handler, LambdaResponse } from '../../src/command-handler';
import { IDomainCommand } from '@dashg-enterprises/ddd-platform';

describe("A command handler", () => {
    test('should be a lambda function', () => {
        const commandHandler = handler;
        expect(typeof commandHandler).toBe("function");
    });
    test('should respond with 200 for a valid command', async () => {
        const command = new CreateExample(new CreateExampleCommand("It works!"));
        const commandHandler = handler;
        const response = await commandHandler(asAWSEvent(command), {awsRequestId: ""} as any, () => {});
        expect((response as LambdaResponse).statusCode).toBe(200);
    });
});

function asAWSEvent(command: IDomainCommand) {
    return {
        Records: [{
            body: JSON.stringify(command),
            messageId: '',
            receiptHandle: '',
            attributes: {} as any,
            messageAttributes: {} as any,
            md5OfBody: '',
            eventSource: '',
            eventSourceARN: '',
            awsRegion: ''
        }],
        body: null,
        headers: {},
        multiValueHeaders: {},
        httpMethod: '',
        isBase64Encoded: false,
        path: '',
        pathParameters: null,
        queryStringParameters: null,
        multiValueQueryStringParameters: null,
        stageVariables: null,
        requestContext: {} as any,
        resource: ''
    };
}