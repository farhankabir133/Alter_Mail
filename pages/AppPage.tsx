import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { io } from "socket.io-client";
import { motion, AnimatePresence } from 'framer-motion';

import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { EmailMessage, Mailbox } from '../types';

const API_BASE = (import.meta as any)?.env?.VITE_API_BASE || 'http://localhost:8080';

// --- API Functions ---
const createNewEmail = async (): Promise<Mailbox> => {
    await new Promise(res => setTimeout(res, 1500)); // Simulate delay
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();
    return Promise.resolve({
        id: 'mock_id_' + Math.random().toString(36).substr(2, 9),
        address: `${Math.random().toString(36).substr(2, 10)}@altmail.dev`,
        expiresAt,
    });
};

const extendEmail = async (id: string): Promise<{ expiresAt: string }> => {
    await new Promise(res => setTimeout(res, 500));
    const newExpiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();
    return Promise.resolve({ expiresAt: newExpiresAt });
};


// --- Helper Components ---
const CopyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>;
const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;
const RefreshIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>;
const ExtendIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14m-7-7h14"/></svg>;


const EmailDisplay: React.FC<{ email: string }> = ({ email }) => {
    const [copied, setCopied] = useState(false);
    const copyToClipboard = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-slate-100 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <span className="font-mono text-lg md:text-2xl text-slate-800 dark:text-slate-100 break-all">{email}</span>
            <Button variant="ghost" onClick={copyToClipboard} aria-label="Copy email address" className="flex-shrink-0">
                <AnimatePresence mode="wait">
                    {copied ? (
                        <motion.span key="check" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} className="flex items-center text-green-500">
                           <CheckIcon /> <span className="ml-2">Copied!</span>
                        </motion.span>
                    ) : (
                        <motion.span key="copy" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} className="flex items-center">
                           <CopyIcon /> <span className="ml-2">Copy</span>
                        </motion.span>
                    )}
                </AnimatePresence>
            </Button>
        </div>
    );
};

const Timer: React.FC<{ expiresAt: string, onExtend: () => void, isExtending: boolean, onNew: () => void, isCreating: boolean }> = ({ expiresAt, onExtend, isExtending, onNew, isCreating }) => {
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

    useEffect(() => {
        const calculateTimeLeft = () => {
            const diff = new Date(expiresAt).getTime() - new Date().getTime();
            return Math.max(0, Math.floor(diff / 1000));
        };
        setTimeLeft(calculateTimeLeft());
        const interval = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
        return () => clearInterval(interval);
    }, [expiresAt]);

    const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const seconds = (timeLeft % 60).toString().padStart(2, '0');
    const progress = (timeLeft / 600) * 100;

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
            <div className="flex items-center gap-4">
                 <div className="relative h-20 w-20">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle className="text-slate-200 dark:text-slate-700" strokeWidth="8" stroke="currentColor" fill="transparent" r="45" cx="50" cy="50" />
                        <motion.circle
                            className="text-brand-500"
                            strokeWidth="8" stroke="currentColor" fill="transparent" r="45" cx="50" cy="50"
                            strokeDasharray="282.6"
                            strokeDashoffset={282.6 - (progress / 100) * 282.6}
                            strokeLinecap="round"
                            transform="rotate(-90 50 50)"
                            initial={{ strokeDashoffset: 282.6 }}
                            animate={{ strokeDashoffset: 282.6 - (progress / 100) * 282.6 }}
                            transition={{ duration: 1, ease: 'linear' }}
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-mono text-xl font-bold">{`${minutes}:${seconds}`}</span>
                    </div>
                </div>
                <div>
                  <p className="font-semibold">Time Remaining</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Your address will expire soon.</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="secondary" onClick={onNew} isLoading={isCreating}>
                    <RefreshIcon /> New
                </Button>
                <Button variant="primary" onClick={onExtend} isLoading={isExtending}>
                    <ExtendIcon /> Extend
                </Button>
            </div>
        </div>
    );
};


const MessageView: React.FC<{ message: EmailMessage, onClose: () => void }> = ({ message, onClose }) => {
    return (
        <motion.div 
            initial={{x: '100%'}} 
            animate={{x: 0}} 
            exit={{x: '100%'}} 
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute inset-0 bg-white dark:bg-slate-900 p-4 sm:p-6 flex flex-col"
        >
            <div className="flex-shrink-0 pb-4 border-b border-slate-200 dark:border-slate-700">
                <Button variant="ghost" size="sm" onClick={onClose} className="mb-4 -ml-4">&larr; Back to Inbox</Button>
                <h2 className="text-2xl font-bold">{message.subject}</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">From: {message.from}</p>
            </div>
            <div className="flex-grow mt-4 overflow-y-auto prose dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: message.body }} />
            </div>
        </motion.div>
    );
};


const Inbox: React.FC<{ messages: EmailMessage[], isLoading: boolean }> = ({ messages, isLoading }) => {
    const [selectedMessage, setSelectedMessage] = useState<EmailMessage | null>(null);

    const getInitials = (from: string) => from.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase() || 'S';

    return (
        <Card className="mt-8 relative min-h-[400px] overflow-hidden p-0">
             <AnimatePresence>
                {selectedMessage ? (
                    <MessageView message={selectedMessage} onClose={() => setSelectedMessage(null)} />
                ) : (
                    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="p-6 sm:p-8">
                        <h2 className="text-2xl font-bold mb-4">Inbox</h2>
                        {isLoading && <p className="text-slate-500">Waiting for incoming emails...</p>}
                        {!isLoading && messages.length === 0 && (
                            <div className="text-center py-16">
                                <IconMail className="mx-auto text-slate-300 dark:text-slate-600" />
                                <p className="mt-4 font-semibold text-slate-600 dark:text-slate-400">Your inbox is empty</p>
                                <p className="text-sm text-slate-400">New emails will appear here automatically.</p>
                            </div>
                        )}
                        <ul className="space-y-3">
                            {messages.map(msg => (
                                <motion.li 
                                    key={msg.id}
                                    layout
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -30 }}
                                    onClick={() => setSelectedMessage(msg)}
                                    className="p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/50 cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-colors flex items-center space-x-4"
                                >
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-indigo-200 to-sky-200 dark:from-indigo-800 dark:to-sky-800 flex items-center justify-center font-bold text-indigo-700 dark:text-sky-200">
                                      {getInitials(msg.from)}
                                    </div>
                                    <div className="overflow-hidden">
                                      <p className="font-semibold truncate">{msg.subject}</p>
                                      <p className="text-sm text-slate-500 dark:text-slate-400 truncate">From: {msg.from}</p>
                                    </div>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </Card>
    );
};

const SkeletonLoader = () => (
  <div className="animate-pulse">
    <Card>
      <div className="flex items-center justify-between p-4 bg-slate-100 dark:bg-slate-800/50 rounded-lg h-[68px]">
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
        <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded w-24"></div>
      </div>
      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center gap-4">
          <div className="h-20 w-20 rounded-full bg-slate-200 dark:bg-slate-700"></div>
          <div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-32 mb-2"></div>
            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-48"></div>
          </div>
        </div>
        <div className="flex gap-2">
           <div className="h-10 w-24 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
           <div className="h-10 w-24 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
        </div>
      </div>
    </Card>
    <Card className="mt-8 min-h-[400px] p-8">
      <div className="h-6 w-32 bg-slate-200 dark:bg-slate-700 rounded mb-6"></div>
      <div className="h-16 w-full bg-slate-100 dark:bg-slate-800/50 rounded-lg mb-3"></div>
      <div className="h-16 w-full bg-slate-100 dark:bg-slate-800/50 rounded-lg mb-3"></div>
      <div className="h-16 w-full bg-slate-100 dark:bg-slate-800/50 rounded-lg"></div>
    </Card>
  </div>
);

const IconMail = ({className = ''}) => <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;


// --- Main Page Component ---
const AppPage: React.FC = () => {
  const [mailbox, setMailbox] = useState<Mailbox | null>(null);
  const [messages, setMessages] = useState<EmailMessage[]>([]);

  const newEmailMutation = useMutation<Mailbox, Error>({
    mutationFn: createNewEmail,
    onSuccess: (data) => {
      setMailbox(data);
      setMessages([]);
    },
  });

  const extendEmailMutation = useMutation<{ expiresAt: string }, Error, string>({
    mutationFn: extendEmail,
    onSuccess: (data) => {
        if(mailbox) {
            setMailbox({ ...mailbox, expiresAt: data.expiresAt });
        }
    },
  });

  useEffect(() => {
    if (!mailbox) {
      newEmailMutation.mutate();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!mailbox) return;
    const mockSocket = {
        on: (event: string, callback: (data: EmailMessage) => void) => {
            if (event === 'message:new') {
                const interval = setInterval(() => {
                    const newMessage: EmailMessage = {
                        id: `msg_${Math.random()}`,
                        from: `Notification Service <notify@example.com>`,
                        subject: `Your account update ${new Date().toLocaleTimeString()}`,
                        body: `<p>This is a <strong>test email</strong> received at ${new Date()}.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.</p>`,
                        receivedAt: new Date().toISOString(),
                    };
                    callback(newMessage);
                }, 15000);
                return () => clearInterval(interval);
            }
        },
    };
    
    const cleanup = mockSocket.on('message:new', (newMessage: EmailMessage) => {
        setMessages(prev => [newMessage, ...prev]);
    });

    return () => { if (typeof cleanup === 'function') { cleanup(); } };
  }, [mailbox]);


  const handleExtend = () => {
      if(mailbox?.id) {
          extendEmailMutation.mutate(mailbox.id);
      }
  };
  
  const handleNew = () => {
    newEmailMutation.mutate();
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {newEmailMutation.isPending && <SkeletonLoader />}
      {newEmailMutation.isError && <p className="text-red-500 text-center">Error: {newEmailMutation.error.message}</p>}
      
      <AnimatePresence>
      {mailbox && !newEmailMutation.isPending && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <Card>
            <EmailDisplay email={mailbox.address} />
            <Timer 
                expiresAt={mailbox.expiresAt} 
                onExtend={handleExtend}
                isExtending={extendEmailMutation.isPending}
                onNew={handleNew}
                isCreating={newEmailMutation.isPending}
            />
          </Card>

          <Inbox messages={messages} isLoading={!messages.length && !newEmailMutation.isSuccess} />
          
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
};

export default AppPage;