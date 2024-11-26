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
import { postUser } from '@/service/userService';
import InputPassword from '../utilities/Inputs/InputPassword/InputPassword';

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

const SingUp: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const register = async () => {
        const { name, email, password, confirmPassword } = formData;

        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) return;

        if (password !== confirmPassword) {
            toast.error('Passwords do not match!');
            return;
        }
        toast.loading('Registering...');

        const { data, loading, error } = await postUser({ name, email, password });

        if (loading) {
            return;
        }

        if (error) {
            toast.error(`Registration failed: ${error}`);
        } else if (data) {
            toast.success('Successfully registered!');
            setFormData({ name: '', email: '', password: '', confirmPassword: '' });
        }
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

                    <InputWithLabel type="text" name="name" onChange={handleChange} value={formData.name} required />
                    <InputWithLabel type="email" name="email" onChange={handleChange} value={formData.email} required />
                    <InputPassword name="password" onChange={handleChange} value={formData.password} required />
                    <InputPassword
                        name="confirm Password"
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

export default SingUp;
