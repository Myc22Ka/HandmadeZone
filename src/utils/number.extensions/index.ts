declare global {
    interface Number {
        randomNumber(min: number, max: number): number;
    }
}

Number.prototype.randomNumber = function (min: number, max: number): number {
    if (min === max) return min;

    if (typeof min !== 'number' || typeof max !== 'number' || min >= max) throw new Error('Invalid range');

    return Math.floor(Math.random() * (max - min + 1)) + min;
};
