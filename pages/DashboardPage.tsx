import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { motion } from 'framer-motion';

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
    // This is a protected route.
    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
                <Button variant="primary" className="mt-4 md:mt-0">New Mailbox</Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <Card>
                        <h2 className="text-xl font-semibold mb-4">Your Mailboxes</h2>
                        <div className="space-y-4">
                            {/* Mock Data */}
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
                    <Card>
                      <h2 className="text-xl font-semibold mb-4">Upgrade History</h2>
                      <p className="text-slate-500 dark:text-slate-400">No recent upgrades found.</p>
                    </Card>
                </div>
                <div className="space-y-8">
                    <Card>
                        <h2 className="text-xl font-semibold mb-4">Account</h2>
                        <div className="space-y-2 text-sm">
                          <p><span className="font-semibold">User:</span> Test User</p>
                          <p><span className="font-semibold">Email:</span> test@user.com</p>
                          <p><span className="font-semibold">Plan:</span> Pro Member</p>
                        </div>
                    </Card>
                    <Card>
                        <h2 className="text-xl font-semibold mb-4">Settings</h2>
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