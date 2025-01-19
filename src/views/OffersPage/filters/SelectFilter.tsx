import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useCategories from '@/hooks/useCategories';
import { FilterOption } from '@/lib/filters';
import React from 'react';

interface SelectFilterProps {
    handleChange: (key: string, value: number | string) => void;
    filter: FilterOption;
    filterValues: Record<string, string | number | number[] | Date>;
}

const SelectFilter: React.FC<SelectFilterProps> = ({ handleChange, filter, filterValues }) => {
    const { categories } = useCategories('/api/categories', null);

    return (
        <Select
            onValueChange={value => handleChange(filter.key, value)}
            defaultValue={String(filterValues[filter.key])}
        >
            <SelectTrigger id={filter.key}>
                <SelectValue placeholder={`Select ${filter.label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
                {filter.key !== 'categoryName' ? (
                    filter.options!.map(option => (
                        <SelectItem key={option.value} value={String(option.value)}>
                            {option.label}
                        </SelectItem>
                    ))
                ) : (
                    <>
                        <SelectItem key="all" value="all">
                            All
                        </SelectItem>
                        {categories.map(option => (
                            <SelectItem key={option.id} value={option.name.toLowerCase()}>
                                {option.name}
                            </SelectItem>
                        ))}
                    </>
                )}
            </SelectContent>
        </Select>
    );
};

export default SelectFilter;
