import { inject } from "inversify";
import { TYPES } from "../../view-materializer/TYPES";
import { IExampleRepository } from "../../view-materializer/infrastructure/IExampleRepository";
import { IDomainCommandPublisher, PLATFORM_TYPES, ViewController } from "@dashg-enterprises/ddd-platform";
import { controller, httpGet } from "inversify-express-utils";
import { ExamplePartitionKey, ExampleSortKey } from "../../view-materializer/infrastructure/ExampleRepository";
import { Example } from "../../view-materializer/infrastructure/Example";
import { Request } from "express";

@controller(ExampleController.basePath)
export default class ExampleController extends ViewController<Example, ExamplePartitionKey, ExampleSortKey> {
    public static basePath = "/users/:userId/examples";
    public static getByIdPath = "/:id";
    public static getPath = "/";

    // private readonly repo: IExampleRepository;
    constructor(
        @inject(TYPES.IExampleRepository) repo: IExampleRepository,
        @inject(PLATFORM_TYPES.IDomainCommandPublisher) publisher: IDomainCommandPublisher
    ) {
        super(repo, publisher);
    }

    @httpGet(ExampleController.getByIdPath)
    public async exampleById(request: Request<ExamplePartitionKey & ExampleSortKey>) {
        const { userId, id } = request.params || {};
        if (!id || !userId)
            return this.badRequest("Id and userId are required.");

        return await super.getById(request);
    }

    @httpGet(ExampleController.getPath)
    public async examples(request: Request<ExamplePartitionKey & ExampleSortKey>) {
        const { userId } = request.params || {};
        if (!userId)
            return this.badRequest("userId is required.");

        return await super.get(request);
    }

    // public static getPath = ExampleController.basePath;
    // public async get(req: APIGatewayEvent) {
    //     const { userId } = req.pathParameters || {};

    //     if (!userId) return this.badRequest("userId is required.");

    //     const { status, name, cursor, limit } = req.queryStringParameters || {};

    //     const [ cursorPartitionKey, cursorSortKey ] = cursor?.split(":") || [];

    //     const queryCursor = cursor && {
    //         partitionKey: cursorPartitionKey,
    //         sortKey: cursorSortKey
    //     };

    //     let keyQuery = `EXAMPLE#${userId}`;
    //     if (status) keyQuery += `#STATUS#${status}`;

    //     const queryForPage = {
    //         queryIndex: status ? 'GSI1' : undefined,
    //         keyCondition: {
    //             BEGINS_WITH: keyQuery
    //         },
    //         where: !name ? undefined : {
    //             AND: {
    //                 // age: {
    //                 //     BETWEEN: [1, 5],
    //                 // },
    //                 name: !name ? undefined : {
    //                     EQ: name,
    //                 },
    //                 // status: {
    //                 //     EQ: status,
    //                 // },
    //             },
    //         },
    //         limit: limit ? +limit : undefined,
    //         cursor: queryCursor || undefined,
    //         orderBy: QUERY_ORDER.ASC
    //     };

    //     console.log("Query for page:")
    //     console.log(JSON.stringify(queryForPage, null, 2))

    //     if (status) {
    //         const pageOfExamples = await this.repo.page({ userId, status: status || undefined } as any, queryForPage);
    //         return this.ok(pageOfExamples);
    //     } else {
    //         const examples = await this.repo.find({ userId });
    //         return this.ok(examples);
    //     }
    // }
}