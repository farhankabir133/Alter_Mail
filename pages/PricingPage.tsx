import React from 'react';
import { motion } from 'framer-motion';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';

const pricingTiers = [
  {
    name: 'Free',
    price: '$0',
    frequency: '/ forever',
    description: 'Perfect for quick, temporary use.',
    features: [
      '1 Temporary Mailbox',
      '10-Minute Expiration',
      'Real-Time Inbox',
      'Basic Spam Protection',
    ],
    cta: 'Get Started',
    isPopular: false,
  },
  {
    name: 'Pro',
    price: '$5',
    frequency: '/ month',
    description: 'For power users and developers.',
    features: [
      '25 Permanent Mailboxes',
      'No Expiration',
      'API Access',
      'Email Forwarding',
      'Custom Domains',
      'Priority Support',
    ],
    cta: 'Go Pro',
    isPopular: true,
  },
  {
    name: 'Business',
    price: '$20',
    frequency: '/ month',
    description: 'For teams and organizations.',
    features: [
      'Unlimited Mailboxes',
      'Team Management',
      'Centralized Billing',
      'Advanced Security Logs',
      'SAML/SSO Integration',
      'Dedicated Support',
    ],
    cta: 'Contact Sales',
    isPopular: false,
  },
];

const PricingPage: React.FC = () => {
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
            Simple, Transparent Pricing
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400"
          >
            Choose the plan that's right for you. No hidden fees, ever.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-xl border p-8 flex flex-col ${
                tier.isPopular 
                  ? 'border-brand-500 shadow-2xl shadow-brand-500/20' 
                  : 'border-slate-200 dark:border-slate-700'
              } bg-white dark:bg-slate-800/50`}
            >
              {tier.isPopular && (
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 text-sm font-semibold tracking-wide text-white bg-gradient-to-r from-brand-500 to-brand-600 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{tier.name}</h3>
              <p className="mt-4 text-slate-500 dark:text-slate-400">{tier.description}</p>
              <div className="mt-6">
                <span className="text-5xl font-extrabold text-slate-900 dark:text-white">{tier.price}</span>
                <span className="text-lg font-medium text-slate-500 dark:text-slate-400">{tier.frequency}</span>
              </div>

              <ul className="mt-8 space-y-4 text-slate-600 dark:text-slate-300 flex-grow">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <IconCheck className="flex-shrink-0 w-5 h-5 text-brand-500 mr-3 mt-1" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-10">
                <Button 
                  variant={tier.isPopular ? 'primary' : 'secondary'}
                  className="w-full !py-3"
                >
                  {tier.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

const IconCheck = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="20 6 9 17 4 12"></polyline></svg>
);

export default PricingPage;