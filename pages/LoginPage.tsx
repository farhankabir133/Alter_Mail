import React, { useState } from 'react';
import { useLocation, Link } from 'wouter';
import { useMutation } from '@tanstack/react-query';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Logo } from '../components/ui/Logo';
import { InputField } from '../components/ui/InputField';

// Mock API call
const loginUser = async (credentials: {email: string, password: string}) => {
    console.log('Logging in with:', credentials);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (credentials.email === "test@user.com" && credentials.password === "password") {
        return { token: 'fake-jwt-token', user: { name: 'Test User' } };
    }
    throw new Error('Invalid credentials');
};

const mockGoogleLogin = async () => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return { token: 'fake-google-jwt-token', user: { name: 'Google User' } };
};

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.519-3.487-11.187-8.264l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C39.999,35.986,44,30.613,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
  </svg>
);


const LoginPage: React.FC = () => {
    const [, setLocation] = useLocation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [isGoogleLoading, setGoogleLoading] = useState(false);

    const mutation = useMutation({
        mutationFn: loginUser,
        onSuccess: () => {
            setLocation('/dashboard');
        }
    });

    const handleGoogleSignIn = async () => {
        setGoogleLoading(true);
        try {
            await mockGoogleLogin();
            setLocation('/dashboard');
        } catch (error) {
            console.error("Google sign-in failed", error);
        } finally {
            setGoogleLoading(false);
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setEmailError('');
        if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError('Please enter a valid email address.');
            return;
        }
        mutation.mutate({ email, password });
    };

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
                            error={emailError}
                            required
                        />
                         <InputField
                            label="Password"
                            type="password"
                            name="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                        
                        <div className="flex items-center justify-end text-sm">
                          <Link href="/forgot-password">
                            <a className="font-semibold text-brand-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                              Forgot your password?
                            </a>
                          </Link>
                        </div>

                        {mutation.isError && <p className="text-red-500 text-sm text-center">Error: {mutation.error.message}</p>}
                        
                        <div className="pt-2">
                            <Button type="submit" className="w-full !py-3" isLoading={mutation.isPending}>
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

                    <div>
                      <Button variant="secondary" className="w-full !py-3" onClick={handleGoogleSignIn} isLoading={isGoogleLoading}>
                          <GoogleIcon />
                          <span className="ml-3">Continue with Google</span>
                      </Button>
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