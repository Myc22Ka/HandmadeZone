import React from 'react';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface ISelectFrom {
    name: string;
    items: { label: string; value: string }[];
    placeholder?: string;
    onChange: (value: string) => void;
}

const SelectFrom: React.FC<ISelectFrom> = ({ name, items, placeholder, onChange }) => {
    return (
        <div>
            <Label htmlFor={name}>{name.charAt(0).toUpperCase() + name.slice(1)}</Label>
            <Select onValueChange={onChange}>
                <SelectTrigger>
                    <SelectValue placeholder={placeholder || `Select ${name}`} />
                </SelectTrigger>
                <SelectContent>
                    {items.map(({ label, value }) => (
                        <SelectItem key={value} value={value}>
                            {label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

export default SelectFrom;
