import { APIGatewayProxyResult, APIGatewayEvent, Handler } from 'aws-lambda';
import { fakeServiceDomainOrDb } from './example';

/*global handler*/
export const handler: Handler<APIGatewayEvent> = async (event, context): Promise<APIGatewayProxyResult> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);
    const x = fakeServiceDomainOrDb();
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: x,
        }),
    };
};