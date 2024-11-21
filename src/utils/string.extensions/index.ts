declare global {
    interface String {
        toTitleCase(): string;
        toRandomString(length: number): string;
    }
}

String.prototype.toTitleCase = function (): string {
    return this.substring(0, 1).toUpperCase() + this.substring(1, this.length);
};

String.prototype.toRandomString = function (length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';

    if (length <= 0) return '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }

    return result;
};
