import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { OfferSearchRequest } from '@/interfaces/OfferInterface';
import { FilterOption, filters } from '@/lib/filters';
import React, { useState } from 'react';
import SelectFilter from './SelectFilter';

interface FilterComponentProps {
    defaultFilter: OfferSearchRequest;
    setFilter: React.Dispatch<React.SetStateAction<OfferSearchRequest>>;
}

const FilterComponent: React.FC<FilterComponentProps> = ({ defaultFilter, setFilter }) => {
    const [filterValues, setFilterValues] = useState<Record<string, string | number | number[] | Date>>(
        filters.reduce(
            (acc, filter) => {
                acc[filter.key] = defaultFilter?.[filter.key as keyof OfferSearchRequest] || filter.defaultValue || '';
                return acc;
            },
            {} as Record<string, string | number | number[] | Date>
        )
    );

    const handleChange = (key: string, value: number | string) => {
        const validValue = typeof value === 'number' && isNaN(value) ? '' : value;

        setFilterValues(prevValues => ({
            ...prevValues,
            [key]: validValue,
        }));
    };

    const handleSubmit = () => {
        setFilter(filterValues);
    };

    return (
        <div className="w-full">
            <Accordion type="single" collapsible>
                <AccordionItem value="filter-form">
                    <AccordionTrigger className="p-4 font-semibold text-lg">Filter Offers</AccordionTrigger>
                    <AccordionContent>
                        <form className="space-y-6 p-6 border rounded-lg shadow">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {filters.map((filter: FilterOption) => {
                                    return (
                                        <div key={filter.key} className="flex flex-col space-y-2">
                                            <Label htmlFor={filter.key}>{filter.label}</Label>
                                            {filter.type === 'text' && (
                                                <Input
                                                    type="text"
                                                    id={filter.key}
                                                    value={String(filterValues[filter.key])}
                                                    onChange={e => handleChange(filter.key, e.target.value)}
                                                    placeholder={`Enter ${filter.label.toLowerCase()}`}
                                                    {...filter.prop}
                                                />
                                            )}
                                            {filter.type === 'number' && (
                                                <Input
                                                    type="number"
                                                    id={filter.key}
                                                    value={String(filterValues[filter.key])}
                                                    onChange={e => handleChange(filter.key, parseFloat(e.target.value))}
                                                    placeholder={`Enter ${filter.label.toLowerCase()}`}
                                                    {...filter.prop}
                                                />
                                            )}
                                            {filter.type === 'select' && filter.options && (
                                                <SelectFilter
                                                    handleChange={handleChange}
                                                    filter={filter}
                                                    filterValues={filterValues}
                                                    {...filter.prop}
                                                />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                            <Button type="button" onClick={handleSubmit} className="w-full">
                                Apply Filters
                            </Button>
                        </form>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};

export default FilterComponent;
