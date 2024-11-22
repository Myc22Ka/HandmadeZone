declare global {
    interface String {
        toTitleCase(): string;
        toRandomString(length: number): string;
    }
}

String.prototype.toTitleCase = function (): string {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};

String.prototype.toRandomString = function (length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';

    if (length <= 0) length = 1;

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }

    return result;
};
