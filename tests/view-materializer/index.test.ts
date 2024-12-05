import {describe, expect, test} from '@jest/globals';
import { handler } from '../../src/view-materializer';

describe("A view materializer", () => {
    test('should be a lambda function', () => {
        const viewMaterializer = handler;
        expect(typeof viewMaterializer).toBe("function");
    });
});