import { SNSClient } from "@aws-sdk/client-sns";
import { PublishCommand } from "@aws-sdk/client-sns";

export class DomainEventBroadcaster {
    client: SNSClient;
    topicArn: string;
    static defaultClient = new SNSClient({});
    constructor(topicArn: string, client?: SNSClient) {
        this.topicArn = topicArn;
        this.client = client || DomainEventBroadcaster.defaultClient;
    }

    async publish(
        domainEvent: object
      ) {
        const response = await this.client.send(
          new PublishCommand({
            Message: JSON.stringify(domainEvent),
            TopicArn: this.topicArn,
          }),
        );
        console.log(response);
        // {
        //   '$metadata': {
        //     httpStatusCode: 200,
        //     requestId: 'e7f77526-e295-5325-9ee4-281a43ad1f05',
        //     extendedRequestId: undefined,
        //     cfId: undefined,
        //     attempts: 1,
        //     totalRetryDelay: 0
        //   },
        //   MessageId: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
        // }
        return response;
      };    
}