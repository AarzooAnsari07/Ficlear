import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { settingsAPI } from '../utils/database';

interface PlatformSettings {
  platformName: string;
  supportEmail: string;
  supportPhone: string;
  primaryColor: string;
  logoUrl: string;
  footerText: string;
  address: string;
}

const defaultSettings: PlatformSettings = {
  platformName: 'FiClear',
  supportEmail: 'support@ficlear.com',
  supportPhone: '+91 1800-XXX-XXXX',
  primaryColor: '#2563eb',
  logoUrl: '',
  footerText: '© 2026 FiClear. All rights reserved.',
  address: '123 Finance Street, Mumbai, India'
};

interface SettingsContextType {
  settings: PlatformSettings;
  isLoading: boolean;
  refreshSettings: () => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<PlatformSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);

  const refreshSettings = async () => {
    try {
      const response = await settingsAPI.get();
      if (response.success && response.data) {
        setSettings(response.data);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, isLoading, refreshSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
