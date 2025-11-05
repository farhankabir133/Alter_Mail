import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { InputField } from '../components/ui/InputField';
import { Button } from '../components/ui/Button';
import { EmailMessage } from '../types';
import { Footer } from '../components/layout/Footer';

// --- Icons for Landing Page Demo ---
const IconCheck = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="20 6 9 17 4 12"></polyline></svg>
);
const IconChevronDownLP = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="6 9 12 15 18 9"></polyline></svg>
);

// --- Components from Landing Page for Showcase ---
const HowItWorks = () => {
  const steps = [
    { title: 'Generate Email', description: 'Click a button to instantly create a new, private email address.' },
    { title: 'Use Anywhere', description: 'Copy your new address and use it for any online sign-up or service.' },
    { title: 'Receive Mail', description: 'Emails arrive instantly in your secure, real-time AltMail inbox.' },
  ];
  return (
    <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 md:space-x-8 text-white">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className="text-center max-w-xs">
            <div className="mx-auto w-16 h-16 rounded-full bg-slate-800/50 border-2 border-sky-500/30 flex items-center justify-center text-2xl font-bold text-sky-400 mb-4">
              {index + 1}
            </div>
            <h3 className="text-xl font-bold mb-2">{step.title}</h3>
            <p className="text-slate-400">{step.description}</p>
          </div>
          {index < steps.length - 1 && (
            <div className="hidden md:block w-20 h-1 border-t-2 border-dashed border-slate-700"></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

const TestimonialCard = ({ quote, name, role }: { quote: string, name: string, role: string }) => (
    <div className="relative p-8 overflow-hidden rounded-xl h-full bg-slate-900/50 border border-slate-700/50 backdrop-blur-lg text-white">
        <p className="text-slate-300 italic">"{quote}"</p>
        <div className="mt-6">
            <p className="font-bold">{name}</p>
            <p className="text-sm text-sky-400">{role}</p>
        </div>
    </div>
);

const FaqItem = ({ question, answer }: { question: string, answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-slate-700/50 py-6 text-white">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-left">
                <span className="text-lg font-semibold">{question}</span>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                    <IconChevronDownLP className="w-6 h-6 text-slate-400" />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: '16px' }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        className="text-slate-300"
                    >
                        {answer}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};


// --- Helper Components & Icons ---
const SearchIcon = ({ className = '' }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
const ChevronDownIcon = ({ className = '' }) => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="6 9 12 15 18 9"></polyline></svg>;
const CloseIcon = ({className = ''}) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>;

// --- Mock Data (FIXED to match EmailMessage interface) ---
const mockMessages: EmailMessage[] = [
    { id: '1', from: { name: 'Framer', address: 'updates@framer.com' }, subject: 'Magic Motion is here!', intro: 'Discover the future of web animations...', seen: false, createdAt: new Date().toISOString(), htmlBody: '<p>Discover the future of web animations. With just one click, you can create seamless transitions and delightful interactions. <strong>Try it now!</strong></p>' },
    { id: '2', from: { name: 'Vercel', address: 'noreply@vercel.com' }, subject: 'Your latest deployment was successful', intro: 'Your project altmail-clone has been successfully deployed.', seen: false, createdAt: new Date().toISOString(), htmlBody: '<p>Your project <code>altmail-clone</code> has been successfully deployed. You can view it live at your domain.</p>' },
    { id: '3', from: { name: 'Stripe', address: 'support@stripe.com' }, subject: 'Welcome to Stripe!', intro: 'Thanks for signing up for Stripe...', seen: true, createdAt: new Date().toISOString(), htmlBody: '<p>Thanks for signing up for Stripe. We\'re excited to help you manage your payments. Get started by creating your first product.</p>' },
    { id: '4', from: { name: 'Linear', address: 'notifications@linear.app' }, subject: '[ALT-123] New comment on "Design System Update"', intro: 'Jane Doe mentioned you in a comment...', seen: false, createdAt: new Date().toISOString(), htmlBody: '<p>Jane Doe mentioned you in a comment: <em>"Hey, can you take a look at the new button component specs?"</em></p>' },
];


const ChangelogPage: React.FC = () => {
    // State for Inbox Demo
    const [searchQuery, setSearchQuery] = useState('');
    const [readMessageIds, setReadMessageIds] = useState<Set<string>>(new Set(['3']));
    const [expandedMessageId, setExpandedMessageId] = useState<string | null>(null);

    // State for Form Demo
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');

    // State for Auth Flow Demo
    const [verifyCode, setVerifyCode] = useState('');
    const [forgotEmail, setForgotEmail] = useState('');
    const [resetPassword, setResetPassword] = useState('');
    const [resetConfirm, setResetConfirm] = useState('');
    
    // --- Mock Data for Landing Page Showcase ---
    const testimonials = [
      { quote: "AltMail's API is a lifesaver for testing our app's email notifications. Clean, simple, and reliable.", name: 'Dev Team Lead', role: 'SaaS Startup' },
      { quote: "I use AltMail for all new sign-ups. It's the best way to keep my primary inbox clean and secure.", name: 'Sarah P.', role: 'Privacy Advocate' },
    ];
    const pricingTiers = [
        { name: 'Free', price: '$0', features: ['1 Mailbox', '10-Min Expiration'], cta: 'Get Started' },
        { name: 'Pro', price: '$5', features: ['25 Mailboxes', 'No Expiration', 'API Access'], cta: 'Go Pro' },
        { name: 'Business', price: '$20', features: ['Unlimited Mailboxes', 'Team Management', 'SAML/SSO'], cta: 'Contact Us' },
    ];
    const faqs = [
        { question: 'What happens when my email expires?', answer: 'For free users, the email address and its contents are permanently deleted after 10 minutes. Pro users can keep their addresses indefinitely.' },
        { question: 'Is it truly anonymous?', answer: 'Yes. We do not require any personal information to generate a free temporary email address.' },
    ];


    const handleMessageClick = (messageId: string) => {
        setExpandedMessageId(prevId => (prevId === messageId ? null : messageId));
        setReadMessageIds(prev => new Set(prev).add(messageId));
    };
    
    const getInitials = (name: string) => name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase() || 'S';

    // FIX: Updated filtering logic to search within the 'from' object's 'name' and 'address' properties.
    const filteredMessages = mockMessages.filter(msg => {
        const fromText = `${msg.from?.name || ''} ${msg.from?.address || ''}`.toLowerCase();
        return fromText.includes(searchQuery.toLowerCase()) ||
               msg.subject.toLowerCase().includes(searchQuery.toLowerCase())
    });

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setEmailError('');
        if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError('Please enter a valid email address.');
        } else {
             alert('Form submitted successfully!');
        }
    }

    return (
        <div className="bg-slate-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white"
                >
                    Feature Showcase
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mt-4 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400"
                >
                    A visual tour of the enhancements made to AltMail.
                </motion.p>
            </div>

            <div className="space-y-8">
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    {/* --- Section 1: Enhanced Inbox --- */}
                    <Card className="p-0 overflow-hidden">
                        <div className="p-6">
                            <h2 className="text-2xl font-bold mb-1">Enhanced Inbox UI</h2>
                            <p className="text-slate-500 dark:text-slate-400 mb-4">Featuring search, read/unread states, and an accordion view.</p>

                            <div className="relative w-full mb-4">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <SearchIcon className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search by sender or subject..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-10 py-2 rounded-lg bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition"
                                />
                                {searchQuery && (
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                        <button onClick={() => setSearchQuery('')} className="p-1 rounded-full text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400" aria-label="Clear search">
                                            <CloseIcon className="h-4 w-4" />
                                        </button>
                                    </div>
                                )}
                            </div>

                            <ul className="space-y-2">
                                <AnimatePresence>
                                    {filteredMessages.map(msg => {
                                        const isRead = readMessageIds.has(msg.id);
                                        const isExpanded = expandedMessageId === msg.id;
                                        const senderName = msg.from?.name || msg.from?.address || 'Unknown Sender';
                                        const senderAddress = msg.from?.address || 'no-reply@unknown.com';
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
                                                onClick={() => handleMessageClick(msg.id)}
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
                                                        <div className="prose dark:prose-invert prose-sm max-w-none text-slate-600 dark:text-slate-300" dangerouslySetInnerHTML={{ __html: msg.htmlBody || '' }} />
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

                    {/* --- Section 2: Enhanced Forms --- */}
                    <Card>
                        <h2 className="text-2xl font-bold mb-1">Enhanced Form Styling</h2>
                        <p className="text-slate-500 dark:text-slate-400 mb-6">With animated error messages and consistent styling.</p>
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <InputField
                                label="Email Address"
                                type="email"
                                name="email"
                                placeholder="Enter an invalid email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                error={emailError}
                            />
                            <InputField
                                label="Password"
                                type="password"
                                name="password"
                                placeholder="A stylish password field"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <div className="pt-2">
                                <Button type="submit" className="w-full !py-3">
                                    Check Validation
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
                
                {/* --- Section 3: Authentication Flow --- */}
                 <Card>
                    <h2 className="text-2xl font-bold mb-1">Authentication Flow Showcase</h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-6">Demonstrating email verification and password reset forms.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    {/* Verification */}
                    <div className="p-4 rounded-lg bg-slate-100 dark:bg-slate-800/50">
                        <h3 className="font-semibold mb-2">Email Verification</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Enter the 6-digit code sent to your email.</p>
                        <InputField label="Verification Code" value={verifyCode} onChange={e => setVerifyCode(e.target.value)} />
                        <Button className="w-full mt-4">Verify Account</Button>
                    </div>
                    {/* Forgot Password */}
                    <div className="p-4 rounded-lg bg-slate-100 dark:bg-slate-800/50">
                        <h3 className="font-semibold mb-2">Forgot Password</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Enter your email to receive a reset link.</p>
                        <InputField label="Your Email" type="email" value={forgotEmail} onChange={e => setForgotEmail(e.target.value)} />
                        <Button className="w-full mt-4">Send Reset Link</Button>
                    </div>
                    {/* Reset Password (spans 2 cols on md) */}
                    <div className="md:col-span-2 p-4 rounded-lg bg-slate-100 dark:bg-slate-800/50">
                        <h3 className="font-semibold mb-2">Reset Password</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Set a new, strong password for your account.</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <InputField label="New Password" type="password" value={resetPassword} onChange={e => setResetPassword(e.target.value)} />
                            <InputField label="Confirm Password" type="password" value={resetConfirm} onChange={e => setResetConfirm(e.target.value)} />
                        </div>
                        <Button className="w-full mt-4">Reset Password</Button>
                    </div>
                    </div>
                </Card>
                
                {/* --- Section 4: Overhauled Landing Page Sections --- */}
                <Card>
                    <h2 className="text-2xl font-bold mb-1">Overhauled Landing Page Sections</h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-6">Interactive previews of the new components built for the main landing page.</p>
                    <div className="space-y-8">
                        {/* 'How It Works' Demo */}
                        <div className="p-4 rounded-lg bg-slate-900">
                            <h3 className="font-semibold mb-4 text-center text-white">"How It Works" Demo</h3>
                            <HowItWorks />
                        </div>
                        {/* Testimonials */}
                        <div className="p-4 rounded-lg bg-slate-900">
                            <h3 className="font-semibold mb-4 text-center text-white">Testimonial Cards</h3>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {testimonials.map((t, i) => <TestimonialCard key={i} {...t} />)}
                            </div>
                        </div>
                        {/* Pricing */}
                        <div className="p-4 rounded-lg bg-slate-100 dark:bg-slate-800/50">
                            <h3 className="font-semibold mb-4 text-center">Pricing Preview</h3>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
                                {pricingTiers.map((tier) => (
                                    <div key={tier.name} className={`relative rounded-xl border p-8 flex flex-col bg-white dark:bg-slate-900/50 ${tier.name === 'Pro' ? 'border-sky-500' : 'border-slate-200 dark:border-slate-700/50'}`}>
                                        <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{tier.name}</h3>
                                        <p className="mt-4 text-slate-500 dark:text-slate-300 text-5xl font-extrabold">{tier.price}</p>
                                        <ul className="mt-8 space-y-4 text-slate-600 dark:text-slate-300 flex-grow">
                                            {tier.features.map(f => <li key={f} className="flex items-start"><IconCheck className="w-5 h-5 text-sky-400 mr-3 mt-1" /><span>{f}</span></li>)}
                                        </ul>
                                        <Button variant={tier.name === 'Pro' ? 'primary' : 'secondary'} className="w-full !py-3 mt-10">{tier.cta}</Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* FAQ */}
                        <div className="p-4 rounded-lg bg-slate-900">
                            <h3 className="font-semibold mb-4 text-center text-white">FAQ Accordion</h3>
                            <div>
                                {faqs.map((faq, i) => <FaqItem key={i} {...faq} />)}
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
        <Footer />
        </div>
    );
};

export default ChangelogPage;
