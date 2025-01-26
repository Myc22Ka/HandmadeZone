import { useAuth } from '@/contexts/AuthProvider';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import React from 'react';

const UserIcon: React.FC = () => {
    const { user } = useAuth();

    return (
        <div className="flex justify-center align-middle gap-2">
            <Avatar className="flex items-center justify-center">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" className="h-8 w-auto rounded-lg" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
                <div className="font-bold">{user?.firstName}</div>
                <div>{user?.email}</div>
                <div>{user?.cash?.toFixed(2)} zł</div>
            </div>
        </div>
    );
};

export default UserIcon;
