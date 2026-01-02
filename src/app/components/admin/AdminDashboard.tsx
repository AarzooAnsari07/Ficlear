import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { 
  LayoutDashboard, 
  Building2, 
  MapPin, 
  Tag, 
  FileText, 
  Settings, 
  LogOut,
  Users,
  TrendingUp,
  Database,
  Landmark
} from 'lucide-react';
import { CompanyManagement } from './CompanyManagement';
import { PinCodeManagement } from './PinCodeManagement';
import { OffersManagement } from './OffersManagement';
import { PolicyManagement } from './PolicyManagement';
import { AdminSettings } from './AdminSettings';
import { BanksManagement } from './BanksManagement';

interface AdminDashboardProps {
  onLogout: () => void;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'companies' | 'pincodes' | 'banks' | 'offers' | 'policy' | 'settings'>('overview');

  const stats = [
    { label: 'Total Companies', value: '24', icon: Building2, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Total PIN Codes', value: '150+', icon: MapPin, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Active Offers', value: '8', icon: Tag, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Total Banks', value: '8', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Database className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-gray-900">FiClear</h1>
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'overview'
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium">Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('companies')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'companies'
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Building2 className="w-5 h-5" />
            <span className="font-medium">Companies</span>
          </button>

          <button
            onClick={() => setActiveTab('pincodes')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'pincodes'
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <MapPin className="w-5 h-5" />
            <span className="font-medium">PIN Codes</span>
          </button>

          <button
            onClick={() => setActiveTab('banks')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'banks'
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Landmark className="w-5 h-5" />
            <span className="font-medium">Banks</span>
          </button>

          <button
            onClick={() => setActiveTab('offers')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'offers'
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Tag className="w-5 h-5" />
            <span className="font-medium">Live Offers</span>
          </button>

          <button
            onClick={() => setActiveTab('policy')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'policy'
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <FileText className="w-5 h-5" />
            <span className="font-medium">Policy Details</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'settings'
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span className="font-medium">Settings</span>
          </button>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <Button
            onClick={onLogout}
            variant="outline"
            className="w-full justify-start"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {activeTab === 'overview' && 'Dashboard Overview'}
              {activeTab === 'companies' && 'Company Management'}
              {activeTab === 'pincodes' && 'PIN Code Management'}
              {activeTab === 'banks' && 'Banks Management'}
              {activeTab === 'offers' && 'Live Offers Management'}
              {activeTab === 'policy' && 'Policy Details Management'}
              {activeTab === 'settings' && 'Settings'}
            </h2>
            <p className="text-gray-600">
              {activeTab === 'overview' && 'Monitor and manage your FiClear platform'}
              {activeTab === 'companies' && 'Add, edit, and manage company listings'}
              {activeTab === 'pincodes' && 'Manage PIN code categories and classifications'}
              {activeTab === 'banks' && 'Add, edit, and manage bank listings'}
              {activeTab === 'offers' && 'Update bank offers and promotions'}
              {activeTab === 'policy' && 'Manage policy documents and details'}
              {activeTab === 'settings' && 'Configure platform settings'}
            </p>
          </div>

          {/* Content */}
          {activeTab === 'overview' && (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-4 gap-6 mb-8">
                {stats.map((stat) => (
                  <Card key={stat.label}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                        <div className={`${stat.bg} w-12 h-12 rounded-lg flex items-center justify-center`}>
                          <stat.icon className={`w-6 h-6 ${stat.color}`} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Quick Actions */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      onClick={() => setActiveTab('companies')}
                      variant="outline"
                      className="justify-start h-auto py-4"
                    >
                      <Building2 className="w-5 h-5 mr-3" />
                      <div className="text-left">
                        <div className="font-medium">Manage Companies</div>
                        <div className="text-xs text-gray-500">Add or edit company data</div>
                      </div>
                    </Button>

                    <Button
                      onClick={() => setActiveTab('pincodes')}
                      variant="outline"
                      className="justify-start h-auto py-4"
                    >
                      <MapPin className="w-5 h-5 mr-3" />
                      <div className="text-left">
                        <div className="font-medium">Manage PIN Codes</div>
                        <div className="text-xs text-gray-500">Update PIN code categories</div>
                      </div>
                    </Button>

                    <Button
                      onClick={() => setActiveTab('banks')}
                      variant="outline"
                      className="justify-start h-auto py-4"
                    >
                      <Landmark className="w-5 h-5 mr-3" />
                      <div className="text-left">
                        <div className="font-medium">Manage Banks</div>
                        <div className="text-xs text-gray-500">Add or edit bank data</div>
                      </div>
                    </Button>

                    <Button
                      onClick={() => setActiveTab('offers')}
                      variant="outline"
                      className="justify-start h-auto py-4"
                    >
                      <Tag className="w-5 h-5 mr-3" />
                      <div className="text-left">
                        <div className="font-medium">Update Offers</div>
                        <div className="text-xs text-gray-500">Manage bank offers</div>
                      </div>
                    </Button>

                    <Button
                      onClick={() => setActiveTab('policy')}
                      variant="outline"
                      className="justify-start h-auto py-4"
                    >
                      <FileText className="w-5 h-5 mr-3" />
                      <div className="text-left">
                        <div className="font-medium">Edit Policies</div>
                        <div className="text-xs text-gray-500">Update policy details</div>
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === 'companies' && <CompanyManagement />}
          {activeTab === 'pincodes' && <PinCodeManagement />}
          {activeTab === 'banks' && <BanksManagement />}
          {activeTab === 'offers' && <OffersManagement />}
          {activeTab === 'policy' && <PolicyManagement />}
          {activeTab === 'settings' && <AdminSettings />}
        </div>
      </div>
    </div>
  );
}