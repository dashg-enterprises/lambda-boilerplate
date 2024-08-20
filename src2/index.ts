import { Handler } from 'aws-lambda';
import { EventBridgeEvent, publishEvent } from './publishEvent';

export const handler: Handler<EventBridgeEvent> = async (event, context) => {
    console.log('EVENT: \n' + JSON.stringify(event, null, 2));
      
    await publishEvent();

    return context.logStreamName;
};