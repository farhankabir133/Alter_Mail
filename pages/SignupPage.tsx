import React, { useState } from 'react';
import { useLocation, Link } from 'wouter';
import { useMutation } from '@tanstack/react-query';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Logo } from '../components/ui/Logo';

// Mock API call
const signupUser = async (details: {email: string, password: string}) => {
    console.log('Signing up with:', details);
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (details.email.includes('@')) {
        return { message: 'User created successfully' };
    }
    throw new Error('Invalid email');
};

const mockGoogleSignup = async () => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return { token: 'fake-google-jwt-token', user: { name: 'New Google User' } };
};

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.519-3.487-11.187-8.264l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C39.999,35.986,44,30.613,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
  </svg>
);

const SignupPage: React.FC = () => {
    const [, setLocation] = useLocation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isGoogleLoading, setGoogleLoading] = useState(false);
    
    const mutation = useMutation({
        mutationFn: signupUser,
        onSuccess: () => {
            // Redirect to login after successful signup
            setLocation('/login');
        }
    });

    const handleGoogleSignUp = async () => {
        setGoogleLoading(true);
        try {
            await mockGoogleSignup();
            setLocation('/dashboard'); // Go straight to dashboard on successful Google signup
        } catch (error) {
            console.error("Google sign-up failed", error);
        } finally {
            setGoogleLoading(false);
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
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
                    <h2 className="text-2xl font-bold text-center mb-1 text-slate-800 dark:text-slate-100">Create your Account</h2>
                    <p className="text-center text-slate-500 dark:text-slate-400 mb-6">Get started with your own permanent mailboxes.</p>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                         <div>
                            <label className="text-sm font-medium">Email Address</label>
                            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full mt-1 p-3 border rounded-lg bg-slate-50 dark:bg-slate-800/50 border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition" />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Password</label>
                            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full mt-1 p-3 border rounded-lg bg-slate-50 dark:bg-slate-800/50 border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition" />
                        </div>
                        {mutation.isSuccess && <p className="text-green-500 text-sm text-center">Account created! Redirecting to login...</p>}
                        {mutation.isError && <p className="text-red-500 text-sm text-center">Error: {mutation.error.message}</p>}
                        <Button type="submit" className="w-full !py-3" isLoading={mutation.isPending}>
                            Create Account
                        </Button>
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
                      <Button variant="secondary" className="w-full !py-3" onClick={handleGoogleSignUp} isLoading={isGoogleLoading}>
                          <GoogleIcon />
                          <span className="ml-3">Sign up with Google</span>
                      </Button>
                    </div>

                    <p className="text-center text-sm mt-8">
                        Already have an account? <Link href="/login"><a className="font-semibold text-brand-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Login</a></Link>
                    </p>
                </Card>
            </div>
        </div>
    );
};

export default SignupPage;