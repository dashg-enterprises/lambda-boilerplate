import { APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";


export interface IControllerBase {
    pathNotFound(path: string): APIGatewayProxyResult;
    getById(req: APIGatewayEvent): Promise<APIGatewayProxyResult>;
    get(req: APIGatewayEvent): Promise<APIGatewayProxyResult>;
}
