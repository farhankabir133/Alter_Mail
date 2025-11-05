
import React, { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';

import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { EmailMessage, Mailbox } from '../types';

const API_BASE = 'https://api.mail.tm';

// --- API Functions ---

// Gets the first available domain from the mail service
const getFirstDomain = async (): Promise<any> => {
    const response = await fetch(`${API_BASE}/domains`);
    if (!response.ok) throw new Error('Failed to fetch domains.');
    const data = await response.json();
    if (!data['hydra:member'] || data['hydra:member'].length === 0) {
        throw new Error('No domains available.');
    }
    return data['hydra:member'][0];
};

// Creates an account on the mail service
const createAccount = async (address: string, password: string): Promise<{ id: string }> => {
    const response = await fetch(`${API_BASE}/accounts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address, password }),
    });
    if (response.status === 422) { // Address might be taken, retry
        const error = await response.json();
        throw new Error(error.detail || 'Address already used.');
    }
    if (!response.ok) throw new Error('Failed to create account.');
    return response.json();
};

// Gets an authentication token for the created account
const getToken = async (address: string, password: string): Promise<string> => {
    const response = await fetch(`${API_BASE}/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address, password }),
    });
    if (!response.ok) throw new Error('Failed to get auth token.');
    const data = await response.json();
    return data.token;
};

// Combined function to create a new, fully authenticated mailbox
const createNewMailbox = async (): Promise<Mailbox> => {
    const domain = await getFirstDomain();
    const username = Math.random().toString(36).substring(2, 12);
    const address = `${username}@${domain.domain}`;
    const password = Math.random().toString(36).substring(2, 12);

    const account = await createAccount(address, password);
    const token = await getToken(address, password);

    return { id: account.id, address, password, token };
};


// --- Helper Components ---
const CopyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>;
const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;
const RefreshIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>;
const SearchIcon = ({className = ''}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
const ChevronDownIcon = ({className = ''}) => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="6 9 12 15 18 9"></polyline></svg>;
const CloseIcon = ({className = ''}) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>;

const TimerDisplay: React.FC<{ seconds: number }> = ({ seconds }) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const displayMinutes = Math.max(0, minutes);
    const displaySeconds = Math.max(0, remainingSeconds);

    const timeFormatted = `${displayMinutes.toString().padStart(2, '0')}:${displaySeconds.toString().padStart(2, '0')}`;
    const isLowTime = seconds > 0 && seconds <= 60;
    const isExpired = seconds <= 0;

    const textColor = isExpired ? 'text-slate-500' : isLowTime ? 'text-red-500' : 'text-slate-800 dark:text-slate-200';
    const ringColor = isExpired ? 'stroke-slate-400' : isLowTime ? 'stroke-red-500' : 'stroke-brand-500';
    
    const progress = Math.max(0, (seconds / 600) * 100);

    return (
        <div className="flex flex-col items-center justify-center space-y-2">
            <div className="relative w-28 h-28">
                <svg className="w-full h-full" viewBox="0 0 36 36" transform="rotate(-90)">
                    <path
                        className="stroke-slate-200 dark:stroke-slate-700"
                        strokeWidth="2"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                        className={`${ringColor} transition-all duration-500`}
                        strokeWidth="2"
                        strokeDasharray={`${progress}, 100`}
                        strokeLinecap="round"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`text-3xl font-mono font-bold ${textColor}`}>
                        {timeFormatted}
                    </span>
                </div>
            </div>
             <p className={`text-sm font-semibold ${textColor}`}>
                {isExpired ? 'Mailbox Expired' : 'Time Remaining'}
            </p>
        </div>
    );
};

const EmailDisplay: React.FC<{ email: string, onNew: () => void, isCreating: boolean, onRefresh: () => void, isRefreshing: boolean, countdown: number }> = ({ email, onNew, isCreating, onRefresh, isRefreshing, countdown }) => {
    const [copied, setCopied] = useState(false);
    const copyToClipboard = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex-grow w-full">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-slate-100 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                    <span className="font-mono text-lg md:text-xl text-slate-800 dark:text-slate-100 break-all">{email}</span>
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
                <div className="flex items-center gap-2 mt-4">
                    <Button variant="secondary" onClick={onNew} isLoading={isCreating} className="w-full">
                        <RefreshIcon /> New Address
                    </Button>
                    <Button variant="primary" onClick={onRefresh} isLoading={isRefreshing} className="w-full">
                        <RefreshIcon /> Refresh Inbox
                    </Button>
                </div>
            </div>
            
            <div className="flex-shrink-0">
                <TimerDisplay seconds={countdown} />
            </div>
        </div>
    );
};

const Inbox: React.FC<{ 
    messages: EmailMessage[], 
    isLoading: boolean,
    searchQuery: string,
    onSearchChange: (query: string) => void,
    onMessageClick: (messageId: string) => void,
    expandedMessageId: string | null
}> = ({ messages = [], isLoading, searchQuery, onSearchChange, onMessageClick, expandedMessageId }) => {

    const getInitials = (name: string) => name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase() || 'S';

    const filteredMessages = messages.filter(msg => {
        const fromText = `${msg.from?.name || ''} ${msg.from?.address || ''}`.toLowerCase();
        const subjectText = msg.subject.toLowerCase();
        const searchText = searchQuery.toLowerCase();
        return fromText.includes(searchText) || subjectText.includes(searchText);
    });

    return (
        <Card className="mt-8 min-h-[400px] p-0">
             <div className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                    <h2 className="text-2xl font-bold">Inbox</h2>
                    <div className="relative w-full sm:max-w-xs">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <SearchIcon className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by sender or subject..."
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="w-full pl-10 pr-10 py-2 rounded-lg bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition"
                        />
                        {searchQuery && (
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <button
                                    onClick={() => onSearchChange('')}
                                    className="p-1 rounded-full text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400"
                                    aria-label="Clear search"
                                >
                                    <CloseIcon className="h-4 w-4" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {isLoading && <p className="text-slate-500">Waiting for incoming emails...</p>}
                
                {!isLoading && messages.length === 0 && (
                    <div className="text-center py-16">
                        <IconMail className="mx-auto text-slate-300 dark:text-slate-600" />
                        <p className="mt-4 font-semibold text-slate-600 dark:text-slate-400">Your inbox is empty</p>
                        <p className="text-sm text-slate-400">New emails will appear here automatically.</p>
                    </div>
                )}
                
                {!isLoading && filteredMessages.length === 0 && messages.length > 0 && (
                     <div className="text-center py-16">
                        <p className="mt-4 font-semibold text-slate-600 dark:text-slate-400">No messages found</p>
                        <p className="text-sm text-slate-400">Your search for "{searchQuery}" did not return any results.</p>
                    </div>
                )}

                <ul className="space-y-2">
                    <AnimatePresence>
                        {filteredMessages.map(msg => {
                            const senderName = msg.from?.name || msg.from?.address || 'Unknown Sender';
                            const senderAddress = msg.from?.address || 'no-reply@unknown.com';
                            const isRead = msg.seen;
                            const isExpanded = expandedMessageId === msg.id;
                            
                            return (
                            <motion.li 
                                key={msg.id}
                                layout="position"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 overflow-hidden"
                            >
                                <div 
                                    onClick={() => onMessageClick(msg.id)}
                                    className="p-3 cursor-pointer flex items-center space-x-4"
                                >
                                    <div className="relative flex-shrink-0">
                                        {!isRead && (
                                            <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-brand-500 rounded-full" aria-label="Unread message"></div>
                                        )}
                                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br from-indigo-200 to-sky-200 dark:from-indigo-800 dark:to-sky-800 flex items-center justify-center font-bold text-indigo-700 dark:text-sky-200 ${isRead ? 'opacity-60' : ''}`}>
                                          {getInitials(senderName)}
                                        </div>
                                    </div>
                                    <div className={`overflow-hidden flex-grow ${isRead ? 'opacity-70' : ''}`}>
                                      <p className={`truncate ${isRead ? 'font-medium text-slate-600 dark:text-slate-300' : 'font-bold text-slate-800 dark:text-slate-100'}`}>{msg.subject}</p>
                                      <p className="text-sm text-slate-500 dark:text-slate-400 truncate" title={senderAddress}>From: {senderName}</p>
                                    </div>
                                    <motion.div
                                        animate={{ rotate: isExpanded ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <ChevronDownIcon className="text-slate-400" />
                                    </motion.div>
                                </div>
                                <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        key="content"
                                        initial="collapsed"
                                        animate="open"
                                        exit="collapsed"
                                        variants={{
                                            open: { opacity: 1, height: 'auto' },
                                            collapsed: { opacity: 0, height: 0 }
                                        }}
                                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-4 pb-4 pt-2 border-t border-slate-200 dark:border-slate-700/60">
                                            {msg.htmlBody ? (
                                                <div className="prose dark:prose-invert prose-sm max-w-none text-slate-600 dark:text-slate-300" dangerouslySetInnerHTML={{ __html: msg.htmlBody }} />
                                            ) : (
                                                <p className="text-slate-500 py-4 text-center">Loading full message...</p>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                                </AnimatePresence>
                            </motion.li>
                            )
                        })}
                    </AnimatePresence>
                </ul>
            </div>
        </Card>
    );
};

const SkeletonLoader = () => (
  <div className="animate-pulse">
    <Card>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex-grow w-full">
            <div className="flex items-center justify-between p-4 bg-slate-100 dark:bg-slate-800/50 rounded-lg h-[68px]">
                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded w-24"></div>
            </div>
            <div className="flex gap-2 mt-4">
                <div className="h-10 w-full bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                <div className="h-10 w-full bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
            </div>
        </div>
        <div className="w-28 h-28 rounded-full bg-slate-200 dark:bg-slate-700"></div>
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
  const queryClient = useQueryClient();
  const [mailbox, setMailbox] = useState<Mailbox | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedMessageId, setExpandedMessageId] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(600);

  const newEmailMutation = useMutation<Mailbox, Error>({
    mutationFn: createNewMailbox,
    onSuccess: (data) => {
      setMailbox(data);
      setSearchQuery('');
      setExpandedMessageId(null);
      queryClient.setQueryData(['messages', data.id], []); // Clear previous messages
      setCountdown(600); // Reset timer
    },
  });

  const { data: messages, isLoading: isMessagesLoading, refetch, isRefetching } = useQuery<EmailMessage[], Error>({
      queryKey: ['messages', mailbox?.id],
      queryFn: async () => {
          if (!mailbox?.token) return [];
          const response = await fetch(`${API_BASE}/messages`, {
              headers: { 'Authorization': `Bearer ${mailbox.token}` }
          });
          if (!response.ok) throw new Error('Failed to fetch messages');
          const data = await response.json();
          // Map the API response to our EmailMessage type
          return data['hydra:member'].map((msg: any) => ({
              id: msg.id,
              from: msg.from,
              subject: msg.subject,
              intro: msg.intro,
              seen: msg.seen,
              createdAt: msg.createdAt,
              // Keep existing htmlBody if already fetched
              htmlBody: (queryClient.getQueryData(['messages', mailbox?.id]) as EmailMessage[] || []).find(m => m.id === msg.id)?.htmlBody
          }));
      },
      enabled: !!mailbox?.token,
      refetchInterval: 7000, // Poll every 7 seconds
      refetchOnWindowFocus: true,
  });

  const fetchMessageBodyMutation = useMutation<string, Error, string>({
      mutationFn: async (messageId: string) => {
          if (!mailbox?.token) throw new Error('Not authenticated');
          const response = await fetch(`${API_BASE}/messages/${messageId}`, {
              headers: { 'Authorization': `Bearer ${mailbox.token}` }
          });
          if (!response.ok) throw new Error('Failed to fetch message body');
          const data = await response.json();
          // The API returns HTML in an array of strings
          return data.html?.[0] || data.text?.[0] || '<p>No content found.</p>';
      },
      onSuccess: (data, messageId) => {
          // Update the specific message in the query cache with its full body
          queryClient.setQueryData(['messages', mailbox?.id], (oldData: EmailMessage[] | undefined) => {
              return oldData?.map(msg => msg.id === messageId ? { ...msg, htmlBody: data, seen: true } : msg) || [];
          });
      }
  });


  useEffect(() => {
    if (!mailbox) {
      newEmailMutation.mutate();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!mailbox || countdown <= 0) return;

    const timerId = setInterval(() => {
        setCountdown(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [mailbox, countdown]);

  const handleNew = () => {
    newEmailMutation.mutate();
  }

  const handleMessageClick = (messageId: string) => {
    setExpandedMessageId(prevId => (prevId === messageId ? null : messageId));
    
    // Check if the message body has already been fetched
    const message = messages?.find(m => m.id === messageId);
    if (message && !message.htmlBody) {
        fetchMessageBodyMutation.mutate(messageId);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {newEmailMutation.isPending && <SkeletonLoader />}
      {newEmailMutation.isError && <p className="text-red-500 text-center">Error: {newEmailMutation.error.message}</p>}
      
      <AnimatePresence>
      {mailbox && !newEmailMutation.isPending && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <Card>
            <EmailDisplay 
                email={mailbox.address} 
                onNew={handleNew}
                isCreating={newEmailMutation.isPending}
                onRefresh={() => refetch()}
                isRefreshing={isRefetching}
                countdown={countdown}
            />
          </Card>

          <Inbox 
            messages={messages || []} 
            isLoading={isMessagesLoading}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onMessageClick={handleMessageClick}
            expandedMessageId={expandedMessageId}
          />
          
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
};

export default AppPage;
