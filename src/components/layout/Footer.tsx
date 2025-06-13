import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  console.log('Footer component loaded');

  const informationalLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Terms of Service', path: '/terms' },
    { name: 'Privacy Policy', path: '/privacy' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: <Facebook className="h-5 w-5" />, path: 'https://facebook.com' },
    { name: 'Twitter', icon: <Twitter className="h-5 w-5" />, path: 'https://twitter.com' },
    { name: 'Instagram', icon: <Instagram className="h-5 w-5" />, path: 'https://instagram.com' },
    { name: 'LinkedIn', icon: <Linkedin className="h-5 w-5" />, path: 'https://linkedin.com' },
    { name: 'YouTube', icon: <Youtube className="h-5 w-5" />, path: 'https://youtube.com' },
  ];

  return (
    <footer className="bg-neutral-800 text-neutral-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* App Info/Logo Section */}
          <div>
            <h3 className="text-xl font-semibold text-orange-500 mb-4">ExploreIndia</h3>
            <p className="text-sm text-neutral-400">
              Your personal concierge for crafting the perfect Indian adventure. Discover, plan, and book your journey with us.
            </p>
          </div>

          {/* Informational Links */}
          <div>
            <h4 className="text-lg font-medium text-neutral-100 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {informationalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-neutral-400 hover:text-orange-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media & Contact */}
          <div>
            <h4 className="text-lg font-medium text-neutral-100 mb-4">Connect With Us</h4>
            <div className="flex space-x-4 mb-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="text-neutral-400 hover:text-orange-400 transition-colors duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <p className="text-sm text-neutral-400">
              Email: <a href="mailto:support@exploreindia.com" className="hover:text-orange-400">support@exploreindia.com</a>
            </p>
            <p className="text-sm text-neutral-400">
              Phone: <a href="tel:+911234567890" className="hover:text-orange-400">+91 123 456 7890</a>
            </p>
          </div>
        </div>

        <div className="border-t border-neutral-700 pt-8 text-center">
          <p className="text-sm text-neutral-500">
            &copy; {new Date().getFullYear()} ExploreIndia. All rights reserved.
          </p>
          <p className="text-xs text-neutral-600 mt-1">
            Crafted with <span role="img" aria-label="love">❤️</span> for the love of India.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;