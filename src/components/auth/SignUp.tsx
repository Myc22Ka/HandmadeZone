import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import SeparatorWithText from '../utilities/SeparatorWithText/SeparatorWithText';
import { FaGithub } from '@react-icons/all-files/fa/FaGithub';
import { FaGoogle } from '@react-icons/all-files/fa/FaGoogle';
import ButtonWithIcon, { IButtonWithIcon } from '../utilities/ButtonWithIcon/ButtonWithIcon';
import { toast } from 'sonner';
import InputWithLabel from '../utilities/Inputs/InputWithLabel/InputWithLabel';
import { Link } from 'react-router-dom';
import InputPassword from '../utilities/Inputs/InputPassword/InputPassword';
import { OAuth2, request, setAuthHeader } from '@/lib/axiosHelper';
import loginPicture from '@/assets/imgs/login-illustration.jpg';
import CheckBoxWithLabel from '../utilities/CheckBoxWithLabel/CheckBoxWithLabel';

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

const SignUp: React.FC = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        login: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const register = (event: React.FormEvent) => {
        event.preventDefault();

        const { firstName, lastName, login, email, password, confirmPassword } = formData;

        if (!firstName || !lastName || !login || !email || !password || !confirmPassword) {
            toast.error('All fields are required!');
            return;
        }

        if (password !== confirmPassword) {
            toast.error('Passwords do not match!');
            return;
        }

        // toast.loading('Registering...');

        request({ method: 'POST', url: '/register', data: formData })
            .then(response => {
                setAuthHeader(response.data.token);
                toast.success('Successfully registered!');
                setFormData({ firstName: '', lastName: '', login: '', email: '', password: '', confirmPassword: '' });
            })
            .catch(error => {
                setAuthHeader(null);
                toast.error(`Registration failed: ${error.response?.data?.message || error.message}`);
            });
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="flex flex-row w-1/2">
                <div className="flex flex-row w-1/2">
                    <img src={loginPicture} alt="Login Illustration" className="object-cover rounded-l-lg" />
                </div>

                <div className="flex flex-col flex-grow">
                    <CardHeader>
                        <CardTitle className="text-2xl text-center">Sign up</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col flex-grow">
                        <div className="flex space-x-4 justify-center">
                            {buttons.map((props, key) => (
                                <ButtonWithIcon key={key} {...props} onClick={OAuth2} />
                            ))}
                        </div>
                        <SeparatorWithText text="or continue with" className="py-2" />
                        <form onSubmit={register} className="flex flex-col gap-2 h-full">
                            <div className="flex-grow">
                                <InputWithLabel
                                    type="text"
                                    name="firstName"
                                    onChange={handleChange}
                                    value={formData.firstName}
                                    required
                                />
                                <InputWithLabel
                                    type="text"
                                    name="lastName"
                                    onChange={handleChange}
                                    value={formData.lastName}
                                    required
                                />
                                <InputWithLabel
                                    type="text"
                                    name="login"
                                    onChange={handleChange}
                                    value={formData.login}
                                    required
                                />
                                <InputWithLabel
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    value={formData.email}
                                    required
                                />
                                <InputPassword
                                    name="password"
                                    onChange={handleChange}
                                    value={formData.password}
                                    required
                                />
                                <InputPassword
                                    name="confirmPassword"
                                    onChange={handleChange}
                                    value={formData.confirmPassword}
                                    required
                                />
                                <CheckBoxWithLabel required>
                                    Yes, I agree to the{' '}
                                    {
                                        <Link to="/terms" className="underline text-primary">
                                            Terms of Service
                                        </Link>
                                    }
                                    .
                                </CheckBoxWithLabel>
                            </div>
                            <div>
                                <CardFooter className="py-0 flex flex-col justify-center items-center">
                                    <Button
                                        className="flex justify-center items-center w-full"
                                        onClick={register}
                                        type="submit"
                                    >
                                        Sign up
                                    </Button>
                                    <div className="text-xs w-full text-center">
                                        <div>Already have an account?</div>
                                        <Link to="/login" className="underline text-primary">
                                            Log in
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

export default SignUp;
