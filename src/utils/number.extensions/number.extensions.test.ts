/* eslint-disable */
import { describe, expect, it } from 'vitest';
import '@/utils';

describe('randomNumber function', () => {
    it('should return a number within the specified range', () => {
        const min = 1;
        const max = 10;
        const result = (0).randomNumber(min, max);

        expect(result).toBeGreaterThanOrEqual(min);
        expect(result).toBeLessThanOrEqual(max);
    });

    it('should throw an error when min is greater than or equal to max', () => {
        const min = 10;
        const max = 5;

        expect(() => (0).randomNumber(min, max)).toThrow('Invalid range');
    });

    it('should throw an error when non-number inputs are provided', () => {
        const min = 'a' as any;
        const max = 10;

        expect(() => (0).randomNumber(min, max)).toThrow('Invalid range');

        expect(() => (0).randomNumber(1, 'b' as any)).toThrow('Invalid range');

        expect(() => (0).randomNumber('a' as any, 'b' as any)).toThrow('Invalid range');
    });

    it('should return the same number when min and max are equal', () => {
        const number = 5;
        const result = (0).randomNumber(number, number);

        expect(result).toBe(number);
    });
});
