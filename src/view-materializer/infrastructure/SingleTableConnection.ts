import {Connection, createConnection} from '@typedorm/core';
import {DocumentClientV3} from '@typedorm/document-client';
import { Example } from './Example';
import { Table } from '@typedorm/common';
import { inject, injectable } from 'inversify';
import { PLATFORM_TYPES } from '../PLATFORM_TYPES';

@injectable()
export class SingleTableConnection {
    private readonly connection: Connection;
    constructor(
        @inject(PLATFORM_TYPES.Table) table: Table,
        @inject(PLATFORM_TYPES.DocumentClientV3) documentClient: DocumentClientV3
    ) {
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