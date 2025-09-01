import React from 'react';
import { motion } from 'framer-motion';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';

const PageHero = ({ title, subtitle }: { title: React.ReactNode, subtitle: string }) => (
  <section className="relative text-center py-20 lg:py-28 px-4 bg-[#0a0f1f]">
    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.1)_0%,_rgba(10,15,31,0)_50%)]"></div>
    <div className="relative z-10">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tighter"
      >
        {title}
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
        className="max-w-2xl mx-auto text-lg text-slate-300"
      >
        {subtitle}
      </motion.p>
    </div>
  </section>
);

const CheckIcon = () => <svg className="w-5 h-5 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>;

const pricingTiers = [
  {
    name: 'Free',
    price: '$0',
    frequency: '/ forever',
    description: 'For temporary, one-time use. Perfect for quick sign-ups.',
    features: [
      '1 active mailbox',
      '10-minute expiration',
      'Real-time inbox',
      'Anonymous access',
    ],
    cta: 'Get Started',
    variant: 'secondary'
  },
  {
    name: 'Pro',
    price: '$5',
    frequency: '/ month',
    description: 'For power users who need more permanent solutions.',
    features: [
      '10 active mailboxes',
      '24-hour expiration',
      'Secure email forwarding',
      'Connect custom domains',
      'Priority support',
    ],
    cta: 'Upgrade to Pro',
    variant: 'primary',
    popular: true,
  },
  {
    name: 'Business',
    price: 'Contact Us',
    frequency: '',
    description: 'For teams and applications that need robust email integration.',
    features: [
      'Unlimited mailboxes',
      'No expiration',
      'Full API access',
      'Team management',
      'Dedicated support',
    ],
    cta: 'Contact Sales',
    variant: 'secondary'
  },
];


const PricingPage: React.FC = () => {
  return (
    <div className="bg-slate-50 dark:bg-gray-900">
       <PageHero 
        title={<>Simple, Transparent <span className="text-brand-400">Pricing</span></>} 
        subtitle="Choose the plan that's right for you. No hidden fees, ever." 
      />
      
      <main className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative rounded-xl p-8 border h-full flex flex-col ${
                  tier.popular ? 'border-brand-500 shadow-2xl shadow-brand-500/20' : 'border-slate-200 dark:border-slate-700'
                } bg-white dark:bg-slate-800/50`}
              >
                {tier.popular && (
                  <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-500 text-white">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-center">{tier.name}</h3>
                <p className="text-center text-slate-500 dark:text-slate-400 mt-2">{tier.description}</p>
                
                <div className="mt-8 text-center">
                  <span className="text-5xl font-extrabold">{tier.price}</span>
                  <span className="text-base font-medium text-slate-500 dark:text-slate-400">{tier.frequency}</span>
                </div>

                <ul className="mt-8 space-y-4 flex-grow">
                  {tier.features.map(feature => (
                    <li key={feature} className="flex items-start">
                      <CheckIcon />
                      <span className="ml-3 text-slate-600 dark:text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button variant={tier.variant as any} className="w-full mt-10 !py-3">
                  {tier.cta}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PricingPage;