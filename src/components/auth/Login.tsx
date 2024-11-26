import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import InputWithLabel from '../utilities/Inputs/InputWithLabel/InputWithLabel';
import SeparatorWithText from '../utilities/SeparatorWithText/SeparatorWithText';
import { FaGithub } from '@react-icons/all-files/fa/FaGithub';
import { FaGoogle } from '@react-icons/all-files/fa/FaGoogle';
import ButtonWithIcon, { IButtonWithIcon } from '../utilities/ButtonWithIcon/ButtonWithIcon';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import InputPassword from '../utilities/Inputs/InputPassword/InputPassword';

function OAuth2(service: string) {
    window.location.href = `http://${import.meta.env.VITE_PLATFORM_URL}:${import.meta.env.VITE_BACKEND_PORT}/oauth2/authorization/${service}`;
}

export const buttons: IButtonWithIcon[] = [
    {
        value: 'GitHub',
        Icon: FaGithub,
    },
    {
        value: 'Google',
        Icon: FaGoogle,
    },
];

const Login: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        password: '',
    });

    const login = () => {
        toast('Not implemented yet...');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
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
                            <ButtonWithIcon key={key} {...props} onClick={OAuth2} />
                        ))}
                    </div>
                    <SeparatorWithText text="or continue with" className="py-2" />
                    <InputWithLabel name="name" type="text" onChange={handleChange} value={formData.name} />
                    <InputPassword name="password" onChange={handleChange} value={formData.password} />
                </CardContent>
                <CardFooter className="flex flex-col justify-center items-center gap-2">
                    <Button className="flex justify-center items-center w-full" onClick={login}>
                        Login
                    </Button>
                    <div className="text-xs py-2 w-full">
                        <div>Need a HandMadeZone account?</div>
                        <Link to="/signup" className="underline text-primary">
                            Create an account
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Login;
