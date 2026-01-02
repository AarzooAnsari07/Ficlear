import { Button } from './ui/button';
import { Shield } from 'lucide-react';
import logoImage from 'figma:asset/128b4dd009b8c9870ce3a0263df571a5292a2196.png';

interface TopNavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function TopNavigation({ currentPage, onNavigate }: TopNavigationProps) {
  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'offers', label: 'Live Offers' },
    { id: 'policy', label: 'Policy Details' },
    { id: 'company', label: 'Company Checker' },
    { id: 'pincode', label: 'PIN Code Checker' },
    { id: 'eligibility', label: 'Loan Eligibility' },
  ];

  return (
    <nav className="border-b bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
              <img src={logoImage} alt="FiClear" className="h-8 sm:h-10" />
            </div>

            {/* Menu Items - Desktop */}
            <div className="hidden lg:flex items-center gap-1">
              {menuItems.map((item) => (
                <button
                  key={item.id + item.label}
                  onClick={() => onNavigate(item.id)}
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

          {/* CTA Button */}
          <div className="flex items-center gap-3">
            <Button 
              variant="outline"
              className="border-gray-300 hover:bg-gray-50 font-medium shadow-sm"
              onClick={() => onNavigate('admin')}
            >
              <Shield className="w-4 h-4 mr-2" />
              Admin
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 font-semibold shadow-sm"
              onClick={() => onNavigate('eligibility')}
            >
              Apply with Expert
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}