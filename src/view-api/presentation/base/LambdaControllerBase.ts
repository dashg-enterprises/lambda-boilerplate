import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { IControllerBase } from "./IControllerBase";

export abstract class LambdaControllerBase implements IControllerBase {
    public abstract getById(req: APIGatewayEvent): Promise<APIGatewayProxyResult>;
    public abstract get(req: APIGatewayEvent): Promise<APIGatewayProxyResult>;

    public pathNotFound(path: string): APIGatewayProxyResult {
        return {
            statusCode: 404,
            body: JSON.stringify({ error: `Path '${path}' not found` }),
        };
    }

    protected ok(payload: object): APIGatewayProxyResult {
        return {
            statusCode: 200,
            body: JSON.stringify(payload),
        };
    }

    protected badRequest(message: string): APIGatewayProxyResult {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: message }),
        };
    }

    protected notFound(message: string): APIGatewayProxyResult {
        return {
            statusCode: 404,
            body: JSON.stringify({ error: message }),
        };
    }
}