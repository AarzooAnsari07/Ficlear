import { useState, useEffect } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { 
  Globe,
  Shield,
  Database,
  Upload,
  Download,
  Trash2,
  Eye,
  EyeOff,
  User,
  Mail,
  Phone,
  Palette,
  Image as ImageIcon,
  FileText,
  Save,
  AlertCircle,
  CheckCircle,
  Loader2
} from 'lucide-react';
import { settingsAPI } from '../../utils/database';

interface PlatformSettings {
  platformName: string;
  supportEmail: string;
  supportPhone: string;
  primaryColor: string;
  logoUrl: string;
  footerText: string;
  address: string;
}

export function AdminSettings() {
  // Platform Settings State
  const [platformSettings, setPlatformSettings] = useState<PlatformSettings>({
    platformName: 'FiClear',
    supportEmail: 'support@ficlear.com',
    supportPhone: '+91 1800-XXX-XXXX',
    primaryColor: '#2563eb',
    logoUrl: '',
    footerText: '© 2026 FiClear. All rights reserved.',
    address: '123 Finance Street, Mumbai, India'
  });
  
  // Security Settings State
  const [username, setUsername] = useState('admin@ficlear.com');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  
  // Loading and Status States
  const [isSavingPlatform, setIsSavingPlatform] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [platformMessage, setPlatformMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [securityMessage, setSecurityMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Load settings from database on mount
  useEffect(() => {
    loadPlatformSettings();
  }, []);

  const loadPlatformSettings = async () => {
    try {
      const response = await settingsAPI.get();
      if (response.success && response.data) {
        setPlatformSettings(response.data);
      }
    } catch (error) {
      console.error('Error loading platform settings:', error);
    }
  };

  const handleSavePlatformSettings = async () => {
    setIsSavingPlatform(true);
    setPlatformMessage(null);
    
    try {
      const response = await settingsAPI.update(platformSettings);
      
      if (response.success) {
        setPlatformMessage({ type: 'success', text: 'Platform settings saved successfully! Changes will reflect across the website.' });
        
        // Reload the page after 2 seconds to apply changes
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setPlatformMessage({ type: 'error', text: 'Failed to save settings. Please try again.' });
      }
    } catch (error) {
      console.error('Save settings error:', error);
      setPlatformMessage({ type: 'error', text: 'Failed to save settings. Please try again.' });
    } finally {
      setIsSavingPlatform(false);
    }
  };

  const handleUpdatePassword = async () => {
    setSecurityMessage(null);
    
    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      setSecurityMessage({ type: 'error', text: 'Please fill in all password fields' });
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setSecurityMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }
    
    if (newPassword.length < 8) {
      setSecurityMessage({ type: 'error', text: 'Password must be at least 8 characters long' });
      return;
    }
    
    setIsUpdatingPassword(true);
    
    try {
      // TODO: Implement actual password update with Supabase Auth
      // const { error } = await supabase.auth.updateUser({
      //   password: newPassword
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSecurityMessage({ type: 'success', text: 'Password updated successfully!' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setSecurityMessage(null), 3000);
    } catch (error) {
      setSecurityMessage({ type: 'error', text: 'Failed to update password. Please try again.' });
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const handleExportData = async (format: 'json' | 'csv') => {
    try {
      // TODO: Implement data export
      // const response = await fetch(`${API_BASE}/export/${format}`);
      // const blob = await response.blob();
      // const url = window.URL.createObjectURL(blob);
      // const a = document.createElement('a');
      // a.href = url;
      // a.download = `ficlear-data-${new Date().toISOString()}.${format}`;
      // a.click();
      
      alert(`Exporting data as ${format.toUpperCase()}...`);
    } catch (error) {
      console.error('Export error:', error);
      alert('Failed to export data');
    }
  };

  const handleImportData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,.csv';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        // TODO: Implement data import
        alert(`Importing data from ${file.name}...`);
      }
    };
    input.click();
  };

  const handleCreateBackup = async () => {
    try {
      // TODO: Implement backup creation
      alert('Creating database backup...');
    } catch (error) {
      console.error('Backup error:', error);
      alert('Failed to create backup');
    }
  };

  const handleClearCache = async () => {
    if (confirm('Are you sure you want to clear all cached data? This action cannot be undone.')) {
      try {
        // Clear local storage and cache
        localStorage.clear();
        sessionStorage.clear();
        
        if ('caches' in window) {
          const cacheNames = await caches.keys();
          await Promise.all(cacheNames.map(name => caches.delete(name)));
        }
        
        alert('Cache cleared successfully! The page will reload.');
        window.location.reload();
      } catch (error) {
        console.error('Clear cache error:', error);
        alert('Failed to clear cache');
      }
    }
  };

  const handleLogoUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        // TODO: Upload to storage and update settings
        const reader = new FileReader();
        reader.onload = (e) => {
          setPlatformSettings({ ...platformSettings, logoUrl: e.target?.result as string });
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <div className="space-y-6">
      {/* Platform Settings */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-900">Platform Settings</h3>
          </div>

          <div className="space-y-4">
            {/* Logo Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Platform Logo
              </label>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                  {platformSettings.logoUrl ? (
                    <img src={platformSettings.logoUrl} alt="Logo" className="w-full h-full object-contain rounded-lg" />
                  ) : (
                    <ImageIcon className="w-6 h-6 text-gray-400" />
                  )}
                </div>
                <Button variant="outline" size="sm" onClick={handleLogoUpload}>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Logo
                </Button>
              </div>
            </div>

            {/* Platform Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Platform Name
              </label>
              <Input 
                value={platformSettings.platformName}
                onChange={(e) => setPlatformSettings({ ...platformSettings, platformName: e.target.value })}
              />
            </div>

            {/* Primary Color */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Brand Color
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={platformSettings.primaryColor}
                  onChange={(e) => setPlatformSettings({ ...platformSettings, primaryColor: e.target.value })}
                  className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
                />
                <Input 
                  value={platformSettings.primaryColor}
                  onChange={(e) => setPlatformSettings({ ...platformSettings, primaryColor: e.target.value })}
                  className="flex-1"
                  placeholder="#2563eb"
                />
              </div>
            </div>

            {/* Support Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-1" />
                Support Email
              </label>
              <Input 
                type="email" 
                value={platformSettings.supportEmail}
                onChange={(e) => setPlatformSettings({ ...platformSettings, supportEmail: e.target.value })}
              />
            </div>

            {/* Support Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4 inline mr-1" />
                Support Phone
              </label>
              <Input 
                value={platformSettings.supportPhone}
                onChange={(e) => setPlatformSettings({ ...platformSettings, supportPhone: e.target.value })}
              />
            </div>

            {/* Footer Text */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FileText className="w-4 h-4 inline mr-1" />
                Footer Text
              </label>
              <Input 
                value={platformSettings.footerText}
                onChange={(e) => setPlatformSettings({ ...platformSettings, footerText: e.target.value })}
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Address
              </label>
              <textarea
                value={platformSettings.address}
                onChange={(e) => setPlatformSettings({ ...platformSettings, address: e.target.value })}
                className="w-full h-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Status Message */}
            {platformMessage && (
              <div className={`flex items-center gap-2 p-3 rounded-lg ${
                platformMessage.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
              }`}>
                {platformMessage.type === 'success' ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <AlertCircle className="w-5 h-5" />
                )}
                <span className="text-sm">{platformMessage.text}</span>
              </div>
            )}

            <div className="flex justify-end">
              <Button onClick={handleSavePlatformSettings} disabled={isSavingPlatform}>
                {isSavingPlatform ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-900">Security Settings</h3>
          </div>

          <div className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-1" />
                Admin Username
              </label>
              <Input 
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin@ficlear.com"
              />
            </div>

            <div className="border-t border-gray-200 my-4"></div>

            {/* Current Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Password
              </label>
              <div className="relative">
                <Input 
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password" 
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <Input 
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password" 
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>
              <Input 
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password" 
              />
            </div>

            {/* Password Requirements */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-xs text-blue-800 mb-1 font-medium">Password Requirements:</p>
              <ul className="text-xs text-blue-700 space-y-0.5 ml-4 list-disc">
                <li>At least 8 characters long</li>
                <li>Include uppercase and lowercase letters</li>
                <li>Include at least one number</li>
              </ul>
            </div>

            {/* Status Message */}
            {securityMessage && (
              <div className={`flex items-center gap-2 p-3 rounded-lg ${
                securityMessage.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
              }`}>
                {securityMessage.type === 'success' ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <AlertCircle className="w-5 h-5" />
                )}
                <span className="text-sm">{securityMessage.text}</span>
              </div>
            )}

            <div className="flex justify-end gap-3">
              <Button variant="outline">
                Forgot Password?
              </Button>
              <Button onClick={handleUpdatePassword} disabled={isUpdatingPassword}>
                {isUpdatingPassword ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  'Update Password'
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Database className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-900">Data Management</h3>
          </div>

          <div className="space-y-4">
            {/* Export Data */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <Download className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">Export Data</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Download all platform data (companies, PIN codes, banks, offers)
                  </p>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleExportData('json')}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export as JSON
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleExportData('csv')}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export as CSV
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Import Data */}
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-start gap-3">
                <Upload className="w-5 h-5 text-green-600 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">Import Data</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Upload data from JSON or CSV files
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleImportData}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Import Data
                  </Button>
                </div>
              </div>
            </div>

            {/* Create Backup */}
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start gap-3">
                <Database className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">Create Backup</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Create a complete backup of all database data
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleCreateBackup}
                  >
                    <Database className="w-4 h-4 mr-2" />
                    Create Backup
                  </Button>
                </div>
              </div>
            </div>

            {/* Clear Cache */}
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start gap-3">
                <Trash2 className="w-5 h-5 text-red-600 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">Clear Cache</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Clear all cached data including local storage (this action cannot be undone)
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-red-600 border-red-300 hover:bg-red-100"
                    onClick={handleClearCache}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear Cache
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}