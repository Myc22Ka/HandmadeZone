import { Dimensions, Weight } from '@/types';
import { Category } from './CategoryInterface';

export interface Product {
    id: number;
    name: string;
    category: Category;
    manufacturer: string;
    dimensions: Dimensions;
    weight: Weight;
    material: string;
    rating: number;
    reviews: number;
    imageUrl: string;
}
