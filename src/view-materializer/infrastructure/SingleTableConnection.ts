import {Connection, createConnection} from '@typedorm/core';
import {DocumentClientV3} from '@typedorm/document-client';
import { Example } from './Example';
import { Table } from '@typedorm/common';

export class SingleTableConnection {
    private readonly connection: Connection;
    constructor(table: Table, documentClient: DocumentClientV3) {
        this.connection = createConnection({
            table,
            documentClient,
            entities: [Example],
        });
    }
    public Check() {
        return !!this.connection;
    }
}