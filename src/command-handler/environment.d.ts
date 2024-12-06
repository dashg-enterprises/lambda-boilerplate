declare global {
    namespace NodeJS {
        interface ProcessEnv {
            EVENT_TOPIC_ARN: string;
            EVENT_BUS_NAME: string;
            EVENT_LOG_TABLE_NAME: string;
            SNAPSHOT_TABLE_NAME: string;
            MATERIALIZED_VIEWS_TABLE_NAME: string;
        }
    }
}

export {}