import React from 'react';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface ISeparatorWithText {
    text: string;
    className?: string;
}

const SeparatorWithText: React.FC<ISeparatorWithText> = ({ text, className }) => {
    return (
        <div className={cn('flex items-center', className)}>
            <Separator className="flex-1" />
            <span className="px-2 text-center text-xs">{text.toUpperCase()}</span>
            <Separator className="flex-1" />
        </div>
    );
};

export default SeparatorWithText;
