import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";


export interface ICommandController {
    create(req: APIGatewayEvent): Promise<APIGatewayProxyResult>;
    update(req: APIGatewayEvent): Promise<APIGatewayProxyResult>;
    delete(req: APIGatewayEvent): Promise<APIGatewayProxyResult>;
}
