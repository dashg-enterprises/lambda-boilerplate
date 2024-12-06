import { INDEX_TYPE, Table } from "@typedorm/common";
import { createConnection } from "@typedorm/core";
import { Example } from "./Example";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {DocumentClientV3} from '@typedorm/document-client';

let alreadyConnected = false;

export function connect() {
    if (alreadyConnected) return alreadyConnected;

    const table = new Table({
        name: process.env.MATERIALIZED_VIEWS_TABLE_NAME,
        partitionKey: 'PK',
        sortKey: 'SK',
        indexes: {
            GSI1: {
                type: INDEX_TYPE.GSI,
                partitionKey: 'GSI1PK',
                sortKey: 'GSI1SK',
            },
            GSI2: {
                type: INDEX_TYPE.GSI,
                partitionKey: 'GSI2PK',
                sortKey: 'GSI2SK',
            },
            LSI1: {
                type: INDEX_TYPE.LSI,
                sortKey: 'LSI1SK',
            },
        },
    });

    createConnection({
        table,
        documentClient: new DocumentClientV3(new DynamoDBClient()),
        entities: [Example],
    });

    alreadyConnected = true;
    return alreadyConnected;
}