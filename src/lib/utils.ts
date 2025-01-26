import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function encodeId(id: string) {
    return btoa(id.toString());
}

export function decodeId(encodedId: string) {
    return atob(encodedId);
}
