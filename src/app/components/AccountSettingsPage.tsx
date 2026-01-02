import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Mail,
  Bell,
  Globe,
  Shield,
  Smartphone,
  Save,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Clock,
  Download,
} from 'lucide-react';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';

export function AccountSettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState({
    leadCreated: true,
    eligibilityCompleted: true,
    loanApproved: true,
    loanRejected: false,
    documentUploaded: false,
    followUpReminder: true,
    weeklyReport: true,
    monthlyReport: true,
  });

  const [preferences, setPreferences] = useState({
    language: 'en',
    timezone: 'Asia/Kolkata',
    dateFormat: 'DD/MM/YYYY',
    currency: 'INR',
  });

  return (
    <div className="min-h-[calc(100vh-60px)] bg-gray-50 py-8">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Settings</h1>
          <p className="text-gray-600">Manage your account preferences and notification settings</p>
        </div>

        <div className="space-y-6">
          {/* Email Preferences */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-600" />
                <div>
                  <CardTitle>Email Notifications</CardTitle>
                  <CardDescription>Choose which emails you want to receive</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-gray-900">New Lead Created</p>
                  <p className="text-xs text-gray-500">Get notified when a new lead is added</p>
                </div>
                <Switch
                  checked={emailNotifications.leadCreated}
                  onCheckedChange={(checked) =>
                    setEmailNotifications({ ...emailNotifications, leadCreated: checked })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-gray-900">Eligibility Check Completed</p>
                  <p className="text-xs text-gray-500">
                    Receive updates when eligibility checks finish
                  </p>
                </div>
                <Switch
                  checked={emailNotifications.eligibilityCompleted}
                  onCheckedChange={(checked) =>
                    setEmailNotifications({ ...emailNotifications, eligibilityCompleted: checked })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-gray-900">Loan Approved</p>
                  <p className="text-xs text-gray-500">Get notified of loan approvals</p>
                </div>
                <Switch
                  checked={emailNotifications.loanApproved}
                  onCheckedChange={(checked) =>
                    setEmailNotifications({ ...emailNotifications, loanApproved: checked })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-gray-900">Loan Rejected</p>
                  <p className="text-xs text-gray-500">Receive rejection notifications</p>
                </div>
                <Switch
                  checked={emailNotifications.loanRejected}
                  onCheckedChange={(checked) =>
                    setEmailNotifications({ ...emailNotifications, loanRejected: checked })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-gray-900">Document Uploaded</p>
                  <p className="text-xs text-gray-500">Get notified when documents are uploaded</p>
                </div>
                <Switch
                  checked={emailNotifications.documentUploaded}
                  onCheckedChange={(checked) =>
                    setEmailNotifications({ ...emailNotifications, documentUploaded: checked })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-gray-900">Follow-up Reminders</p>
                  <p className="text-xs text-gray-500">Receive reminders for pending follow-ups</p>
                </div>
                <Switch
                  checked={emailNotifications.followUpReminder}
                  onCheckedChange={(checked) =>
                    setEmailNotifications({ ...emailNotifications, followUpReminder: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Report Preferences */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-purple-600" />
                <div>
                  <CardTitle>Report Notifications</CardTitle>
                  <CardDescription>Configure periodic report delivery</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-gray-900">Weekly Performance Report</p>
                  <p className="text-xs text-gray-500">
                    Receive weekly summary every Monday at 9:00 AM
                  </p>
                </div>
                <Switch
                  checked={emailNotifications.weeklyReport}
                  onCheckedChange={(checked) =>
                    setEmailNotifications({ ...emailNotifications, weeklyReport: checked })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-gray-900">Monthly Analytics Report</p>
                  <p className="text-xs text-gray-500">
                    Comprehensive monthly report on the 1st of each month
                  </p>
                </div>
                <Switch
                  checked={emailNotifications.monthlyReport}
                  onCheckedChange={(checked) =>
                    setEmailNotifications({ ...emailNotifications, monthlyReport: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Regional Preferences */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-green-600" />
                <div>
                  <CardTitle>Regional Preferences</CardTitle>
                  <CardDescription>Set your language, timezone, and format preferences</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="language">Language</Label>
                  <Select
                    value={preferences.language}
                    onValueChange={(value) => setPreferences({ ...preferences, language: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="hi">हिन्दी (Hindi)</SelectItem>
                      <SelectItem value="mr">मराठी (Marathi)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    value={preferences.timezone}
                    onValueChange={(value) => setPreferences({ ...preferences, timezone: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Kolkata">Asia/Kolkata (IST)</SelectItem>
                      <SelectItem value="Asia/Dubai">Asia/Dubai (GST)</SelectItem>
                      <SelectItem value="Asia/Singapore">Asia/Singapore (SGT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dateFormat">Date Format</Label>
                  <Select
                    value={preferences.dateFormat}
                    onValueChange={(value) =>
                      setPreferences({ ...preferences, dateFormat: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={preferences.currency}
                    onValueChange={(value) => setPreferences({ ...preferences, currency: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="INR">INR - Indian Rupee (₹)</SelectItem>
                      <SelectItem value="USD">USD - US Dollar ($)</SelectItem>
                      <SelectItem value="EUR">EUR - Euro (€)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Two-Factor Authentication */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-orange-600" />
                <div>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                  <CardDescription>Add an extra layer of security to your account</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start justify-between p-4 border rounded-lg bg-yellow-50 border-yellow-200">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Two-factor authentication is not enabled
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      Protect your account with an additional security layer
                    </p>
                  </div>
                </div>
                <Button size="sm" className="gap-2">
                  <Smartphone className="w-4 h-4" />
                  Enable 2FA
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Connected Devices */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-blue-600" />
                <div>
                  <CardTitle>Connected Devices</CardTitle>
                  <CardDescription>Manage devices that have access to your account</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Chrome on Windows</p>
                    <p className="text-xs text-gray-600">Mumbai, India • Active now</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700">Current Device</Badge>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Safari on iPhone</p>
                    <p className="text-xs text-gray-600">Mumbai, India • 2 days ago</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="text-red-600">
                  Revoke
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Data & Privacy */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Download className="w-5 h-5 text-purple-600" />
                <div>
                  <CardTitle>Data & Privacy</CardTitle>
                  <CardDescription>Manage your data and privacy settings</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Download Your Data</p>
                  <p className="text-xs text-gray-500">
                    Export a copy of all your data from Finance CRM
                  </p>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Activity Log</p>
                  <p className="text-xs text-gray-500">View your complete activity history</p>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Clock className="w-4 h-4" />
                  View Log
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-red-200">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <div>
                  <CardTitle className="text-red-900">Danger Zone</CardTitle>
                  <CardDescription>Irreversible actions for your account</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-red-900">Deactivate Account</p>
                    <p className="text-xs text-red-700 mt-1">
                      Temporarily disable your account. You can reactivate it anytime.
                    </p>
                  </div>
                  <Button size="sm" variant="outline" className="border-red-300 text-red-700">
                    Deactivate
                  </Button>
                </div>
              </div>
              <div className="p-4 border border-red-300 rounded-lg bg-red-50">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-red-900">Delete Account</p>
                    <p className="text-xs text-red-700 mt-1">
                      Permanently delete your account and all associated data. This action cannot be
                      undone.
                    </p>
                  </div>
                  <Button size="sm" variant="destructive" className="gap-2">
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end gap-3">
            <Button variant="outline">Reset Changes</Button>
            <Button className="gap-2">
              <Save className="w-4 h-4" />
              Save Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
