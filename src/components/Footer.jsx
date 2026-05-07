import React from 'react';
import { Eye, Globe, MessageSquare } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-16 pb-8">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="bg-primary/20 p-1.5 rounded-lg border border-primary/30">
                <Eye className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xl font-bold tracking-wide">Civic<span className="text-primary">Eye</span></span>
            </a>
            <p className="text-gray-400 max-w-sm mb-6">
              Empowering citizens to build smarter, safer, and more transparent cities through technology-driven civic engagement.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Globe className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><MessageSquare className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-primary transition-colors">Report Issue</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Live Map</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Impact Data</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">City Agencies</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Accessibility</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} CivicEye. All rights reserved. Open Source Initiative.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
