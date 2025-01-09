import { OfferStatus, OfferType } from '@/types';
import { Product } from './ProductInterface';

export interface Offer {
    id: number;
    title: string;
    price: number;
    userFirstName: string;
    userLastName: string;
    type: OfferType;
    description: string;
    product: Product;
    createdAt: string;
    startDate: string;
    endDate: string;
    status: OfferStatus;
    viewCount: number;
}
