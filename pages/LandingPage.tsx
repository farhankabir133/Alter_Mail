import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '../components/ui/Button';
import { Footer } from '../components/layout/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import DataStreamBackground from '../components/ui/DataStreamBackground';

// --- Reusable Icons ---
const IconCheck = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="20 6 9 17 4 12"></polyline></svg>
);
const IconChevronDown = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="6 9 12 15 18 9"></polyline></svg>
);
const IconUserShield = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path><path d="M16 21a2 2 0 0 0-8 0"></path></svg>;
const IconCode = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>;
const IconStopCircle = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><rect x="9" y="9" width="6" height="6"></rect></svg>;

// --- New Components for Landing Page Sections ---

const HowItWorks = () => {
  const steps = [
    { title: 'Generate Email', description: 'Click a button to instantly create a new, private email address.' },
    { title: 'Use Anywhere', description: 'Copy your new address and use it for any online sign-up or service.' },
    { title: 'Receive Mail', description: 'Emails arrive instantly in your secure, real-time AltMail inbox.' },
  ];
  return (
    <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 md:space-x-8">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className="text-center max-w-xs">
            <div className="mx-auto w-16 h-16 rounded-full bg-slate-800/50 border-2 border-sky-500/30 flex items-center justify-center text-2xl font-bold text-sky-400 mb-4">
              {index + 1}
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
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
    <div className="relative p-8 overflow-hidden rounded-xl h-full bg-slate-900/50 border border-slate-700/50 backdrop-blur-lg">
        <p className="text-slate-300 italic">"{quote}"</p>
        <div className="mt-6">
            <p className="font-bold text-white">{name}</p>
            <p className="text-sm text-sky-400">{role}</p>
        </div>
    </div>
);

const FaqItem = ({ question, answer }: { question: string, answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-slate-700/50 py-6">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-left">
                <span className="text-lg font-semibold text-white">{question}</span>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                    <IconChevronDown className="w-6 h-6 text-slate-400" />
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

const LandingPage: React.FC = () => {
    const [, setLocation] = useLocation();
    
    const testimonials = [
      { quote: "AltMail's API is a lifesaver for testing our app's email notifications. Clean, simple, and reliable.", name: 'Dev Team Lead', role: 'SaaS Startup' },
      { quote: "I use AltMail for all new sign-ups. It's the best way to keep my primary inbox clean and secure from data breaches.", name: 'Sarah P.', role: 'Privacy Advocate' },
    ];
    const useCases = [
      { icon: <IconUserShield />, title: 'Protect Your Privacy', description: 'Sign up for newsletters and services without revealing your real email address.' },
      { icon: <IconCode />, title: 'Developers & QAs', description: 'Instantly generate unlimited inboxes for testing user registration and notification flows.' },
      { icon: <IconStopCircle />, title: 'Avoid Spam', description: 'Use a temporary address for online listings or forums to keep spambots away forever.' },
    ];
    const pricingTiers = [
        { name: 'Free', price: '$0', features: ['1 Mailbox', '10-Min Expiration'], cta: 'Get Started' },
        { name: 'Pro', price: '$5', features: ['25 Mailboxes', 'No Expiration', 'API Access', 'Custom Domains'], cta: 'Go Pro' },
        { name: 'Business', price: '$20', features: ['Unlimited Mailboxes', 'Team Management', 'SAML/SSO'], cta: 'Contact Us' },
    ];
    const faqs = [
        { question: 'What happens when my email expires?', answer: 'For free users, the email address and its contents are permanently deleted after 10 minutes. Pro users can keep their addresses indefinitely.' },
        { question: 'Is it truly anonymous?', answer: 'Yes. We do not require any personal information to generate a free temporary email address. We also have a strict no-logs policy for received emails.' },
        { question: 'Can I receive attachments?', answer: 'Yes, both free and pro plans can receive attachments up to 10MB. Pro users have higher storage limits.' },
        { question: "What's the main benefit of upgrading to Pro?", answer: 'The biggest benefits are permanent mailboxes that don\'t expire, API access for developers, and the ability to use your own custom domains for a professional touch.' },
    ];

    return (
        <div className="w-full bg-[#0a0f1f] text-white">
            {/* Hero Section */}
            <section className="relative text-center py-24 lg:py-40 px-4 overflow-hidden">
                <DataStreamBackground />
                <div className="relative z-10 flex flex-col items-center">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tighter"
                    >
                        <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">Disposable Email</span>
                        <br/>
                        That Just Works.
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
                        className="max-w-2xl mx-auto text-lg text-slate-300 mb-10"
                    >
                        Instantly create a free, anonymous, temporary email address. Protect your privacy and say goodbye to spam forever.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.4, type: 'spring', stiffness: 100 }}
                        className="flex flex-col items-center"
                    >
                        <Button onClick={() => setLocation('/app')} size="lg" className="shadow-2xl shadow-sky-500/30">
                            Get Your Free Email
                        </Button>
                        <div className="mt-6 text-sm text-slate-400">
                            <p>Join 50,000+ users protecting their privacy every week.</p>
                            <p className="font-semibold">No credit card required. Get started in seconds.</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-20 lg:py-24 bg-slate-900/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-200 to-slate-400 bg-clip-text text-transparent">Get Started in 30 Seconds</h2>
                    </div>
                    <HowItWorks />
                </div>
            </section>
            
            {/* Social Proof Section */}
            <section className="py-20 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-200 to-slate-400 bg-clip-text text-transparent">Trusted by Professionals</h2>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                        {testimonials.map((t, i) => <TestimonialCard key={i} {...t} />)}
                    </div>
                    <div className="text-center">
                        <p className="text-lg font-semibold text-slate-400 mb-6">A vital tool for privacy-conscious individuals and teams</p>
                    </div>
                </div>
            </section>

            {/* Use Cases Section */}
            <section className="py-20 lg:py-24 bg-slate-900/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-200 to-slate-400 bg-clip-text text-transparent">Perfect For...</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {useCases.map((useCase, i) => (
                             <div key={i} className="relative p-8 overflow-hidden rounded-xl h-full bg-slate-900/50 border border-slate-700/50 backdrop-blur-lg">
                                 <div className="mb-6 w-16 h-16 bg-gradient-to-br from-slate-700 to-slate-800 text-sky-300 p-4 rounded-xl border border-slate-600">
                                     {useCase.icon}
                                 </div>
                                 <h3 className="text-xl font-bold mb-3 text-white">{useCase.title}</h3>
                                 <p className="text-slate-300">{useCase.description}</p>
                             </div>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* Pricing Preview Section */}
            <section className="py-20 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-200 to-slate-400 bg-clip-text text-transparent">Choose Your Plan</h2>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {pricingTiers.map((tier) => (
                            <div key={tier.name} className={`relative rounded-xl border p-8 flex flex-col bg-slate-900/50 ${tier.name === 'Pro' ? 'border-sky-500' : 'border-slate-700/50'}`}>
                                <h3 className="text-2xl font-bold text-white">{tier.name}</h3>
                                <p className="mt-4 text-slate-300 text-5xl font-extrabold">{tier.price}</p>
                                <ul className="mt-8 space-y-4 text-slate-300 flex-grow">
                                    {tier.features.map(f => <li key={f} className="flex items-start"><IconCheck className="w-5 h-5 text-sky-400 mr-3 mt-1" /><span>{f}</span></li>)}
                                </ul>
                                <Button variant={tier.name === 'Pro' ? 'primary' : 'secondary'} className="w-full !py-3 mt-10">{tier.cta}</Button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* FAQ Section */}
            <section className="py-20 lg:py-24">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-200 to-slate-400 bg-clip-text text-transparent">Frequently Asked Questions</h2>
                    </div>
                    <div>
                        {faqs.map((faq, i) => <FaqItem key={i} {...faq} />)}
                    </div>
                </div>
            </section>
            
            {/* Final CTA Section */}
            <section className="py-20 lg:py-24">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
                    <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-200 to-slate-400 bg-clip-text text-transparent">Ready to Reclaim Your Inbox?</h2>
                    <p className="mt-6 text-lg text-slate-300">Get your free, secure, disposable email address in one click.</p>
                    <Button onClick={() => setLocation('/app')} size="lg" className="mt-10 shadow-2xl shadow-sky-500/30">Get Your Free Email Now</Button>
                </div>
            </section>
            
            <Footer />
        </div>
    );
};

export default LandingPage;