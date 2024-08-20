import { EventBridgeClient, PutEventsCommand } from "@aws-sdk/client-eventbridge";

export async function publishEvent(
  source = "eventbridge.integration.test",
  detailType = "greeting",
  resources = []) {
  const client = new EventBridgeClient({});

  const response = await client.send(
    new PutEventsCommand({
      Entries: [
        {
          Detail: JSON.stringify({ greeting: "Hello there." }),
          DetailType: detailType,
          Resources: resources,
          Source: source,
        },
      ],
    })
  );

  console.log("PutEvents response:");
  console.log(response);
  return response;
}
export interface EventBridgeEvent {
  id: string;
  message: string;
}
