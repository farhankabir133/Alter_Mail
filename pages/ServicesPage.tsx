import React from 'react';
import { motion } from 'framer-motion';
import { Footer } from '../components/layout/Footer';
import { Card } from '../components/ui/Card';

// FIX: Moved icon components to be defined before they are used in the 'services' array to resolve block-scoped variable declaration errors.
const IconShieldCheck = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>;
const IconUserCircle = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="10" r="3"></circle><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"></path></svg>;
const IconCode = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>;
const IconGlobe = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>;
const IconArrowRight = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>;
const IconInbox = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path></svg>;

const services = [
  {
    icon: <IconShieldCheck />,
    title: 'Temporary Inboxes',
    description: 'Instantly generate secure, anonymous email inboxes that expire after a set time. Perfect for sign-ups and protecting your primary email from spam.',
  },
  {
    icon: <IconUserCircle />,
    title: 'Pro Accounts',
    description: 'Upgrade to a Pro account to keep your email addresses, get longer expiration times, and unlock advanced features like custom domains.',
  },
  {
    icon: <IconCode />,
    title: 'Developer API',
    description: 'Integrate temporary email generation into your own applications and services with our simple and powerful REST API.',
  },
  {
    icon: <IconGlobe />,
    title: 'Custom Domains',
    description: 'For Pro users, bring your own domain to create professional, branded temporary email addresses for your team or project.',
  },
  {
    icon: <IconArrowRight />,
    title: 'Email Forwarding',
    description: 'Automatically forward incoming emails from your temporary address to your permanent inbox without revealing your real email.',
  },
  {
    icon: <IconInbox />,
    title: 'Increased Storage',
    description: 'Pro accounts benefit from increased storage for attachments and a longer message history for your temporary inboxes.',
  },
];

const ServicesPage: React.FC = () => {
  return (
    <div className="bg-slate-50 dark:bg-gray-900">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-200/[0.05] dark:bg-grid-slate-700/[0.05] [mask-image:linear-gradient(to_bottom,white_50%,transparent_100%)]"></div>
        <div className="max-w-7xl mx-auto py-20 sm:py-28 px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white"
          >
            Our Services
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400"
          >
            AltMail provides a suite of tools designed to protect your privacy and streamline your digital life. Explore what we have to offer.
          </motion.p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Card className="h-full">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 bg-brand-100 dark:bg-brand-900/50 text-brand-600 dark:text-brand-300 p-3 rounded-lg">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">{service.title}</h3>
                </div>
                <p className="mt-4 text-slate-600 dark:text-slate-300">{service.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ServicesPage;