import { inject } from "inversify";
import { TYPES } from "../../view-materializer/TYPES";
import { APIGatewayEvent } from 'aws-lambda';
import { IExampleRepository } from "../../view-materializer/infrastructure/IExampleRepository";
import { LambdaControllerBase } from "./base/LambdaControllerBase";
import { IExampleController } from "./IExampleController";

export default class ExampleController extends LambdaControllerBase implements IExampleController {
    private readonly repo: IExampleRepository;
    constructor(@inject(TYPES.IExampleRepository) repo: IExampleRepository) {
        super();
        this.repo = repo;
    }

    public static getByIdPath = "/examples/:id";
    public async getById(req: APIGatewayEvent) {
        if (!req.pathParameters || !req.pathParameters.id)
            return this.badRequest("Id is required.");

        const { id } = req.pathParameters;
        const example = await this.repo.findOne({ id });

        if (!example) return this.notFound(`Example with id ${id} not found.`);

        return this.ok(example);
    }

    public static getPath = "/examples";
    public async get(req: APIGatewayEvent) {
        const { status, name } = req.queryStringParameters || {};

        const examples = await this.repo.find({ status, name });

        return this.ok(examples);
    }
}