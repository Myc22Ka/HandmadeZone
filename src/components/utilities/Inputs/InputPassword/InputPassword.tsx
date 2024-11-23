import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BiSolidHide, BiSolidShow } from 'react-icons/bi';
import { IconType } from 'react-icons/lib';

interface IInputPassword extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
}

const options: { Icon: IconType; text: string }[] = [
    {
        Icon: BiSolidHide,
        text: 'Hide',
    },
    {
        Icon: BiSolidShow,
        text: 'Show',
    },
];

const InputPassword: React.FC<IInputPassword> = ({ name, value, onChange, ...rest }) => {
    const [showPassword, setShowPassword] = useState(false);

    const { Icon, text } = options[showPassword ? 0 : 1];

    const handleTogglePassword = () => {
        setShowPassword(prev => !prev);
    };

    return (
        <div className="grid w-full max-w-sm items-center gap-1.5 py-2 select-none">
            <div className="flex justify-between align-middle">
                <Label htmlFor={name} className="text-left">
                    {name.toTitleCase()}
                </Label>
                <div
                    className="text-sm font-medium leading-none peer-disabled:opacity-70 text-left cursor-pointer text-primary"
                    onClick={handleTogglePassword}
                >
                    <Icon className="inline-block" />
                    <div className="inline-block ml-1">{text}</div>
                </div>
            </div>
            <Input
                type={showPassword ? 'text' : 'password'}
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

export default InputPassword;
