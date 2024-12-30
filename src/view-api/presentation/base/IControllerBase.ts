import { APIGatewayEvent, APIGatewayProxyResultV2 } from "aws-lambda";


export interface IControllerBase {
    pathNotFound(path: string): APIGatewayProxyResultV2<object>;
    getById(req: APIGatewayEvent): Promise<APIGatewayProxyResultV2<object>>;
    get(req: APIGatewayEvent): Promise<APIGatewayProxyResultV2<object>>;
}
