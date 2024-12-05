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
import { request, setAuthHeader } from '@/lib/axiosHelper';

function OAuth2(service: string) {
    window.location.href = `http://${import.meta.env.VITE_PLATFORM_URL}:${import.meta.env.VITE_BACKEND_PORT}/oauth2/authorization/${service.toLowerCase()}`;
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

        request('POST', '/register', {
            firstName: firstName,
            lastName: lastName,
            email: email,
            login: login,
            password: password,
        })
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
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl text-center">Sign up</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex space-x-4">
                        {buttons.map((props, key) => (
                            <ButtonWithIcon key={key} {...props} onClick={OAuth2} />
                        ))}
                    </div>
                    <SeparatorWithText text="or continue with" className="py-2" />

                    {/* Form Inputs */}
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
                    <InputWithLabel type="text" name="login" onChange={handleChange} value={formData.login} required />
                    <InputWithLabel type="email" name="email" onChange={handleChange} value={formData.email} required />
                    <InputPassword name="password" onChange={handleChange} value={formData.password} required />
                    <InputPassword
                        name="confirmPassword"
                        onChange={handleChange}
                        value={formData.confirmPassword}
                        required
                    />
                </CardContent>
                <CardFooter className="flex flex-col justify-center items-center gap-2">
                    <Button className="flex justify-center items-center w-full" onClick={register}>
                        Sign up
                    </Button>
                    <div className="text-xs py-2 w-full">
                        <div>Already have an account?</div>
                        <Link to="/login" className="underline text-primary">
                            Log in
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default SignUp;
