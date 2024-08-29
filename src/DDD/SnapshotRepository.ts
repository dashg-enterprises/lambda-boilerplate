import { PutCommand, DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

export class SnapshotRepository {
    tableName: string;
    client: DynamoDBDocumentClient;
    constructor(client: DynamoDBDocumentClient, tableName: string) {
        this.client = client;
        this.tableName = tableName;
    }   

    async save(snapshot: object) {
        const command = new PutCommand({
            TableName: this.tableName,
            Item: snapshot
        });
        
        const response = await this.client.send(command);
        return response;
    }

    async getById(id: string) {
        const command = new GetCommand({
            TableName: this.tableName,
            Key: { id }
          });

        const response = await this.client.send(command);
        return response.Item as object;
    }
}