declare global {
    interface Array<T> {
        getRandom(defaultValue: T): T;
    }
}

Array.prototype.getRandom = function <T>(defaultValue: T): T {
    if (this.length === 0) {
        return defaultValue;
    }
    const randomIndex = Math.floor(Math.random() * this.length);
    return this[randomIndex];
};
