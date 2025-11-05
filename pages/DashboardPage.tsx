import React, { useState, useEffect } from 'react';
import { Redirect } from 'wouter';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import * as api from '../api';
import { Mailbox } from '../types';


// Icons
// FIX: Updated icon components to accept React.SVGProps<SVGSVGElement> to make them more robust and fix a potential type inference issue.
const LogoutIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>;
const SettingsIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06-.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>;
const BarChartIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>;
const CreditCardIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>;
const MailboxIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 17H2a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2z"></path><polyline points="22,7 12,13 2,7"></polyline></svg>;

const ThemeToggle = () => {
    const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));
    
    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsDark(document.documentElement.classList.contains('dark'));
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);

    const toggleTheme = () => {
        document.documentElement.classList.toggle('dark');
    };
    
    return (
        <button onClick={toggleTheme} className={`w-14 h-8 rounded-full p-1 flex items-center transition-colors ${isDark ? 'bg-brand-500' : 'bg-slate-300'}`}>
            <motion.div layout transition={{ type: 'spring', stiffness: 700, damping: 30 }} className="w-6 h-6 rounded-full bg-white shadow-md" />
        </button>
    );
}

const DashboardPage: React.FC = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const token = localStorage.getItem('altmail-token');
    
    const { data: stats, isLoading: isLoadingStats } = useQuery({
        queryKey: ['dashboardStats', token],
        queryFn: () => api.getDashboardStats(token!),
        enabled: !!token && isAuthenticated,
    });

    const { data: mailboxes, isLoading: isLoadingMailboxes } = useQuery<Mailbox[], Error>({
        queryKey: ['userMailboxes', token],
        queryFn: () => api.getUserMailboxes(token!),
        enabled: !!token && isAuthenticated,
    });
    
    // ProtectedRoute handles the loading and auth check, but this is a safeguard.
    if (!isAuthenticated) {
      return <Redirect to="/login" />;
    }
    
    if (!user) {
      return null;
    }

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            {/* Dashboard Header */}
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10">
                <div className="flex items-center space-x-4">
                    <img src={user.picture || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} alt="User Avatar" className="w-16 h-16 rounded-full border-2 border-brand-500 shadow-md" />
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Welcome, {user.name}!</h1>
                        <p className="text-slate-500 dark:text-slate-400">{user.email}</p>
                    </div>
                </div>
                <Button variant="secondary" className="mt-4 sm:mt-0" onClick={logout}>
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
                        {isLoadingStats ? (
                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-pulse">
                                <div className="p-4 bg-slate-100 dark:bg-slate-800/50 rounded-lg h-24"><div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-700 rounded mb-3"></div><div className="h-8 w-1/4 bg-slate-200 dark:bg-slate-700 rounded"></div></div>
                                <div className="p-4 bg-slate-100 dark:bg-slate-800/50 rounded-lg h-24"><div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-700 rounded mb-3"></div><div className="h-8 w-1/4 bg-slate-200 dark:bg-slate-700 rounded"></div></div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="p-4 bg-slate-100 dark:bg-slate-800/50 rounded-lg">
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Mailboxes Created</p>
                                    <p className="text-3xl font-bold">{stats?.mailboxesCreated ?? 0}</p>
                                </div>
                                <div className="p-4 bg-slate-100 dark:bg-slate-800/50 rounded-lg">
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Emails Received (24h)</p>
                                    <p className="text-3xl font-bold">{stats?.emailsReceived24h ?? 0}</p>
                                </div>
                            </div>
                        )}
                    </Card>

                    <Card>
                        <h2 className="text-xl font-semibold mb-4">Your Mailboxes</h2>
                        {isLoadingMailboxes ? (
                            <div className="space-y-4 animate-pulse">
                                <div className="p-4 rounded-lg bg-slate-100 dark:bg-slate-800/50 h-14"></div>
                                <div className="p-4 rounded-lg bg-slate-100 dark:bg-slate-800/50 h-14"></div>
                                <div className="p-4 rounded-lg bg-slate-100 dark:bg-slate-800/50 h-14"></div>
                            </div>
                        ) : (
                            <ul className="space-y-3">
                                {mailboxes?.map(mailbox => (
                                    <li key={mailbox.id} className="p-3 flex items-center justify-between bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <MailboxIcon className="text-brand-500" />
                                            <span className="font-mono text-slate-700 dark:text-slate-200">{mailbox.address}</span>
                                        </div>
                                        <Button size="sm" variant="ghost">Manage</Button>
                                    </li>
                                ))}
                                {mailboxes?.length === 0 && (
                                    <p className="text-center py-8 text-slate-500 dark:text-slate-400">You haven't created any mailboxes yet.</p>
                                )}
                            </ul>
                        )}
                    </Card>
                </div>

                {/* Sidebar Column */}
                <div className="lg:col-span-1 space-y-8">
                    <Card>
                        <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
                        <ul className="space-y-4">
                            <li className="flex justify-between items-center"><span className="font-medium">Dark Mode</span> <ThemeToggle /></li>
                            <li className="flex justify-between items-center"><span className="font-medium">Profile</span> <Button size="sm" variant="ghost">Edit</Button></li>
                            <li className="flex justify-between items-center"><span className="font-medium">Password</span> <Button size="sm" variant="ghost">Change</Button></li>
                        </ul>
                    </Card>

                    <Card>
                        <div className="flex items-center space-x-3 mb-2">
                            <CreditCardIcon />
                            <h2 className="text-xl font-semibold">Subscription</h2>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 mb-4">You are on the <span className="font-bold text-brand-500">Pro Plan</span>.</p>
                        <Button className="w-full">Manage Subscription</Button>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;