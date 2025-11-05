import React, { useState, useEffect } from 'react';
import { useLocation, Link, Redirect } from 'wouter';
import { useMutation } from '@tanstack/react-query';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Logo } from '../components/ui/Logo';
import { InputField } from '../components/ui/InputField';
import * as api from '../api';

const VerifyEmailPage: React.FC = () => {
    const [location, setLocation] = useLocation();
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const search = location.split('?')[1];
        const params = new URLSearchParams(search || '');
        const emailFromUrl = params.get('email');
        if (emailFromUrl) {
            setEmail(decodeURIComponent(emailFromUrl));
        }
    }, [location]);

    const verifyMutation = useMutation({
        mutationFn: (data: { email: string; code: string }) => api.verifyEmail(data.email, data.code),
        onSuccess: () => {
            // Redirect to login page after a short delay to show success message
            setTimeout(() => setLocation('/login'), 2000);
        },
        onError: (err: Error) => {
            setError(err.message);
            setSuccess('');
        },
    });
    
    const resendMutation = useMutation({
        mutationFn: (email: string) => api.resendVerificationEmail(email),
        onSuccess: (data) => {
            setSuccess(data.message);
            setError('');
        },
        onError: (err: Error) => {
            setError(err.message);
            setSuccess('');
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        if (!code || code.length !== 6) {
            setError('Please enter the 6-digit verification code.');
            return;
        }
        verifyMutation.mutate({ email, code });
    };

    const handleResend = () => {
        setError('');
        setSuccess('');
        if (email) {
            resendMutation.mutate(email);
        }
    };

    if (!email) {
        // If email is not in the URL, redirect to signup
        return <Redirect to="/signup" />;
    }
    
    if (verifyMutation.isSuccess) {
         return (
            <div className="relative min-h-screen flex items-center justify-center bg-slate-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
                 <div className="max-w-md w-full">
                     <Card className="p-8 text-center">
                         <h2 className="text-2xl font-bold text-green-600 dark:text-green-400">Verification Successful!</h2>
                         <p className="mt-2 text-slate-600 dark:text-slate-300">Your account has been verified. Redirecting you to the login page...</p>
                     </Card>
                 </div>
            </div>
        )
    }

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-slate-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="absolute inset-0 -z-10 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#374151_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <div className="max-w-md w-full space-y-8">
                <div className="flex justify-center">
                  <Logo />
                </div>
                <Card className="p-8 shadow-2xl">
                    <h2 className="text-2xl font-bold text-center mb-1 text-slate-800 dark:text-slate-100">Check your email</h2>
                    <p className="text-center text-slate-500 dark:text-slate-400 mb-6">
                        We sent a verification code to <strong>{email}</strong>
                    </p>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <InputField
                            label="Verification Code"
                            type="text"
                            name="code"
                            value={code}
                            onChange={e => setCode(e.target.value)}
                            maxLength={6}
                            disabled={verifyMutation.isPending}
                        />
                        
                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                        {success && <p className="text-green-500 text-sm text-center">{success}</p>}
                        
                        <div className="pt-2">
                            <Button type="submit" className="w-full !py-3" isLoading={verifyMutation.isPending}>
                                Verify Account
                            </Button>
                        </div>
                    </form>

                    <p className="text-center text-sm mt-8">
                        Didn't receive the email?{' '}
                        <button 
                            onClick={handleResend}
                            disabled={resendMutation.isPending}
                            className="font-semibold text-brand-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {resendMutation.isPending ? 'Sending...' : 'Click to resend'}
                        </button>
                    </p>
                </Card>
            </div>
        </div>
    );
};

export default VerifyEmailPage;