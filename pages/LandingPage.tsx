import React from 'react';
import { useLocation } from 'wouter';
import { Button } from '../components/ui/Button';
import { Footer } from '../components/layout/Footer';
import { motion } from 'framer-motion';
import DataStreamBackground from '../components/ui/DataStreamBackground';

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <div
      className="relative p-8 overflow-hidden rounded-xl h-full bg-slate-900/50 border border-slate-700/50 backdrop-blur-lg group transition-all duration-300 hover:border-sky-500/50 hover:shadow-2xl hover:shadow-sky-500/10"
    >
        {/* Glow effect */}
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-sky-500/30 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="relative z-10 text-center flex flex-col items-center">
            <div className="mb-6 bg-gradient-to-br from-slate-700 to-slate-800 text-sky-300 p-4 rounded-xl border border-slate-600">
              {icon}
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-100">{title}</h3>
            <p className="text-slate-300 text-sm flex-grow">{description}</p>
        </div>
    </div>
);

const LandingPage: React.FC = () => {
  const [, setLocation] = useLocation();

  const features = [
    { 
      icon: <IconZap />, 
      title: "Instant Generation", 
      description: "Get a new, private email address in one click. No sign-up required for temporary use." 
    },
    { 
      icon: <IconMail />, 
      title: "Real-Time Inbox", 
      description: "Messages appear instantly without refreshing the page, thanks to our live-update technology." 
    },
    { 
      icon: <IconShield />, 
      title: "Privacy Focused", 
      description: "Protect your primary inbox from spam and data breaches. Your temporary email is anonymous." 
    },
    { 
      icon: <IconRocket />, 
      title: "Pro Features", 
      description: "Upgrade to keep your address, use a custom domain, and enable forwarding." 
    },
  ];

  return (
    <div className="w-full bg-[#0a0f1f]">
      {/* Hero Section */}
      <section className="relative text-center py-24 lg:py-40 px-4 overflow-hidden">
        <DataStreamBackground />
        
        <div className="relative z-10 flex flex-col items-center">
          <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tighter"
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
          >
              <Button onClick={() => setLocation('/app')} size="lg" className="shadow-2xl shadow-sky-500/30">
                Get Your Free Email
              </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-200 to-slate-400 bg-clip-text text-transparent">Why Choose AltMail?</h2>
            <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">Everything you need for secure, temporary communication.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <FeatureCard {...feature} />
                </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

// SVG Icons (self-contained components)
const IconZap = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>;
const IconMail = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;
const IconShield = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>;
const IconRocket = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.3.05-3.12-.65-.82-2.12-.8-3.12.05z"></path><path d="M12 12c6 6 9 3 9 3s-3-3-3-9c0-2-2.5-3.5-5-1.5-2.5 2-1.5 5-1.5 5z"></path></svg>;


export default LandingPage;