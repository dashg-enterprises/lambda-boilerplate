import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { ICommandController } from "./ICommandController";

export abstract class LambdaForwarderBase implements ICommandController {
    public abstract create(req: APIGatewayEvent): Promise<APIGatewayProxyResult>;
    public abstract update(req: APIGatewayEvent): Promise<APIGatewayProxyResult>;
    public abstract delete(req: APIGatewayEvent): Promise<APIGatewayProxyResult>;
}
