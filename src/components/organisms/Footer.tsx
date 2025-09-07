import React from 'react';
import { cn } from '@/lib/utils';
import { Input, Button } from '@/components';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer className={cn('bg-black text-white', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Brand / Newsletter */}
          <div className="md:col-span-5">
            <h3 className="text-lg font-semibold tracking-wide mb-3">ECOMMERCE</h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-5 max-w-sm">
              Ecommerce is a free UI Kit from Paperpillar that you can use for your personal or commercial project.
            </p>
            <div className="flex items-center gap-3 max-w-md">
              <input
                type="email"
                placeholder="Type your email address"
                className="flex-1 bg-transparent border border-gray-700 rounded-full px-4 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              <Button className="bg-white dark:text-black hover:text-white text-black rounded-full h-9 px-5 hover:bg-gray-200">Submit</Button>
            </div>
          </div>

          {/* Right Link Columns */}
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h4 className="text-sm font-semibold text-gray-300 tracking-widest mb-4">POPULAR</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>Shoes</li>
                <li>T-Shirt</li>
                <li>Jackets</li>
                <li>Hat</li>
                <li>Accessories</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-300 tracking-widest mb-4">MENU</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>All Category</li>
                <li>Gift Cards</li>
                <li>Special Events</li>
                <li>Testimonial</li>
                <li>Blog</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-300 tracking-widest mb-4">OTHER</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>Tracking Package</li>
                <li>FAQ</li>
                <li>About Us</li>
                <li>Contact Us</li>
                <li>Terms and Conditions</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-300 tracking-widest mb-4">FOLLOW US</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a 
                    href="https://facebook.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a 
                    href="https://tiktok.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors duration-200"
                  >
                    TikTok
                  </a>
                </li>
                <li>
                  <a 
                    href="https://youtube.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors duration-200"
                  >
                    YouTube
                  </a>
                </li>
                <li>
                  <a 
                    href="https://twitter.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
