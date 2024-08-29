import { EventBridgeClient, PutEventsCommand } from "@aws-sdk/client-eventbridge";
import { DomainEvent } from "./DomainEvent";

export class DomainEventPublisher {
  aggregateName: string;
  busName: string;
  client: EventBridgeClient;
  constructor(client: EventBridgeClient, aggregateName: string, busName: string) {
    this.client = client;
    this.aggregateName = aggregateName;
    this.busName = busName;
  }
  async publish(
    domainEvent: DomainEvent,
    source = this.aggregateName,
    busName = this.busName,
    resources = []) {

  
    const response = await this.client.send(
      new PutEventsCommand({
        Entries: [
          {
            Detail: JSON.stringify(domainEvent),
            DetailType: domainEvent.type,
            Resources: resources,
            EventBusName: busName,
            Source: source,
          },
        ],
      })
    );
  
    console.log("PutEvents response:");
    console.log(response);
    return response;
  }
} 

export interface EventBridgeEvent {
  id: string;
  message: string;
}
