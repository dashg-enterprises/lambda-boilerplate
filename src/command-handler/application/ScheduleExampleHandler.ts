import { CustomHandlerBase, HandlerBase, IAggregateService, IAggregateServiceUtilities, IDomainEvent, IHandler, PLATFORM_TYPES, ISnapshot } from "@dashg-enterprises/ddd-platform";
import { CreateExample, CreateExampleCommand } from "../commands/CreateExample";
import { inject } from "inversify";
import { ScheduleExample } from "../commands/ScheduleExample";
import { Example } from "../domain/Example";
import { ExampleScheduled, ExampleScheduledEvent } from "../events/ExampleScheduled";

export interface IScheduleExampleHandler extends IHandler<ScheduleExample> {
}

export class ScheduleExampleHandler extends CustomHandlerBase<Example, ScheduleExample> implements IScheduleExampleHandler {
    constructor(@inject(PLATFORM_TYPES.IAggregateServiceUtilities) utilities: IAggregateServiceUtilities<Example>) {
        super(utilities);
    }
    async handle(scheduleExample: ScheduleExample): Promise<[IDomainEvent, ISnapshot]> {
        const delayedCreateExample = new CreateExample(new CreateExampleCommand(scheduleExample.command.name, scheduleExample.command.userId));
        await this.utilities.issue(delayedCreateExample, scheduleExample.command.nextRunInSeconds);
        const exampleScheduled = new ExampleScheduled(
            new ExampleScheduledEvent(
                `delayed-${delayedCreateExample.correlationId}`,
                delayedCreateExample.command.name
            ),
            scheduleExample
        );
        return [
            exampleScheduled,
            {} // no aggregate created yet!
        ];
    }
}