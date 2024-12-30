import { APIGatewayEvent, APIGatewayProxyResultV2 } from "aws-lambda";
import { IControllerBase } from "./IControllerBase";

export abstract class LambdaControllerBase implements IControllerBase {
    public abstract getById(req: APIGatewayEvent): Promise<APIGatewayProxyResultV2<object>>;
    public abstract get(req: APIGatewayEvent): Promise<APIGatewayProxyResultV2<object>>;

    public pathNotFound(path: string): APIGatewayProxyResultV2<object> {
        return {
            statusCode: 404,
            body: { error: `Path '${path}' not found` },
        };
    }

    protected ok(payload: object): APIGatewayProxyResultV2<object> {
        return {
            statusCode: 200,
            body: payload,
        };
    }

    protected badRequest(message: string): APIGatewayProxyResultV2<object> {
        return {
            statusCode: 400,
            body: { error: message },
        };
    }

    protected notFound(message: string): APIGatewayProxyResultV2<object> {
        return {
            statusCode: 404,
            body: { error: message },
        };
    }
}