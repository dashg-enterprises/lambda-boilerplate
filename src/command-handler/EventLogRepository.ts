import { AttributeValue, DynamoDBClient, GetItemCommand, PutItemCommand, PutItemCommandInput, QueryCommand } from "@aws-sdk/client-dynamodb"; // ES Modules import
import { DomainEvent } from "./DomainEvent";

export class EventLogRepository {
    tableName: string;
    client: DynamoDBClient;
    constructor(client: DynamoDBClient, tableName: string) {
        this.client = client;
        this.tableName = tableName;
    }   

    async save(eventLog: DomainEvent[]) {
        const input: PutItemCommandInput = {
            "Item": this.toDynamoDbItem(eventLog[eventLog.length - 1]),
            "ReturnConsumedCapacity": "TOTAL",
            "TableName": this.tableName
        };
        const command = new PutItemCommand(input);
        const response = await this.client.send(command);
        return response;
    }

    // async get(aggregateId: string) {
    //     this.client.send(new QueryCommand({
    //         TableName: this.tableName,
    //         ExpressionAttributeNames: {
    //             "#aggregateId": "aggregateId"
    //           },
    //         ExpressionAttributeValues: {
    //             ":aggregateIdValue": aggregateId,
    //           },
    //         KeyConditionExpression: "#aggregateId = :aggregateIdValue",
    //     }))
    // }

    private toDynamoDbItem(snapshot: object) {
        return Object.entries(snapshot).reduce((item, kvp) => {
            item[kvp[0]] = {
                "S": kvp[1]
            };
            return item;
        }, {} as Record<string, AttributeValue>);
    }
}