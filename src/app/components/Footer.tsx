import { Building2, Mail, Phone, MapPin } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const { settings } = useSettings();
  
  const handleNavigation = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
      window.scrollTo(0, 0);
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="w-8 h-8 text-blue-500" />
              <span className="text-2xl font-bold text-white">{settings.platformName}</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Your trusted partner for loan eligibility checking and financial consultancy. 
              We help you find the best loan offers from multiple banks and financial institutions.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin className="w-4 h-4 text-blue-500" />
                <span>{settings.address}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Mail className="w-4 h-4 text-blue-500" />
                <a href={`mailto:${settings.supportEmail}`} className="hover:text-blue-400 transition-colors">
                  {settings.supportEmail}
                </a>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Phone className="w-4 h-4 text-blue-500" />
                <a href={`tel:${settings.supportPhone.replace(/\s/g, '')}`} className="hover:text-blue-400 transition-colors">
                  {settings.supportPhone}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleNavigation('home')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('offers')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Live Bank Offers
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('eligibility')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Check Eligibility
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('company')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Company Checker
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('pincode')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  PIN Code Checker
                </button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleNavigation('privacy-policy')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('terms-of-service')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('disclaimer')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Disclaimer
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('contact-us')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>
              {settings.footerText}
            </p>
            <a
              href="https://www.ficlear.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              www.ficlear.in
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}