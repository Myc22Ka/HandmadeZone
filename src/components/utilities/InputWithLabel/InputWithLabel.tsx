import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ILabel {
    name: string;
}

const InputWithLabel: React.FC<ILabel> = ({ name }) => {
    return (
        <div className="grid w-full max-w-sm items-center gap-1.5 py-2">
            <Label htmlFor={name} className="text-left">
                {name.toTitleCase()}
            </Label>
            <Input type="text" id={name} placeholder={name.toTitleCase()} autoComplete="off" />
        </div>
    );
};

export default InputWithLabel;
