export interface FilterOption {
    key: string; // The key used in the API payload
    label: string; // Display label for the UI
    type: 'text' | 'number' | 'select' | 'date'; // Type of input
    options?: Array<{ value: string | number; label: string }>; // Options for select inputs
    defaultValue?: string | number; // Default value
    prop?: React.InputHTMLAttributes<HTMLInputElement>;
}

// Array of filters based on the criteria
export const filters: FilterOption[] = [
    {
        key: 'minPrice',
        label: 'Minimum Price',
        type: 'number',
        defaultValue: 0,
        prop: { min: '0' },
    },
    {
        key: 'maxPrice',
        label: 'Maximum Price',
        type: 'number',
        defaultValue: 0,
        prop: { min: '0' },
    },
    {
        key: 'description',
        label: 'Description',
        type: 'text',
        defaultValue: '',
    },
    {
        key: 'title',
        label: 'Title',
        type: 'text',
        defaultValue: '',
    },
    {
        key: 'type',
        label: 'Type',
        type: 'select',
        options: [
            { value: 'AUCTION', label: 'Auction' },
            { value: 'QUICK_PURCHASE', label: 'Quick Purchase' },
        ],
        defaultValue: 'AUCTION',
    },
    {
        key: 'userFirstName',
        label: 'User First Name',
        type: 'text',
        defaultValue: '',
    },
    {
        key: 'userLastName',
        label: 'User Last Name',
        type: 'text',
        defaultValue: '',
    },
    {
        key: 'categoryName',
        label: 'Category',
        type: 'select',
        options: [],
        defaultValue: 'all',
    },
    {
        key: 'productName',
        label: 'Product Name',
        type: 'text',
        defaultValue: '',
    },
    {
        key: 'manufacturer',
        label: 'Manufacturer',
        type: 'text',
        defaultValue: '',
    },
    {
        key: 'minRating',
        label: 'Minimum Rating',
        type: 'number',
        defaultValue: 0,
        prop: { min: '0', max: '5' },
    },
    {
        key: 'minReviews',
        label: 'Minimum Reviews',
        type: 'number',
        defaultValue: 0,
        prop: { min: '0' },
    },
    {
        key: 'material',
        label: 'Material',
        type: 'text',
        defaultValue: '',
    },
    {
        key: 'minWeight',
        label: 'Minimum Weight',
        type: 'number',
        defaultValue: 0,
        prop: { min: '0' },
    },
    {
        key: 'maxWeight',
        label: 'Maximum Weight',
        type: 'number',
        defaultValue: 0,
        prop: { min: '0' },
    },
    {
        key: 'status',
        label: 'Status',
        type: 'select',
        options: [
            { value: 'ACTIVE', label: 'Active' },
            { value: 'EXPIRED', label: 'Expired' },
            { value: 'SOLD', label: 'Sold' },
        ],
        defaultValue: 'ACTIVE',
    },
    {
        key: 'minViewCount',
        label: 'Minimum View Count',
        type: 'number',
        defaultValue: 0,
        prop: { min: '0' },
    },
];
