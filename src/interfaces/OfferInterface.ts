import { Product } from './ProductInterface';

export interface Offer {
    id: number;
    title: string;
    price: number;
    userFirstName: string;
    userLastName: string;
    type: string;
    description: string;
    product: Product;
    createdAt: string;
    startDate: string;
    endDate: string;
    status: string;
    viewCount: number;
}
