import React from 'react';
import { motion } from 'framer-motion';
import { Footer } from '../components/layout/Footer';

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

const roadmapItems = [
    {
      quarter: 'Q4 2024',
      title: 'Browser Extensions',
      description: 'Generate disposable emails directly from your browser with extensions for Chrome, Firefox, and Safari for ultimate convenience.',
      status: 'In Progress'
    },
    {
      quarter: 'Q1 2025',
      title: 'Native Mobile Apps',
      description: 'Manage your mailboxes on the go with dedicated iOS and Android applications, featuring push notifications for new emails.',
      status: 'Planned'
    },
    {
      quarter: 'Q2 2025',
      title: 'Encrypted Attachments',
      description: 'Enhance security with end-to-end encryption for all email attachments sent and received through AltMail Pro accounts.',
      status: 'Planned'
    },
    {
      quarter: 'Q3 2025',
      title: 'Team Collaboration',
      description: 'Introduce features for business users, allowing teams to share and manage a pool of disposable email addresses for projects.',
      status: 'Researching'
    }
];

const TimelineItem = ({ item, isLast }: { item: typeof roadmapItems[0], isLast: boolean }) => (
  <div className="relative pl-8 sm:pl-32 py-6 group">
    <div className={`absolute left-0 sm:left-16 top-0 h-full w-0.5 ${isLast ? 'bg-transparent' : 'bg-slate-200 dark:bg-slate-700'}`}></div>
    <div className="absolute left-0 sm:left-16 top-6 w-4 h-4 rounded-full bg-brand-500 border-4 border-slate-50 dark:border-gray-900 transform group-hover:scale-125 transition-transform"></div>
    <div className="sm:absolute left-0 top-6 text-sm font-semibold text-brand-400 w-28 text-left sm:text-right pr-8">{item.quarter}</div>
    
    <div className="bg-white dark:bg-slate-800/50 p-6 rounded-lg shadow-md border border-slate-200 dark:border-slate-700/50 group-hover:border-brand-500/50 transition-colors">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-bold">{item.title}</h3>
        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
            item.status === 'In Progress' ? 'bg-yellow-500/10 text-yellow-400' :
            item.status === 'Planned' ? 'bg-sky-500/10 text-sky-400' :
            'bg-slate-500/10 text-slate-400'
        }`}>{item.status}</span>
      </div>
      <p className="text-slate-600 dark:text-slate-300">{item.description}</p>
    </div>
  </div>
);


const FutureIntegrationPage: React.FC = () => {
  return (
    <div className="bg-slate-50 dark:bg-gray-900">
       <PageHero 
        title={<>What's <span className="text-brand-400">Next?</span></>} 
        subtitle="Our roadmap for the future of private and secure communication." 
      />

      <main className="py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative">
                {roadmapItems.map((item, index) => (
                    <motion.div
                        key={item.title}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                    >
                        <TimelineItem item={item} isLast={index === roadmapItems.length - 1} />
                    </motion.div>
                ))}
            </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FutureIntegrationPage;