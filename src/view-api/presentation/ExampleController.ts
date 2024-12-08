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

    public static basePath = "/users/:userId/examples";

    public static getByIdPath = `${ExampleController.basePath}/:id`;
    public async getById(req: APIGatewayEvent) {
        const { userId, id } = req.pathParameters || {};
        if (!id || !userId)
            return this.badRequest("Id and userId are required.");

        
        const example = await this.repo.findOne({ userId, id });

        if (!example) return this.notFound(`Example with id ${id} not found.`);

        return this.ok(example);
    }

    public static getPath = ExampleController.basePath;
    public async get(req: APIGatewayEvent) {
        const { userId } = req.pathParameters || {};

        if (!userId) return this.badRequest("userId is required.");

        const { status, name } = req.queryStringParameters || {};
        const examples = await this.repo.find({ userId, status, name });

        return this.ok(examples);
    }
}