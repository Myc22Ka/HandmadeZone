import { describe, expect, it } from 'vitest';
import '@/utils';

const single = 'single';
const defaultValue = 'default';

describe('getRandom', () => {
    it('should return the default value if the array is empty', () => {
        const emptyArray: string[] = [];
        expect(emptyArray.getRandom(defaultValue)).toBe(defaultValue);
    });

    it('should return a random element from the array if it has elements', () => {
        const array = ['apple', 'banana', 'cherry'];
        expect(array).toContain(array.getRandom(defaultValue));
    });

    it('should return the only element in the array if it contains just one', () => {
        const singleElementArray = [single];
        expect(singleElementArray.getRandom(defaultValue)).toBe(single);
    });

    it('should always return the same element if the array has only one element', () => {
        const singleElementArray = [single];
        const result = singleElementArray.getRandom(defaultValue);
        expect(result).toBe(single);
    });
});
