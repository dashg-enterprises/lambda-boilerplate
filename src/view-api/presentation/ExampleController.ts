import { inject } from "inversify";
import { TYPES } from "../../view-materializer/TYPES";
import { APIGatewayEvent } from 'aws-lambda';
import { IExampleRepository } from "../../view-materializer/infrastructure/IExampleRepository";
import { IExampleController } from "./IExampleController";
import { QUERY_ORDER } from "@typedorm/common";
import { LambdaControllerBase } from "@dashg-enterprises/ddd-platform";

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

        const queryCursor = cursor && {
            partitionKey: cursorPartitionKey,
            sortKey: cursorSortKey
        };

        let keyQuery = `EXAMPLE#${userId}`;
        if (status) keyQuery += `#STATUS#${status}`;

        const queryForPage = {
            queryIndex: status ? 'GSI1' : undefined,
            keyCondition: {
                BEGINS_WITH: keyQuery
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
            cursor: queryCursor || undefined,
            orderBy: QUERY_ORDER.ASC
        };

        console.log("Query for page:")
        console.log(JSON.stringify(queryForPage, null, 2))

        if (status) {
            const pageOfExamples = await this.repo.page({ userId, status: status || undefined } as any, queryForPage);
            return this.ok(pageOfExamples);
        } else {
            const examples = await this.repo.find({ userId });
            return this.ok(examples);
        }
    }
}