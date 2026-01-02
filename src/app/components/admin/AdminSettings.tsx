import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { 
  Settings, 
  Bell, 
  Shield, 
  Database, 
  Mail,
  Globe,
  Lock
} from 'lucide-react';

export function AdminSettings() {
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Platform Name
              </label>
              <Input defaultValue="FiClear" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Support Email
              </label>
              <Input type="email" defaultValue="support@ficlear.com" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Support Phone
              </label>
              <Input defaultValue="+91 1800-XXX-XXXX" />
            </div>

            <div className="flex justify-end">
              <Button>Save Changes</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-900">Notification Settings</h3>
          </div>

          <div className="space-y-4">
            <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <div>
                <div className="font-medium text-gray-900">Email Notifications</div>
                <div className="text-sm text-gray-500">Receive email alerts for new leads</div>
              </div>
              <input type="checkbox" className="w-5 h-5" defaultChecked />
            </label>

            <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <div>
                <div className="font-medium text-gray-900">System Updates</div>
                <div className="text-sm text-gray-500">Get notified about system changes</div>
              </div>
              <input type="checkbox" className="w-5 h-5" defaultChecked />
            </label>

            <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <div>
                <div className="font-medium text-gray-900">Policy Updates</div>
                <div className="text-sm text-gray-500">Alerts when policies are modified</div>
              </div>
              <input type="checkbox" className="w-5 h-5" />
            </label>
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Password
              </label>
              <Input type="password" placeholder="Enter current password" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <Input type="password" placeholder="Enter new password" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>
              <Input type="password" placeholder="Confirm new password" />
            </div>

            <div className="flex justify-end">
              <Button>Update Password</Button>
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
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <Database className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">Export Data</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Download all platform data as JSON or CSV
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Export as JSON</Button>
                    <Button variant="outline" size="sm">Export as CSV</Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start gap-3">
                <Database className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">Backup Database</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Create a backup of all data
                  </p>
                  <Button variant="outline" size="sm">Create Backup</Button>
                </div>
              </div>
            </div>

            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-red-600 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">Clear Cache</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Clear all cached data (this action cannot be undone)
                  </p>
                  <Button variant="outline" size="sm" className="text-red-600 border-red-300">
                    Clear Cache
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Email Configuration */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Mail className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-900">Email Configuration</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SMTP Host
              </label>
              <Input placeholder="smtp.example.com" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SMTP Port
                </label>
                <Input placeholder="587" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Encryption
                </label>
                <select className="w-full h-10 px-3 border border-gray-300 rounded-md">
                  <option>TLS</option>
                  <option>SSL</option>
                  <option>None</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SMTP Username
              </label>
              <Input placeholder="your-email@example.com" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SMTP Password
              </label>
              <Input type="password" placeholder="••••••••" />
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline">Test Connection</Button>
              <Button>Save Configuration</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
