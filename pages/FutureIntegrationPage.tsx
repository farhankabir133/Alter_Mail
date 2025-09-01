import React from 'react';
import { motion } from 'framer-motion';
import { Footer } from '../components/layout/Footer';

const roadmapItems = [
  {
    status: 'In Progress',
    title: 'Browser Extension',
    description: 'Generate temporary emails directly from your browser with one click. Autofill sign-up forms and manage inboxes without leaving the page.',
    color: 'yellow',
  },
  {
    status: 'Planned',
    title: 'Mobile Apps (iOS & Android)',
    description: 'Manage your temporary inboxes on the go. Get push notifications for new emails and enjoy a native mobile experience.',
    color: 'blue',
  },
  {
    status: 'Planned',
    title: 'Encrypted Attachments',
    description: 'Securely send and receive attachments with end-to-end encryption, ensuring your files remain private.',
    color: 'blue',
  },
  {
    status: 'Exploring',
    title: 'Decentralized Identity Integration',
    description: 'Link your mailboxes to a decentralized identity (DID) for even greater control and privacy over your online persona.',
    color: 'gray',
  },
   {
    status: 'Completed',
    title: 'Developer API Launch',
    description: 'Our REST API is now live, allowing developers to integrate AltMail into their own applications and workflows.',
    color: 'green',
  },
];

const statusColors = {
  green: 'bg-green-500',
  blue: 'bg-blue-500',
  yellow: 'bg-yellow-500',
  gray: 'bg-slate-500',
}

const statusTextColors = {
  green: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
  blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
  yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
  gray: 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300',
}

const FutureIntegrationPage: React.FC = () => {
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
            What's Next for AltMail?
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400"
          >
            We're constantly working to build the future of private communication. Here's a look at our public roadmap.
          </motion.p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 h-full w-0.5 bg-slate-200 dark:bg-slate-700" aria-hidden="true"></div>

          <ul className="space-y-12">
            {roadmapItems.map((item, index) => (
              <motion.li
                key={index}
                className="relative pl-12"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className={`absolute left-0 top-1.5 w-8 h-8 rounded-full flex items-center justify-center`}>
                  <div className={`absolute w-8 h-8 rounded-full ${statusColors[item.color as keyof typeof statusColors]} opacity-20`}></div>
                  <div className={`w-3 h-3 rounded-full ${statusColors[item.color as keyof typeof statusColors]}`}></div>
                </div>
                
                <div>
                  <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${statusTextColors[item.color as keyof typeof statusTextColors]}`}>{item.status}</span>
                  <h3 className="mt-3 text-2xl font-bold text-slate-800 dark:text-slate-100">{item.title}</h3>
                  <p className="mt-2 text-slate-600 dark:text-slate-300">{item.description}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default FutureIntegrationPage;