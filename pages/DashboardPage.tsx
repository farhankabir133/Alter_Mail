import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { motion } from 'framer-motion';

// Icons
const LogoutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>;
const SettingsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>;
const BarChartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>;
const CreditCardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>;

const ThemeToggle = () => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        setIsDark(document.documentElement.classList.contains('dark'));
    }, []);

    const toggleTheme = () => {
        document.documentElement.classList.toggle('dark');
        setIsDark(!isDark);
    };

    return (
        <div 
            onClick={toggleTheme}
            className={`w-14 h-8 rounded-full p-1 flex items-center cursor-pointer transition-colors ${isDark ? 'bg-brand-500' : 'bg-slate-300'}`}
        >
            <motion.div 
                layout 
                transition={{ type: 'spring', stiffness: 700, damping: 30 }}
                className="w-6 h-6 rounded-full bg-white shadow-md"
            />
        </div>
    )
}

const DashboardPage: React.FC = () => {
    const [, setLocation] = useLocation();

    const handleLogout = () => {
        // In a real app, this would clear tokens, invalidate sessions, etc.
        console.log("Logging out...");
        setLocation('/');
    };
    
    // Mock user data
    const user = {
        name: 'Alex Doe',
        email: 'alex.doe@example.com',
        avatarUrl: 'https://i.pravatar.cc/150?u=alexdoe'
    };

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            {/* Dashboard Header */}
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10">
                <div className="flex items-center space-x-4">
                    <img src={user.avatarUrl} alt="User Avatar" className="w-16 h-16 rounded-full border-2 border-brand-500 shadow-md" />
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Welcome, {user.name}!</h1>
                        <p className="text-slate-500 dark:text-slate-400">{user.email}</p>
                    </div>
                </div>
                <Button variant="secondary" className="mt-4 sm:mt-0" onClick={handleLogout}>
                    <LogoutIcon />
                    <span className="ml-2">Logout</span>
                </Button>
            </header>

            {/* Dashboard Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Column */}
                <div className="lg:col-span-2 space-y-8">
                    <Card>
                        <div className="flex items-center space-x-3 mb-4">
                            <BarChartIcon />
                            <h2 className="text-xl font-semibold">Usage Statistics</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="p-4 bg-slate-100 dark:bg-slate-800/50 rounded-lg">
                                <p className="text-sm text-slate-500 dark:text-slate-400">Mailboxes Created</p>
                                <p className="text-3xl font-bold">2</p>
                            </div>
                             <div className="p-4 bg-slate-100 dark:bg-slate-800/50 rounded-lg">
                                <p className="text-sm text-slate-500 dark:text-slate-400">Emails Received (24h)</p>
                                <p className="text-3xl font-bold">14</p>
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <h2 className="text-xl font-semibold mb-4">Your Mailboxes</h2>
                        {/* Mock Data */}
                         <div className="space-y-4">
                            <div className="p-4 rounded-lg bg-slate-100 dark:bg-slate-800/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                                <div>
                                    <p className="font-mono font-semibold">my-work-alias@altmail.pro</p>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Expires in 23 hours</p>
                                </div>
                                <span className="px-3 py-1 text-xs font-semibold text-green-800 bg-green-200 dark:bg-green-900/50 dark:text-green-300 rounded-full">Active</span>
                            </div>
                            <div className="p-4 rounded-lg bg-slate-100 dark:bg-slate-800/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                                <div>
                                    <p className="font-mono font-semibold">project-xyz@altmail.pro</p>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Expired yesterday</p>
                                </div>
                                <span className="px-3 py-1 text-xs font-semibold text-red-800 bg-red-200 dark:bg-red-900/50 dark:text-red-300 rounded-full">Expired</span>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Sidebar Column */}
                <div className="space-y-8">
                    <Card>
                        <div className="flex items-center space-x-3 mb-4">
                           <CreditCardIcon />
                           <h2 className="text-xl font-semibold">Subscription</h2>
                        </div>
                        <div className="space-y-3">
                            <p>Your current plan: <span className="font-bold text-brand-500">Pro Member</span></p>
                            <Button variant="primary" className="w-full">Manage Subscription</Button>
                        </div>
                    </Card>

                    <Card>
                       <div className="flex items-center space-x-3 mb-4">
                           <SettingsIcon />
                           <h2 className="text-xl font-semibold">Settings</h2>
                        </div>
                         <div className="flex items-center justify-between">
                            <span className="font-medium">Dark Mode</span>
                            <ThemeToggle />
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
