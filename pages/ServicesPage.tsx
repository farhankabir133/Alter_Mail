import React from 'react';
import { motion } from 'framer-motion';
import { Footer } from '../components/layout/Footer';
import { Card } from '../components/ui/Card';

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

const serviceItems = [
  {
    icon: '⚡️',
    title: 'Temporary Inboxes',
    description: 'Instantly generate a disposable email address for temporary sign-ups, protecting your real inbox from spam. Perfect for one-time use.',
  },
  {
    icon: '🛡️',
    title: 'Anonymous & Secure',
    description: 'Our service requires no personal information for temporary use, ensuring your identity remains private and your data secure.',
  },
  {
    icon: '🔄',
    title: 'Real-Time Updates',
    description: 'Receive emails instantly without ever needing to refresh the page. Our live inbox ensures you never miss a crucial message.',
  },
  {
    icon: 'FORWARD',
    title: 'Secure Forwarding (Pro)',
    description: 'Upgrade to a Pro account to automatically forward incoming mail from your AltMail address to your primary email account securely.',
  },
  {
    icon: 'DOMAIN',
    title: 'Custom Domains (Pro)',
    description: 'Personalize your disposable emails by connecting your own domain, giving you a professional and memorable address.',
  },
  {
    icon: 'API',
    title: 'Developer API Access',
    description: 'Integrate AltMail’s powerful email generation and management features directly into your own applications and workflows.',
  },
];


const ServicesPage: React.FC = () => {
  return (
    <div className="bg-slate-50 dark:bg-gray-900">
      <PageHero 
        title={<>Our <span className="text-brand-400">Services</span></>} 
        subtitle="Discover how AltMail empowers you with secure and flexible email solutions." 
      />

      <main className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full text-center">
                  <div className="text-4xl mb-4">{item.icon.length > 2 ? <span className="text-xs px-2 py-1 rounded-full bg-brand-500/10 text-brand-400 font-bold">{item.icon}</span> : item.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400">{item.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ServicesPage;