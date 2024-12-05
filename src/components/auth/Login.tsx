import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import InputWithLabel from '../utilities/Inputs/InputWithLabel/InputWithLabel';
import SeparatorWithText from '../utilities/SeparatorWithText/SeparatorWithText';
import { FaGithub } from '@react-icons/all-files/fa/FaGithub';
import { FaGoogle } from '@react-icons/all-files/fa/FaGoogle';
import ButtonWithIcon, { IButtonWithIcon } from '../utilities/ButtonWithIcon/ButtonWithIcon';
import { toast } from 'sonner';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import InputPassword from '../utilities/Inputs/InputPassword/InputPassword';
import { request, setAuthHeader } from '@/lib/axiosHelper';
import { useAuth } from '@/contexts/AuthProvider';

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

const initFormData = {
    login: '',
    password: '',
};

const Login: React.FC = () => {
    const [formData, setFormData] = useState(initFormData);
    const { setUser, setToken } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = (location.state as { from?: Location })?.from?.pathname || '/';

    const login = () => {
        request('POST', '/sign-in', formData)
            .then(response => {
                setAuthHeader(response.data.token);
                setUser(response.data);
                setToken(response.data.token);
                localStorage.setItem('auth_token', response.data.token);

                navigate(from);
                setFormData(initFormData);

                toast.success('Successfully registered!');
            })
            .catch(error => {
                setAuthHeader(null);
                toast.error(`Registration failed: ${error.response?.data?.message || error.message}`);
            });
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
                    <InputWithLabel name="login" type="text" onChange={handleChange} value={formData.login} />
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
