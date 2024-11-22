import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const LabelTypes = ['text', 'password'] as const;

interface ILabel {
    name: string;
    type: (typeof LabelTypes)[number];
}

export const error = 'name cannot be empty';

const InputWithLabel: React.FC<ILabel> = ({ name, type }) => {
    if (!name) throw new Error(error);

    return (
        <div className="grid w-full max-w-sm items-center gap-1.5 py-2">
            <Label htmlFor={name} className="text-left">
                {name.toTitleCase()}
            </Label>
            <Input type={type} id={name} placeholder={name.toTitleCase()} autoComplete="off" />
        </div>
    );
};

export default InputWithLabel;
