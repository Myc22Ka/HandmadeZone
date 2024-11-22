import { Button } from '@/components/ui/button';
import React from 'react';
import { IconType } from 'react-icons/lib';

export interface IButtonWithIcon {
    value: string;
    Icon: IconType;
}

const ButtonWithIcon: React.FC<IButtonWithIcon> = ({ value, Icon }) => {
    return (
        <Button className="flex items-center px-4 py-2 bg-gray-800 text-white hover:bg-gray-700">
            <Icon data-testid="icon" className="mr-2 text-xl" />
            {value}
        </Button>
    );
};

export default ButtonWithIcon;
