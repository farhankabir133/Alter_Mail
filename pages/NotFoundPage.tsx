import React from 'react';
import { Link } from 'wouter';
import { Button } from '../components/ui/Button';

const NotFoundPage: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
            <div className="max-w-md">
                <svg viewBox="0 0 904 459" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                    <path d="M229.5 2C103.5 12.5 -55.5 168 108.5 458" stroke="#E0F2FE" strokeWidth="4"/>
                    <path d="M853 457.5C923.5 352 979 176 777.5 2.5" stroke="#E0F2FE" strokeWidth="4"/>
                    <text fill="currentColor" className="text-slate-300 dark:text-slate-700" style={{fontSize: '250px', fontWeight: 800}}>
                        <tspan x="0" y="270">404</tspan>
                    </text>
                    <text fill="currentColor" className="text-slate-800 dark:text-slate-200" style={{fontSize: '250px', fontWeight: 800}} >
                         <tspan x="2.5" y="267.5">404</tspan>
                    </text>
                </svg>

                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-slate-100 mt-8">
                    Oops! Page Not Found.
                </h1>
                <p className="text-slate-600 dark:text-slate-300 mt-4 mb-8">
                    Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or doesn't exist.
                </p>
                <Link href="/">
                    <Button size="lg">
                        Go Back Home
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;