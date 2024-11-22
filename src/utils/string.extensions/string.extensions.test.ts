import { describe, it, expect } from 'vitest';
import '@/utils';

const generateRandomNumber = () => {
    const min = 0;
    const max = 100;

    return Number().randomNumber(min, max);
};

describe('String.prototype extensions', () => {
    describe('toTitleCase', () => {
        it('should capitalize the first letter and keep the rest lowercase', () => {
            const amountOfTests = 10;

            for (let i = 0; i < amountOfTests; i++) {
                const randomString = String().toRandomString(generateRandomNumber());

                expect(randomString.toTitleCase()).toBe(
                    randomString.charAt(0).toUpperCase() + randomString.slice(1).toLowerCase()
                );
            }
        });

        it('should return an empty string when the string is empty', () => {
            expect(''.toTitleCase()).toBe('');
        });
    });

    describe('toRandomString', () => {
        it('should generate a string of the correct length', () => {
            const random = generateRandomNumber();

            const randomString = String().toRandomString(random);
            expect(randomString.length).toBe(random);
        });

        it('should generate a string with uppercase and lowercase letters', () => {
            const randomString = String().toRandomString(generateRandomNumber());
            const regex = /^[A-Za-z]+$/;
            expect(randomString).toMatch(regex);
        });

        it('should return a string with at least one character if the length is 0', () => {
            expect(''.toRandomString(0)).not.toBe('');
        });

        it('should return a string with at least one character if the length is negative', () => {
            const randomNegative = -generateRandomNumber();
            expect(''.toRandomString(randomNegative)).not.toBe('');
        });
    });
});
