import { DomainEvent } from "./DomainEvent";
import { EventLog } from "./EventLog";
import { PutCommand, DynamoDBDocumentClient, QueryCommand, GetCommand } from "@aws-sdk/lib-dynamodb";

export class EventLogRepository {
    tableName: string;
    client: DynamoDBDocumentClient;
    constructor(client: DynamoDBDocumentClient, tableName: string) {
        this.client = client;
        this.tableName = tableName;
    }   

    async save(eventLog: EventLog) {
        const command = new PutCommand({
            TableName: this.tableName,
            Item: eventLog.mostRecent()
        });
        
        const response = await this.client.send(command);
        return response;
    }

    async getById(aggregateId: string) {
        const command = new QueryCommand({
            TableName: this.tableName,
            KeyConditionExpression:
              "aggregateId = :aggregatedId",
            ExpressionAttributeValues: {
              ":aggregateId": aggregateId,
            },
            ConsistentRead: true,
          });

        const response = await this.client.send(command);
        return new EventLog(aggregateId, response.Items as DomainEvent[])
    }
}