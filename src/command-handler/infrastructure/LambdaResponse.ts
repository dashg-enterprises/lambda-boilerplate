import { IDomainCommand, IDomainEvent, Snapshot } from "@dashg-enterprises/ddd-platform";

export interface LambdaResponse {
    isBase64Encoded: boolean,
    statusCode: number,
    headers: object,
    multiValueHeaders: object,
    body: string
};

export function responseFrom(whatHappened: [IDomainEvent, Snapshot]): LambdaResponse {
    const [domainEvent, snapshot] = whatHappened;
    return createResponse(200, {
        domainEvent,
        snapshot
    });
}

export function notFound(command: IDomainCommand, message?: string): LambdaResponse {
    return createResponse(404, {
        error: {
            message: message || `Handler not found for ${command.metadata.type}`
        },
        command
    });
}

export function materializerNotFound(domainEvent: IDomainEvent): LambdaResponse {
    return createResponse(404, {
        error: {
            message: `Materializer not found for ${domainEvent.metadata.type}`
        },
        event: domainEvent
    });
}

export function badRequest(error: Error): LambdaResponse {
    return createResponse(400, {
        error: {
            message: error.message,
            stack: error.stack,
            name: error.name
        }
    });
}

export function createResponse(status: number, body: object): LambdaResponse {
    return {
        isBase64Encoded: false,
        statusCode: status,
        headers: {},
        multiValueHeaders: {},
        body: JSON.stringify(body)
    };
}