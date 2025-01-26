import { OfferStatus, OfferType } from '@/types';
import { Product } from './ProductInterface';

export interface Offer {
    id: number;
    title: string;
    price: number;
    userFirstName: string;
    userLastName: string;
    userId: number;
    type: OfferType;
    description: string;
    product: Product;
    createdAt: string;
    startDate: string;
    endDate: string;
    status: OfferStatus;
    viewCount: number;
}

export type OfferSearchRequest = {
    offerIds?: number[];
    userId?: number;
    minPrice?: number;
    maxPrice?: number;
    description?: string;
    title?: string;
    type?: OfferType;
    userFirstName?: string;
    userLastName?: string;
    categoryName?: string;
    productName?: string;
    manufacturer?: string;
    minRating?: number;
    minReviews?: number;
    material?: string;
    minWeight?: number;
    maxWeight?: number;
    startDate?: Date;
    endDate?: Date;
    status?: OfferStatus;
    minViewCount?: number;
};
