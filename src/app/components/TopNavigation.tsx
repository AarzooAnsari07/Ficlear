import { useState } from 'react';
import { Button } from './ui/button';
import { Shield, Menu, X } from 'lucide-react';
import logoImage from 'src/assets/logo.png';
import { useSettings } from '../contexts/SettingsContext';

interface TopNavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function TopNavigation({ currentPage, onNavigate }: TopNavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { settings } = useSettings();

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'offers', label: 'Live Offers' },
    { id: 'eligibility', label: 'Loan Eligibility' },
    { id: 'company', label: 'Company Checker' },
    { id: 'pincode', label: 'PIN Code Checker' },
    { id: 'policy', label: 'Policy Details' },
  ];

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="border-b bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <div 
              className="flex items-center gap-2 cursor-pointer" 
              onClick={() => handleNavigate('home')}
            >
              <img src={logoImage} alt="FiClear" className="h-8 sm:h-10" />
            </div>

            {/* Menu Items - Desktop */}
            <div className="hidden lg:flex items-center gap-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === item.id
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button 
              variant="outline"
              className="border-gray-300 hover:bg-gray-50 font-medium shadow-sm"
              onClick={() => handleNavigate('admin')}
            >
              <Shield className="w-4 h-4 mr-2" />
              Admin
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 font-semibold shadow-sm"
              onClick={() => handleNavigate('eligibility')}
            >
              Apply with Expert
            </Button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-gray-200 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === item.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            {/* Mobile CTA Buttons */}
            <div className="pt-3 space-y-2">
              <Button 
                variant="outline"
                className="w-full border-gray-300 hover:bg-gray-50 font-medium shadow-sm"
                onClick={() => handleNavigate('admin')}
              >
                <Shield className="w-4 h-4 mr-2" />
                Admin
              </Button>
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 font-semibold shadow-sm"
                onClick={() => handleNavigate('eligibility')}
              >
                Apply with Expert
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
