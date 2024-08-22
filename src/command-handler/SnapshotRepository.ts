import { AttributeValue, DynamoDBClient, PutItemCommand, PutItemCommandInput } from "@aws-sdk/client-dynamodb"; // ES Modules import

export class SnapshotRepository {
    tableName: string;
    client: DynamoDBClient;
    constructor(client: DynamoDBClient, tableName: string) {
        this.client = client;
        this.tableName = tableName;
    }   

    async save(snapshot: object) {
        const input: PutItemCommandInput = {
            "Item": this.toDynamoDbItem(snapshot),
            "ReturnConsumedCapacity": "TOTAL",
            "TableName": this.tableName
        };
        const command = new PutItemCommand(input);
        const response = await this.client.send(command);
        return response;
    }

    private toDynamoDbItem(snapshot: object) {
        return Object.entries(snapshot).reduce((item, kvp) => {
            item[kvp[0]] = {
                "S": kvp[1]
            };
            return item;
        }, {} as Record<string, AttributeValue>);
    }
}