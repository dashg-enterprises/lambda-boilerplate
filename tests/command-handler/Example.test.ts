import 'reflect-metadata';
import {describe, expect, test} from '@jest/globals';
import { Example } from '../../src/command-handler/domain/Example';
import { CreateExample, CreateExampleCommand } from '../../src/command-handler/commands/CreateExample';

describe("An example", () => {
    test('should be created by a CreateExample command', () => {
        const example = new Example();
        example.handle(new CreateExample(new CreateExampleCommand("test", "1234-abcd")));
        expect(example.getName()).toBe("test");
    });
});