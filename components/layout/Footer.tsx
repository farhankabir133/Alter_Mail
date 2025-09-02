import React from 'react';
import { Link } from 'wouter';
import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';

const TwitterIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
    </svg>
);
const LinkedInIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.714c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.714h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
    </svg>
);
const GitHubIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.492.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
    </svg>
);
const DiscordIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4464.8245-.6667 1.2882-2.058- .3215-4.1112-.3215-6.1692 0-.2203-.4637-.4557-.9129-.6667-1.2882a.077.077 0 00-.0785-.0371 19.7913 19.7913 0 00-4.8851 1.5152.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0825.0825 0 00.0321.0561c2.058.9941 4.1222 1.4088 6.1802 1.4088 2.058 0 4.1192-.4117 6.1772-1.4088a.0795.0795 0 00.032-.0561c.4212-4.4779-.2216-8.997-.8728-13.6609a.0699.0699 0 00-.0321-.0277zM8.0203 15.6268c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9744-2.419 2.1569-2.419 1.1825 0 2.1569 1.0858 2.1569 2.419 0 1.3333-.9744 2.419-2.1569 2.419zm7.9594 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9744-2.419 2.1569-2.419 1.1825 0 2.1569 1.0858 2.1569 2.419 0 1.3333-.9743 2.419-2.1569 2.419Z" />
    </svg>
);
const YouTubeIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M19.822 5.433a3.003 3.003 0 00-2.122-2.122C16.035 3 12 3 12 3s-4.035 0-5.699.311a3.003 3.003 0 00-2.122 2.122C4 7.097 4 12 4 12s0 4.903.311 6.567a3.003 3.003 0 002.122 2.122C7.965 21 12 21 12 21s4.035 0 5.699-.311a3.003 3.003 0 002.122-2.122C20 16.903 20 12 20 12s0-4.903-.178-6.567zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" clipRule="evenodd" />
    </svg>
);


const FooterLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
  <li>
    <Link href={href}>
      <a className="text-slate-400 hover:text-brand-400 transition-colors duration-200 cursor-pointer">
        {children}
      </a>
    </Link>
  </li>
);

const SocialLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
  <a href={href} className="text-slate-500 hover:text-brand-400 transition-colors duration-200">
    {children}
  </a>
);

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 xl:gap-12">
          
          {/* Brand & Newsletter Section */}
          <div className="md:col-span-12 lg:col-span-4">
            <div className="mb-8">
              <Link href="/">
                <a className="cursor-pointer">
                  <Logo />
                </a>
              </Link>
              <p className="mt-4 text-sm text-slate-400">Disposable Email That Just Works.</p>
            </div>
            <h4 className="font-semibold text-white">Stay updated with AltMail</h4>
            <p className="text-sm text-slate-400 mt-2 mb-4">Get the latest news and updates from our team.</p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition" 
              />
              <Button type="submit" variant="primary" className="flex-shrink-0">Subscribe</Button>
            </form>
          </div>

          {/* Links Section */}
          <div className="md:col-span-12 lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div>
              <h5 className="font-semibold tracking-wider text-white uppercase">Navigation</h5>
              <ul className="mt-4 space-y-3">
                <FooterLink href="/">Home</FooterLink>
                <FooterLink href="/about">About</FooterLink>
                <FooterLink href="/services">Services</FooterLink>
                <FooterLink href="/pricing">Pricing</FooterLink>
                <FooterLink href="/api">API</FooterLink>
                <FooterLink href="/future">Future Integration</FooterLink>
              </ul>
            </div>
             <div>
              <h5 className="font-semibold tracking-wider text-white uppercase">Product</h5>
              <ul className="mt-4 space-y-3">
                <FooterLink href="#">Features</FooterLink>
                <FooterLink href="#">Integration</FooterLink>
                <FooterLink href="#">Security</FooterLink>
                <FooterLink href="/future">Roadmap</FooterLink>
                <FooterLink href="#">Status Page</FooterLink>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold tracking-wider text-white uppercase">Resources</h5>
              <ul className="mt-4 space-y-3">
                <FooterLink href="#">Documentation</FooterLink>
                <FooterLink href="#">Help Center</FooterLink>
                <FooterLink href="#">FAQs</FooterLink>
                <FooterLink href="#">Privacy Policy</FooterLink>
                <FooterLink href="#">Terms of Service</FooterLink>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold tracking-wider text-white uppercase">Company</h5>
              <ul className="mt-4 space-y-3">
                <FooterLink href="#">Careers</FooterLink>
                <FooterLink href="#">Partners</FooterLink>
                <FooterLink href="#">Investors</FooterLink>
                <FooterLink href="#">Community</FooterLink>
                <FooterLink href="#">Blog</FooterLink>
                <FooterLink href="#">Contact</FooterLink>
              </ul>
            </div>
          </div>

        </div>

        {/* Copyright & Socials Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-slate-500 order-2 sm:order-1 mt-4 sm:mt-0">&copy; 2025 AltMail. All Rights Reserved.</p>
          <div className="flex space-x-6 order-1 sm:order-2">
            <SocialLink href="#"><TwitterIcon /></SocialLink>
            <SocialLink href="#"><LinkedInIcon /></SocialLink>
            <SocialLink href="#"><GitHubIcon /></SocialLink>
            <SocialLink href="#"><DiscordIcon /></SocialLink>
            <SocialLink href="#"><YouTubeIcon /></SocialLink>
          </div>
        </div>
      </div>
    </footer>
  );
};