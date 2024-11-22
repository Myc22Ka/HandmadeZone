import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import InputWithLabel from '../utilities/InputWithLabel/InputWithLabel';
import SeparatorWithText from '../utilities/SeparatorWithText/SeparatorWithText';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import ButtonWithIcon, { IButtonWithIcon } from '../utilities/ButtonWithIcon/ButtonWithIcon';
import { toast } from 'sonner';

function OAuth2(service: string) {
    window.location.href = `http://localhost:8080/oauth2/authorization/${service}`;
}

export const buttons: IButtonWithIcon[] = [
    {
        value: 'GitHub',
        Icon: FaGithub,
        onClick: OAuth2,
    },
    {
        value: 'Google',
        Icon: FaGoogle,
    },
];

const Login: React.FC = () => {
    const login = () => {
        toast('Successfully logged in!');
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl text-center">Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex space-x-4">
                        {buttons.map((props, key) => (
                            <ButtonWithIcon key={key} {...props} />
                        ))}
                    </div>
                    <SeparatorWithText text="or continue with" className="py-2" />
                    <InputWithLabel name="username" type="text" />
                    <InputWithLabel name="password" type="password" />
                </CardContent>
                <CardFooter className="flex justify-center items-center">
                    <Button className="flex justify-center items-center w-full" onClick={login}>
                        Login
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Login;
