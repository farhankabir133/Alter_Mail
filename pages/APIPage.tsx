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

const CodeBlock = ({ children }: { children: React.ReactNode }) => (
  <pre className="bg-slate-800 text-white p-4 rounded-lg overflow-x-auto text-sm font-mono relative">
    <Button size="sm" variant="ghost" className="absolute top-2 right-2 !py-1 !px-2 text-xs">Copy</Button>
    <code>
      {children}
    </code>
  </pre>
);

const APIPage: React.FC = () => {
  return (
    <div className="bg-slate-50 dark:bg-gray-900">
      <PageHero 
        title={<>Developer <span className="text-brand-400">API</span></>} 
        subtitle="Integrate AltMail's powerful disposable email functionality into your applications." 
      />

      <main className="py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-3xl font-bold tracking-tight mb-2">Getting Started</h2>
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
                    Our API is designed to be simple and intuitive. To get started, you'll need an API key from your Pro account dashboard. All requests should be authenticated using a Bearer token.
                </p>
                
                <h3 className="text-2xl font-bold tracking-tight mt-12 mb-4">Endpoints</h3>

                {/* Create Mailbox Endpoint */}
                <div className="mb-12">
                    <h4 className="text-xl font-semibold mb-2"><span className="font-mono text-sm px-2 py-1 rounded bg-green-500/10 text-green-400 mr-2">POST</span> /v1/mailboxes</h4>
                    <p className="text-slate-500 dark:text-slate-400 mb-4">Creates a new disposable mailbox.</p>
                    <h5 className="font-semibold mb-2">Example Request:</h5>
                    <CodeBlock>
{`curl -X POST https://api.altmail.dev/v1/mailboxes \\
-H "Authorization: Bearer YOUR_API_KEY"`}
                    </CodeBlock>
                     <h5 className="font-semibold mt-4 mb-2">Example Response:</h5>
                    <CodeBlock>
{`{
  "id": "mb_1a2b3c4d5e",
  "address": "random-alias@altmail.pro",
  "expiresAt": "2024-10-27T10:00:00Z"
}`}
                    </CodeBlock>
                </div>

                {/* Get Messages Endpoint */}
                <div className="mb-12">
                    <h4 className="text-xl font-semibold mb-2"><span className="font-mono text-sm px-2 py-1 rounded bg-sky-500/10 text-sky-400 mr-2">GET</span> /v1/mailboxes/{`{mailboxId}`}/messages</h4>
                    <p className="text-slate-500 dark:text-slate-400 mb-4">Retrieves a list of messages for a given mailbox.</p>
                    <h5 className="font-semibold mb-2">Example Request:</h5>
                    <CodeBlock>
{`curl https://api.altmail.dev/v1/mailboxes/mb_1a2b3c4d5e/messages \\
-H "Authorization: Bearer YOUR_API_KEY"`}
                    </CodeBlock>
                    <h5 className="font-semibold mt-4 mb-2">Example Response:</h5>
                    <CodeBlock>
{`[
  {
    "id": "msg_9z8y7x6w5v",
    "from": "sender@example.com",
    "subject": "Your verification code",
    "receivedAt": "2024-10-27T09:30:00Z"
  }
]`}
                    </CodeBlock>
                </div>
            </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default APIPage;