import React from 'react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface ICheckBoxWithLabel extends React.InputHTMLAttributes<HTMLInputElement> {
    children?: React.ReactNode;
}

const CheckBoxWithLabel: React.FC<ICheckBoxWithLabel> = ({ children }) => {
    return (
        <div className="flex items-center space-x-2">
            <Checkbox id="checkbox" />
            <Label htmlFor="checkbox">{children}</Label>
        </div>
    );
};

export default CheckBoxWithLabel;
