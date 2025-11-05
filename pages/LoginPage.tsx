import React, { useState } from 'react';
import { useLocation, Link, Redirect } from 'wouter';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Logo } from '../components/ui/Logo';
import { InputField } from '../components/ui/InputField';
import { useAuth } from '../contexts/AuthContext';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';

const LoginPage: React.FC = () => {
    const [, setLocation] = useLocation();
    const { isAuthenticated, login, loginWithGoogle, isLoading: isAuthLoading } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
        if (credentialResponse.credential) {
            setIsSubmitting(true);
            setError('');
            try {
                await loginWithGoogle(credentialResponse.credential);
                setLocation('/dashboard');
            } catch (err: any) {
                setError(err.message || "Failed to sign in with Google.");
                setIsSubmitting(false);
            }
        }
    };

    const handleGoogleError = () => {
        setError("Google sign-in was unsuccessful. Please try again.");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        try {
            await login(email, password);
            setLocation('/dashboard');
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred.');
            setIsSubmitting(false);
        }
    };

    if (isAuthenticated) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-slate-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="absolute inset-0 -z-10 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#374151_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <div className="max-w-md w-full space-y-8">
                <div className="flex justify-center">
                  <Logo />
                </div>
                <Card className="p-8 shadow-2xl">
                    <h2 className="text-2xl font-bold text-center mb-1 text-slate-800 dark:text-slate-100">Welcome Back</h2>
                    <p className="text-center text-slate-500 dark:text-slate-400 mb-6">Sign in to continue to AltMail</p>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <InputField
                            label="Email Address"
                            type="email"
                            name="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            disabled={isSubmitting || isAuthLoading}
                        />
                         <InputField
                            label="Password"
                            type="password"
                            name="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            disabled={isSubmitting || isAuthLoading}
                        />
                        
                        <div className="flex items-center justify-end text-sm">
                          <Link href="/forgot-password">
                            <a className="font-semibold text-brand-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                              Forgot your password?
                            </a>
                          </Link>
                        </div>

                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                        
                        <div className="pt-2">
                            <Button type="submit" className="w-full !py-3" isLoading={isSubmitting || isAuthLoading}>
                                Login
                            </Button>
                        </div>
                    </form>

                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-slate-300 dark:border-slate-600" />
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-2 text-slate-500 dark:bg-slate-800 dark:text-slate-400">OR</span>
                      </div>
                    </div>

                    <div className="flex justify-center">
                       {!(isSubmitting || isAuthLoading) && <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={handleGoogleError}
                            theme="outline"
                            size="large"
                            shape="pill"
                            width="300px"
                        />}
                    </div>

                    <p className="text-center text-sm mt-8">
                        Don't have an account? <Link href="/signup"><a className="font-semibold text-brand-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Sign Up</a></Link>
                    </p>
                </Card>
            </div>
        </div>
    );
};

export default LoginPage;
