import React from 'react';
import { motion } from 'framer-motion';
import { Footer } from '../components/layout/Footer';
import { Card } from '../components/ui/Card';

const teamMembers = [
  {
    name: 'Jane Doe',
    role: 'Founder & CEO',
    imageUrl: 'https://i.pravatar.cc/150?u=jane',
  },
  {
    name: 'John Smith',
    role: 'Lead Engineer',
    imageUrl: 'https://i.pravatar.cc/150?u=john',
  },
  {
    name: 'Emily White',
    role: 'UX Designer',
    imageUrl: 'https://i.pravatar.cc/150?u=emily',
  },
   {
    name: 'Michael Brown',
    role: 'Privacy Advocate',
    imageUrl: 'https://i.pravatar.cc/150?u=michael',
  },
];

const AboutPage: React.FC = () => {
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
            We're on a mission to protect your privacy.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 max-w-3xl mx-auto text-lg text-slate-600 dark:text-slate-400"
          >
            In a world where your data is a commodity, AltMail provides a necessary shield. We believe everyone deserves a private, spam-free online experience.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">Our Story</h2>
            <p className="text-slate-600 dark:text-slate-300 space-y-4">
              Founded in 2023, AltMail started as a simple tool to combat the ever-increasing flood of spam in our personal inboxes. We were tired of handing over our real email addresses just to sign up for a newsletter or try a new service.
              <br/><br/>
              What began as a weekend project quickly grew into a passion. We realized that the need for disposable, anonymous email was more critical than ever. Today, AltMail serves thousands of users, providing a reliable and secure way to interact online without compromising their privacy.
            </p>
          </div>
          <div className="bg-brand-500 rounded-xl p-8">
            <h2 className="text-3xl font-bold tracking-tight text-white mb-4">Our Mission</h2>
            <p className="text-brand-100 text-lg">
              To empower individuals with simple, accessible tools for digital privacy. We strive to make online anonymity easy and effective, giving you back control over your personal information and creating a safer, less cluttered digital world for everyone.
            </p>
          </div>
        </div>
      </div>

      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Meet the Team</h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">The people behind the privacy.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="text-center p-6">
                  <img src={member.imageUrl} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-slate-200 dark:border-slate-700" />
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">{member.name}</h3>
                  <p className="text-brand-600 dark:text-brand-400 font-medium">{member.role}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;
