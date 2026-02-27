import { Facebook, Twitter, Linkedin, Instagram, Github} from 'lucide-react';
import UniversityLogo from "../assets/FEI_TUKE_logo.png";

interface FooterProps {
  isDarkMode: boolean;
}

export default function Footer({ isDarkMode }: FooterProps) {
  return (
    <footer className={`py-8 border-t transition-colors duration-300 w-full ${
      isDarkMode 
        ? 'bg-gray-900 border-gray-800 text-gray-400' 
        : 'bg-white border-gray-200 text-gray-600'
    }`}>
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Logo / Icon Area */}
        <div className="flex items-center gap-3">
             <div className={`h-24 w-72 flex items-center justify-center rounded-lg ${isDarkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-50 text-blue-700'}`}>
                <img
                  src={UniversityLogo}
                  alt="University logo"
                  className="h-16 w-48 object-contain"
                />
             </div>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-blue-500 transition-colors"><Facebook className="w-5 h-5" /></a>
          <a href="#" className="hover:text-blue-400 transition-colors"><Twitter className="w-5 h-5" /></a>
          <a href="#" className="hover:text-blue-600 transition-colors"><Linkedin className="w-5 h-5" /></a>
          <a href="#" className="hover:text-pink-500 transition-colors"><Instagram className="w-5 h-5" /></a>
          <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
        </div>
        
        {/* Copyright */}
        <div className="text-sm">
           © 2025 LP Solver. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
