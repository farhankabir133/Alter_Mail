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

const teamMembers = [
    { name: 'Alex Johnson', role: 'Founder & CEO', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
    { name: 'Jane Doe', role: 'Lead Engineer', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d' },
    { name: 'Sam Wilson', role: 'UX/UI Designer', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706d' },
    { name: 'Emily Carter', role: 'Product Manager', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026707d' },
];

const AboutPage: React.FC = () => {
  return (
    <div className="bg-slate-50 dark:bg-gray-900">
       <PageHero 
        title={<>About <span className="text-brand-400">AltMail</span></>} 
        subtitle="We're on a mission to reclaim digital privacy, one inbox at a time." 
      />
      
      <main className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Mission Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                    <h2 className="text-3xl font-bold tracking-tight mb-4">Our Mission</h2>
                    <p className="text-lg text-slate-600 dark:text-slate-300 space-y-4">
                        In an age of constant data collection, we believe that privacy shouldn't be a luxury. AltMail was founded on the principle that everyone deserves control over their digital footprint.
                        <br/><br/>
                        Our goal is to provide a simple, secure, and accessible tool that empowers users to protect their primary inboxes from spam, trackers, and unwanted solicitations. We are committed to building a service that is transparent, user-focused, and relentlessly dedicated to privacy.
                    </p>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="bg-slate-200 dark:bg-slate-800 rounded-xl p-8 h-80 flex items-center justify-center"
                >
                    <span className="text-6xl">🛡️</span>
                </motion.div>
            </div>

            {/* Team Section */}
            <div className="mt-20 lg:mt-32">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight">Meet the Team</h2>
                    <p className="mt-4 text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">The passionate individuals dedicated to protecting your privacy.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {teamMembers.map((member, index) => (
                        <motion.div
                          key={member.name}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="text-center"
                        >
                            <img src={member.avatar} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4 shadow-lg" />
                            <h3 className="text-xl font-semibold">{member.name}</h3>
                            <p className="text-brand-500 dark:text-brand-400">{member.role}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;