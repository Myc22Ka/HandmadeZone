import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const LabelTypes = ['text', 'password', 'email'] as const;

interface ILabel extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    type: (typeof LabelTypes)[number];
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const error = 'name cannot be empty';

const InputWithLabel: React.FC<ILabel> = ({ name, value, onChange, type, ...rest }) => {
    if (!name) throw new Error(error);

    return (
        <div className="grid w-full max-w-sm items-center gap-1.5 py-2">
            <Label htmlFor={name} className="text-left">
                {name.toTitleCase()}
            </Label>
            <Input
                type={type}
                name={name.toCamelCase()}
                id={name}
                value={value}
                onChange={onChange}
                placeholder={name.toTitleCase()}
                autoComplete="off"
                {...rest}
            />
        </div>
    );
};

export default InputWithLabel;
