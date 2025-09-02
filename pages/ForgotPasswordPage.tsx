import React, { useState } from 'react';
import { Link } from 'wouter';
import { useMutation } from '@tanstack/react-query';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Logo } from '../components/ui/Logo';
import { InputField } from '../components/ui/InputField';
import { motion } from 'framer-motion';

const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
);

// Mock API call
const sendPasswordResetEmail = async (data: { email: string }) => {
    console.log('Sending password reset email to:', data.email);
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Simulate a successful request regardless of whether the email exists
    // to prevent email enumeration attacks.
    return { message: 'If an account with this email exists, a reset link has been sent.' };
};

const ForgotPasswordPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    
    const mutation = useMutation({
        mutationFn: sendPasswordResetEmail
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setEmailError('');
        if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError('Please enter a valid email address.');
            return;
        }
        mutation.mutate({ email });
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-slate-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="absolute inset-0 -z-10 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#374151_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <div className="max-w-md w-full space-y-8">
                <div className="flex justify-center">
                  <Logo />
                </div>
                <Card className="p-8 shadow-2xl overflow-hidden">
                    {mutation.isSuccess ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center"
                        >
                            <MailIcon />
                            <h2 className="text-2xl font-bold text-center mt-4 mb-2 text-slate-800 dark:text-slate-100">Check your email</h2>
                            <p className="text-slate-500 dark:text-slate-400 mb-6">
                                We've sent a password reset link to <strong>{email}</strong>. Please check your inbox and spam folder.
                            </p>
                            <Link href="/login">
                                <Button variant="secondary" className="w-full">Back to Login</Button>
                            </Link>
                        </motion.div>
                    ) : (
                        <div>
                            <h2 className="text-2xl font-bold text-center mb-1 text-slate-800 dark:text-slate-100">Forgot Password?</h2>
                            <p className="text-center text-slate-500 dark:text-slate-400 mb-6">No worries, we'll send you reset instructions.</p>
                            
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <InputField
                                    label="Email Address"
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    error={emailError}
                                    required
                                />
                                
                                {mutation.isError && <p className="text-red-500 text-sm text-center">Error: {mutation.error.message}</p>}
                                
                                <div className="pt-2">
                                    <Button type="submit" className="w-full !py-3" isLoading={mutation.isPending}>
                                        Send Reset Link
                                    </Button>
                                </div>
                            </form>
                            <p className="text-center text-sm mt-8">
                                <Link href="/login"><a className="font-semibold text-brand-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Back to Login</a></Link>
                            </p>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
