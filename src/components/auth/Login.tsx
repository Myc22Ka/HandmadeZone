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
import { OAuth2, request, setAuthHeader } from '@/lib/axiosHelper';
import { useAuth } from '@/contexts/AuthProvider';
import loginPicture from '@/assets/imgs/login-illustration.jpg';

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

    const login = (event: React.FormEvent) => {
        event.preventDefault();

        request({ method: 'POST', url: '/sign-in', data: formData })
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
            <Card className="flex flex-row w-1/2">
                <div className="flex flex-row w-1/2">
                    <img src={loginPicture} alt="Login Illustration" className="object-cover rounded-l-lg" />
                </div>

                <div className="flex flex-col flex-grow">
                    <CardHeader>
                        <CardTitle className="text-2xl text-center">Login</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col flex-grow">
                        <div className="flex space-x-4 justify-center">
                            {buttons.map((props, key) => (
                                <ButtonWithIcon key={key} {...props} onClick={OAuth2} />
                            ))}
                        </div>
                        <SeparatorWithText text="or continue with" className="py-2" />
                        <form onSubmit={login} className="flex flex-col gap-2 h-full">
                            <div className="flex-grow">
                                <InputWithLabel
                                    name="login"
                                    type="text"
                                    onChange={handleChange}
                                    value={formData.login}
                                    required
                                />
                                <InputPassword
                                    name="password"
                                    onChange={handleChange}
                                    value={formData.password}
                                    required
                                />
                            </div>
                            <div>
                                <CardFooter className="py-0 flex flex-col justify-center items-center">
                                    <Button
                                        className="flex justify-center items-center w-full"
                                        type="submit"
                                        onClick={login}
                                    >
                                        Login
                                    </Button>
                                    <div className="text-xs w-full text-center">
                                        <div>Need a HandMadeZone account?</div>
                                        <Link to="/signup" className="underline text-primary">
                                            Create an account
                                        </Link>
                                    </div>
                                </CardFooter>
                            </div>
                        </form>
                    </CardContent>
                </div>
            </Card>
        </div>
    );
};

export default Login;
