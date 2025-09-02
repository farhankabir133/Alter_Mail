import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'wouter';
import { useMutation } from '@tanstack/react-query';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Logo } from '../components/ui/Logo';
import { InputField } from '../components/ui/InputField';
import { motion } from 'framer-motion';

// Mock API call
const resetPassword = async (data: { token: string; password: string }) => {
    console.log('Resetting password with token:', data.token);
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (data.password.length < 6) {
        throw new Error('Password must be at least 6 characters long.');
    }
    return { message: 'Password has been reset successfully.' };
};

const ResetPasswordPage: React.FC = () => {
    const [location, setLocation] = useLocation();
    const [token, setToken] = useState<string | null>(null);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        // wouter's useLocation doesn't parse search params automatically with hash routing
        const search = location.split('?')[1];
        const params = new URLSearchParams(search || '');
        const urlToken = params.get('token');
        if (urlToken) {
            setToken(urlToken);
        }
    }, [location]);

    const mutation = useMutation({
        mutationFn: resetPassword,
        onSuccess: () => {
            // In a real app, you might show a success message on the login page
            setLocation('/login');
        },
        onError: (err: Error) => {
            setError(err.message);
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        if (!token) {
            setError('Invalid or missing reset token.');
            return;
        }
        mutation.mutate({ token, password });
    };

    if (!token) {
        return (
            <div className="min-h-screen flex items-center justify-center text-center px-4">
                <Card>
                    <h2 className="text-xl font-bold text-red-500">Invalid Link</h2>
                    <p className="mt-2 text-slate-600 dark:text-slate-300">The password reset link is invalid or has expired.</p>
                    <Link href="/forgot-password" className="mt-4">
                        <Button variant="secondary">Request a new link</Button>
                    </Link>
                </Card>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-slate-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="absolute inset-0 -z-10 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#374151_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <div className="max-w-md w-full space-y-8">
                <div className="flex justify-center">
                    <Logo />
                </div>
                <Card className="p-8 shadow-2xl">
                    <h2 className="text-2xl font-bold text-center mb-1 text-slate-800 dark:text-slate-100">Create New Password</h2>
                    <p className="text-center text-slate-500 dark:text-slate-400 mb-6">Your new password must be different from previous ones.</p>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <InputField
                            label="New Password"
                            type="password"
                            name="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                        <InputField
                            label="Confirm New Password"
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            required
                        />
                        
                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                        
                        <div className="pt-2">
                            <Button type="submit" className="w-full !py-3" isLoading={mutation.isPending}>
                                Reset Password
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
