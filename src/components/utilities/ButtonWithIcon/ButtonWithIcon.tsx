import { Button } from '@/components/ui/button';
import React from 'react';
import { IconType } from '@react-icons/all-files/lib';

export interface IButtonWithIcon {
    value: string;
    Icon: IconType;
    onClick?: (service: string) => void;
}

const ButtonWithIcon: React.FC<IButtonWithIcon> = ({ value, Icon, onClick }) => {
    return (
        <Button
            onClick={() => onClick && onClick(value)}
            className="flex items-center px-4 py-2 bg-gray-800 text-white hover:bg-gray-700"
        >
            <Icon data-testid="icon" className="mr-2 text-xl" />
            {value}
        </Button>
    );
};

export default ButtonWithIcon;
