declare global {
    namespace NodeJS {
        interface ProcessEnv {
            EVENT_BUS_NAME: string;
            EVENT_LOG_TABLE_NAME: string;
            SNAPSHOT_TABLE_NAME: string;
        }
    }
}

export {}