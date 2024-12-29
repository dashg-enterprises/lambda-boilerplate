import { inject } from "inversify";
import { TYPES } from "../../view-materializer/TYPES";
import { APIGatewayEvent } from 'aws-lambda';
import { IExampleRepository } from "../../view-materializer/infrastructure/IExampleRepository";
import { LambdaControllerBase } from "./base/LambdaControllerBase";
import { IExampleController } from "./IExampleController";
import { QUERY_ORDER } from "@typedorm/common";
import { Paginated } from "./base/Paginated";
import { Example } from "../../view-materializer/infrastructure/Example";

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

        const { status, name, cursor, limit } = req.queryStringParameters || {};

        const [ cursorPartitionKey, cursorSortKey ] = cursor?.split(":") || [];

        const queryCursor = {
            partitionKey: cursorPartitionKey,
            soryKey: cursorSortKey
        };

        const queryForPage = {
            queryIndex: 'GSI1',
            keyCondition: {
                BEGINS_WITH: `EXAMPLE#${userId}#STATUS#${status}`,
            },
            where: !name ? undefined : {
                AND: {
                    // age: {
                    //     BETWEEN: [1, 5],
                    // },
                    name: !name ? undefined : {
                        EQ: name,
                    },
                    // status: {
                    //     EQ: status,
                    // },
                },
            },
            limit: limit ? +limit : undefined,
            cursor: queryCursor,
            orderBy: QUERY_ORDER.ASC
        };

        console.log("Query for page:")
        console.log(JSON.stringify(queryForPage, null, 2))

        const pageOfExamples = await this.repo.page({ userId, status } as any, queryForPage);

        return this.ok(pageOfExamples);
    }
}