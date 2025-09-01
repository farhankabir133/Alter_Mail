import React from 'react';
import { motion } from 'framer-motion';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';

const CodeBlock = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-slate-800 dark:bg-black/50 rounded-lg overflow-hidden my-4">
    <div className="bg-slate-700 dark:bg-slate-900/80 px-4 py-2 text-xs text-slate-300 font-mono flex justify-between items-center">
      <span>bash</span>
      <button className="text-xs font-semibold hover:text-white">Copy</button>
    </div>
    <pre className="p-4 text-sm text-slate-100 overflow-x-auto"><code>{children}</code></pre>
  </div>
);

const APIPage: React.FC = () => {
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
            Developer API
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400"
          >
            Integrate the power of AltMail directly into your applications. Simple, reliable, and built for developers.
          </motion.p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8 prose dark:prose-invert prose-slate lg:prose-lg">
        <h2>Introduction</h2>
        <p>
          The AltMail API provides programmatic access to create and manage temporary email inboxes. It's a RESTful API that uses JSON for all requests and responses and standard HTTP verbs.
        </p>

        <h2>Authentication</h2>
        <p>
          API access requires an API key, available to all Pro and Business plan subscribers. Include your API key in the `Authorization` header of every request.
        </p>
        <CodeBlock>
          {`curl "https://api.altmail.dev/v1/inboxes" \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
        </CodeBlock>

        <hr/>

        <h2>Endpoints</h2>
        
        <h3>Create a new Inbox</h3>
        <p><span className="font-mono text-sm bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded">POST /v1/inboxes</span></p>
        <p>Creates a new temporary email address. You can specify an optional custom domain if your plan supports it.</p>
        
        <h4>Response:</h4>
        <CodeBlock>
{`{
  "id": "inbox_1a2b3c4d5e",
  "address": "random-user@altmail.dev",
  "expiresAt": "2024-10-27T10:00:00Z"
}`}
        </CodeBlock>
        
        <h3>List Messages in Inbox</h3>
        <p><span className="font-mono text-sm bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded">GET /v1/inboxes/:id/messages</span></p>
        <p>Retrieves a list of all messages received by a specific inbox.</p>
        
        <h4>Response:</h4>
        <CodeBlock>
{`{
  "data": [
    {
      "id": "msg_9x8y7z6w5v",
      "from": "sender@example.com",
      "subject": "Hello from AltMail",
      "receivedAt": "2024-10-26T14:30:00Z"
    }
  ]
}`}
        </CodeBlock>

        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold">Ready to get started?</h3>
          <p className="mt-2">Upgrade to a Pro plan to get your API key today.</p>
          <Button size="lg" className="mt-6">View Pricing</Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default APIPage;