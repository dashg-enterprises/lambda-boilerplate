import { Context, APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import { fakeServiceDomainOrDb } from './example';

export const handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
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