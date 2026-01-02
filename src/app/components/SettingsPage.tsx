import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Building2,
  Users,
  Building,
  MapPin,
  Bell,
  Shield,
  Plug,
  Settings as SettingsIcon,
  Upload,
  Eye,
  Edit,
  Trash2,
  Plus,
  CheckCircle2,
  XCircle,
  Save,
  Clock,
  Mail,
  Phone,
  MessageSquare,
  Download,
  AlertCircle,
  ExternalLink,
  FileText,
} from 'lucide-react';
import { Separator } from './ui/separator';
import { Textarea } from './ui/textarea';

interface SettingsSection {
  id: string;
  label: string;
  icon: any;
}

const settingsSections: SettingsSection[] = [
  { id: 'organization', label: 'Organization & Branding', icon: Building2 },
  { id: 'users', label: 'User & Role Management', icon: Users },
  { id: 'banks', label: 'Bank & Eligibility Rules', icon: Building },
  { id: 'company', label: 'Company Master Settings', icon: Building },
  { id: 'pincode', label: 'PIN Code Rules', icon: MapPin },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'integrations', label: 'Integrations', icon: Plug },
  { id: 'preferences', label: 'System Preferences', icon: SettingsIcon },
];

interface SettingsPageProps {
  onNavigate?: (page: string) => void;
}

export function SettingsPage({ onNavigate }: SettingsPageProps) {
  const [activeSection, setActiveSection] = useState('organization');
  const [orgName, setOrgName] = useState('Finance CRM');
  const [appTitle, setAppTitle] = useState('Finance CRM');
  const [primaryColor, setPrimaryColor] = useState('#3b82f6');
  const [secondaryColor, setSecondaryColor] = useState('#8b5cf6');

  // Mock data for users
  const users = [
    { id: 1, name: 'Bilal Khan', email: 'bilal@financecrm.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Priya Verma', email: 'priya@financecrm.com', role: 'Agent', status: 'Active' },
    { id: 3, name: 'Rahul Sharma', email: 'rahul@financecrm.com', role: 'Agent', status: 'Active' },
    {
      id: 4,
      name: 'Sneha Patel',
      email: 'sneha@financecrm.com',
      role: 'Manager',
      status: 'Active',
    },
    {
      id: 5,
      name: 'Amit Kumar',
      email: 'amit@financecrm.com',
      role: 'Agent',
      status: 'Inactive',
    },
  ];

  // Mock data for banks
  const banks = [
    {
      id: 1,
      name: 'HDFC Bank',
      enabled: true,
      minCIBIL: 700,
      maxFOIR: 50,
      minSalary: 25000,
      loanTypes: ['Personal', 'Home', 'Business'],
    },
    {
      id: 2,
      name: 'ICICI Bank',
      enabled: true,
      minCIBIL: 680,
      maxFOIR: 55,
      minSalary: 20000,
      loanTypes: ['Personal', 'Home'],
    },
    {
      id: 3,
      name: 'SBI',
      enabled: true,
      minCIBIL: 650,
      maxFOIR: 60,
      minSalary: 18000,
      loanTypes: ['Personal', 'Home', 'Business'],
    },
    {
      id: 4,
      name: 'Axis Bank',
      enabled: false,
      minCIBIL: 700,
      maxFOIR: 50,
      minSalary: 25000,
      loanTypes: ['Personal'],
    },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'organization':
        return <OrganizationBrandingSection />;
      case 'users':
        return <UserManagementSection users={users} onNavigate={onNavigate} />;
      case 'banks':
        return <BankEligibilitySection banks={banks} />;
      case 'company':
        return <CompanyMasterSection />;
      case 'pincode':
        return <PINCodeSection />;
      case 'notifications':
        return <NotificationsSection />;
      case 'security':
        return <SecuritySection />;
      case 'integrations':
        return <IntegrationsSection />;
      case 'preferences':
        return <SystemPreferencesSection />;
      default:
        return <OrganizationBrandingSection />;
    }
  };

  return (
    <div className="min-h-[calc(100vh-60px)] bg-gray-50">
      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-64 bg-white border-r min-h-[calc(100vh-60px)] p-4">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-1">Settings</h2>
            <p className="text-sm text-gray-600">Manage your CRM configuration</p>
          </div>
          <nav className="space-y-1">
            {settingsSections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeSection === section.id
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {section.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 overflow-y-auto">{renderSection()}</div>
      </div>
    </div>
  );
}

function OrganizationBrandingSection() {
  const [orgName, setOrgName] = useState('Finance CRM');
  const [appTitle, setAppTitle] = useState('Finance CRM');
  const [primaryColor, setPrimaryColor] = useState('#3b82f6');
  const [secondaryColor, setSecondaryColor] = useState('#8b5cf6');

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Organization & Branding</h1>
        <p className="text-gray-600">Customize your CRM branding and appearance</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Configure your organization details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="orgName">Organization Name</Label>
            <Input
              id="orgName"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              placeholder="Enter organization name"
            />
          </div>
          <div>
            <Label htmlFor="appTitle">App Title</Label>
            <Input
              id="appTitle"
              value={appTitle}
              onChange={(e) => setAppTitle(e.target.value)}
              placeholder="Enter app title"
            />
            <p className="text-xs text-gray-500 mt-1">
              This will appear in the browser tab and header
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Logo Upload</CardTitle>
          <CardDescription>Upload your organization logo</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
              <Upload className="w-8 h-8 text-gray-400" />
            </div>
            <div>
              <Button className="gap-2">
                <Upload className="w-4 h-4" />
                Upload Logo
              </Button>
              <p className="text-xs text-gray-500 mt-2">
                Recommended size: 200x60px, PNG or SVG format
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Brand Colors</CardTitle>
          <CardDescription>Customize your application color scheme</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="primaryColor">Primary Color</Label>
              <div className="flex gap-2">
                <Input
                  id="primaryColor"
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-20 h-10"
                />
                <Input value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} />
              </div>
            </div>
            <div>
              <Label htmlFor="secondaryColor">Secondary Color</Label>
              <div className="flex gap-2">
                <Input
                  id="secondaryColor"
                  type="color"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="w-20 h-10"
                />
                <Input
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Live Preview</CardTitle>
          <CardDescription>See how your header will look</CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className="h-16 rounded-lg flex items-center justify-between px-6"
            style={{ backgroundColor: primaryColor }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
                <Building2 className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
              <span className="text-white font-semibold">{appTitle}</span>
            </div>
            <div className="flex items-center gap-4">
              <Button
                size="sm"
                style={{ backgroundColor: secondaryColor }}
                className="text-white"
              >
                Sample Button
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button variant="outline">Reset</Button>
        <Button className="gap-2">
          <Save className="w-4 h-4" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}

function UserManagementSection({ users, onNavigate }: { users: any[]; onNavigate?: (page: string) => void }) {
  return (
    <div className="max-w-6xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">User & Role Management</h1>
          <p className="text-gray-600">Manage users, roles, and permissions</p>
        </div>
        <Button className="gap-2" onClick={() => onNavigate?.('user-management')}>
          <ExternalLink className="w-4 h-4" />
          Open Full Management
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>Manage your team members and their access levels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Role</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{user.name}</td>
                    <td className="px-6 py-4 text-gray-600">{user.email}</td>
                    <td className="px-6 py-4">
                      <Badge
                        className={
                          user.role === 'Admin'
                            ? 'bg-purple-100 text-purple-700 border-purple-300'
                            : user.role === 'Manager'
                            ? 'bg-blue-100 text-blue-700 border-blue-300'
                            : 'bg-gray-100 text-gray-700 border-gray-300'
                        }
                      >
                        {user.role}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        className={
                          user.status === 'Active'
                            ? 'bg-green-100 text-green-700 border-green-300'
                            : 'bg-red-100 text-red-700 border-red-300'
                        }
                      >
                        {user.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="gap-1" onClick={() => onNavigate?.('user-edit')}>
                          <Edit className="w-3 h-3" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" className="gap-1 text-red-600">
                          <Trash2 className="w-3 h-3" />
                          Remove
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Role Permissions</CardTitle>
          <CardDescription>Configure permissions for each role</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {['Admin', 'Manager', 'Agent'].map((role) => (
              <div key={role} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">{role}</h3>
                  <Button size="sm" variant="outline">
                    Edit Permissions
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    'View Dashboard',
                    'Manage Leads',
                    'Check Eligibility',
                    'View Reports',
                    'Manage Settings',
                    'Export Data',
                  ].map((permission) => (
                    <div key={permission} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-600">{permission}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function BankEligibilitySection({ banks }: { banks: any[] }) {
  return (
    <div className="max-w-6xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Bank & Eligibility Rules</h1>
          <p className="text-gray-600">Configure bank-specific eligibility criteria</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Bank
        </Button>
      </div>

      {banks.map((bank) => (
        <Card key={bank.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CardTitle>{bank.name}</CardTitle>
                <Switch checked={bank.enabled} />
                <Badge className={bank.enabled ? 'bg-green-100 text-green-700' : 'bg-gray-100'}>
                  {bank.enabled ? 'Enabled' : 'Disabled'}
                </Badge>
              </div>
              <Button size="sm" variant="outline">
                Edit Rules
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-6">
              <div>
                <Label className="text-xs text-gray-600">Minimum CIBIL Score</Label>
                <p className="text-lg font-semibold text-gray-900">{bank.minCIBIL}</p>
              </div>
              <div>
                <Label className="text-xs text-gray-600">Maximum FOIR (%)</Label>
                <p className="text-lg font-semibold text-gray-900">{bank.maxFOIR}%</p>
              </div>
              <div>
                <Label className="text-xs text-gray-600">Minimum Salary</Label>
                <p className="text-lg font-semibold text-gray-900">₹{bank.minSalary}</p>
              </div>
              <div>
                <Label className="text-xs text-gray-600">Loan Types</Label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {bank.loanTypes.map((type: string) => (
                    <Badge key={type} variant="outline" className="text-xs">
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function CompanyMasterSection() {
  return (
    <div className="max-w-6xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Company Master Settings</h1>
        <p className="text-gray-600">Manage company list and bank-wise categorization</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload Company List</CardTitle>
          <CardDescription>
            Upload Excel file with company names for eligibility check
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-sm text-gray-600 mb-2">
              Drag and drop your Excel file here, or click to browse
            </p>
            <Button className="gap-2">
              <Upload className="w-4 h-4" />
              Upload Excel File
            </Button>
            <p className="text-xs text-gray-500 mt-2">Supported format: .xlsx, .xls (Max 5MB)</p>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Download Sample Template
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Company Categories</CardTitle>
              <CardDescription>Manage bank-wise company categorization (A/B/C)</CardDescription>
            </div>
            <Button size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              Add Company
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Company Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    HDFC
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    ICICI
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">SBI</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Axis
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  { name: 'Infosys', hdfc: 'A', icici: 'A', sbi: 'A', axis: 'A' },
                  { name: 'TCS', hdfc: 'A', icici: 'A', sbi: 'A', axis: 'A' },
                  { name: 'Wipro', hdfc: 'B', icici: 'B', sbi: 'A', axis: 'B' },
                  { name: 'Tech Mahindra', hdfc: 'B', icici: 'B', sbi: 'B', axis: 'B' },
                ].map((company, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{company.name}</td>
                    <td className="px-6 py-4">
                      <Badge className="bg-green-100 text-green-700">{company.hdfc}</Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className="bg-green-100 text-green-700">{company.icici}</Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className="bg-green-100 text-green-700">{company.sbi}</Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className="bg-green-100 text-green-700">{company.axis}</Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pending Verification Queue</CardTitle>
          <CardDescription>Companies awaiting verification and categorization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              'ABC Technologies Pvt Ltd',
              'XYZ Consulting Services',
              'Global IT Solutions',
            ].map((company, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 border rounded-lg hover:border-blue-300 hover:bg-blue-50/50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                  <span className="font-medium text-gray-900">{company}</span>
                  <Badge className="bg-yellow-100 text-yellow-700">Pending</Badge>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="gap-1">
                    <Eye className="w-3 h-3" />
                    Review
                  </Button>
                  <Button size="sm" className="gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Approve
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function PINCodeSection() {
  return (
    <div className="max-w-6xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">PIN Code Rules</h1>
        <p className="text-gray-600">Manage PIN code serviceability for bank eligibility</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload PIN Code Data</CardTitle>
          <CardDescription>Upload Excel file with PIN code and serviceability info</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-sm text-gray-600 mb-2">
              Upload PIN code master data with bank-wise area types
            </p>
            <Button className="gap-2">
              <Upload className="w-4 h-4" />
              Upload PIN Code File
            </Button>
            <p className="text-xs text-gray-500 mt-2">Excel format with columns: PIN, Bank, Area Type, Remarks</p>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Download Sample Template
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>PIN Code Serviceability</CardTitle>
              <CardDescription>View and manage PIN code coverage</CardDescription>
            </div>
            <div className="flex gap-2">
              <Input placeholder="Search PIN code..." className="w-48" />
              <Button size="sm">Search</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    PIN Code
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Bank</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Area Type
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Remarks
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  {
                    pin: '400001',
                    bank: 'HDFC',
                    areaType: 'Metro',
                    status: 'Serviceable',
                    remarks: 'Full service',
                  },
                  {
                    pin: '400001',
                    bank: 'ICICI',
                    areaType: 'Metro',
                    status: 'Serviceable',
                    remarks: 'Full service',
                  },
                  {
                    pin: '560001',
                    bank: 'SBI',
                    areaType: 'Tier-1',
                    status: 'Serviceable',
                    remarks: 'Selected products',
                  },
                  {
                    pin: '110001',
                    bank: 'Axis',
                    areaType: 'Metro',
                    status: 'Not Serviceable',
                    remarks: 'Under review',
                  },
                ].map((entry, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-mono font-medium text-gray-900">{entry.pin}</td>
                    <td className="px-6 py-4 text-gray-900">{entry.bank}</td>
                    <td className="px-6 py-4">
                      <Badge variant="outline">{entry.areaType}</Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        className={
                          entry.status === 'Serviceable'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }
                      >
                        {entry.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{entry.remarks}</td>
                    <td className="px-6 py-4">
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function NotificationsSection() {
  const notifications = [
    { id: 1, label: 'New Lead Created', email: true, inApp: true },
    { id: 2, label: 'Eligibility Check Completed', email: true, inApp: true },
    { id: 3, label: 'Loan Approved', email: true, inApp: true },
    { id: 4, label: 'Loan Rejected', email: false, inApp: true },
    { id: 5, label: 'Document Uploaded', email: false, inApp: true },
    { id: 6, label: 'Follow-up Reminder', email: true, inApp: true },
  ];

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Notifications</h1>
        <p className="text-gray-600">Configure notification preferences</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Email Notifications</CardTitle>
          <CardDescription>Choose which events trigger email notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notif) => (
              <div key={notif.id} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-900">{notif.label}</span>
                </div>
                <Switch checked={notif.email} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>In-App Notifications</CardTitle>
          <CardDescription>Configure in-app notification alerts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notif) => (
              <div key={notif.id} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <Bell className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-900">{notif.label}</span>
                </div>
                <Switch checked={notif.inApp} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button className="gap-2">
          <Save className="w-4 h-4" />
          Save Notification Settings
        </Button>
      </div>
    </div>
  );
}

function SecuritySection() {
  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Security</h1>
        <p className="text-gray-600">Manage security settings and access controls</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Update your account password</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input id="currentPassword" type="password" />
          </div>
          <div>
            <Label htmlFor="newPassword">New Password</Label>
            <Input id="newPassword" type="password" />
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input id="confirmPassword" type="password" />
          </div>
          <Button className="gap-2">
            <Shield className="w-4 h-4" />
            Update Password
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Session Management</CardTitle>
          <CardDescription>Configure session timeout and security policies</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="30 minutes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="60">60 minutes</SelectItem>
                <SelectItem value="120">120 minutes</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium text-gray-900">
                Require password change every 90 days
              </p>
              <p className="text-xs text-gray-500">Enforce regular password updates</p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium text-gray-900">Two-factor authentication</p>
              <p className="text-xs text-gray-500">Enable 2FA for enhanced security</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Login Activity</CardTitle>
          <CardDescription>Recent login history and active sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                device: 'Chrome on Windows',
                location: 'Mumbai, India',
                time: '2 hours ago',
                current: true,
              },
              {
                device: 'Safari on iPhone',
                location: 'Mumbai, India',
                time: '1 day ago',
                current: false,
              },
              {
                device: 'Chrome on MacOS',
                location: 'Delhi, India',
                time: '3 days ago',
                current: false,
              },
            ].map((session, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {session.device}
                      {session.current && (
                        <Badge className="ml-2 bg-green-100 text-green-700">Current</Badge>
                      )}
                    </p>
                    <p className="text-xs text-gray-600">
                      {session.location} • {session.time}
                    </p>
                  </div>
                </div>
                {!session.current && (
                  <Button size="sm" variant="outline" className="text-red-600">
                    Revoke
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function IntegrationsSection() {
  const integrations = [
    {
      name: 'CIBIL API',
      description: 'Real-time credit score verification',
      icon: FileText,
      status: 'Connected',
      color: 'blue',
    },
    {
      name: 'SMS Gateway',
      description: 'Send SMS notifications to customers',
      icon: MessageSquare,
      status: 'Connected',
      color: 'green',
    },
    {
      name: 'WhatsApp Business',
      description: 'WhatsApp messaging integration',
      icon: Phone,
      status: 'Coming Soon',
      color: 'gray',
    },
    {
      name: 'Email Service',
      description: 'Automated email notifications',
      icon: Mail,
      status: 'Coming Soon',
      color: 'gray',
    },
  ];

  return (
    <div className="max-w-6xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Integrations</h1>
        <p className="text-gray-600">Connect third-party services and APIs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {integrations.map((integration, idx) => {
          const Icon = integration.icon;
          return (
            <Card key={idx}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 bg-${integration.color}-100 rounded-lg flex items-center justify-center`}
                  >
                    <Icon className={`w-6 h-6 text-${integration.color}-600`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{integration.name}</h3>
                      <Badge
                        className={
                          integration.status === 'Connected'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }
                      >
                        {integration.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{integration.description}</p>
                    {integration.status === 'Connected' ? (
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Configure
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600">
                          Disconnect
                        </Button>
                      </div>
                    ) : (
                      <Button size="sm" disabled>
                        Coming Soon
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function SystemPreferencesSection() {
  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">System Preferences</h1>
        <p className="text-gray-600">Configure system-wide settings and defaults</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Regional Settings</CardTitle>
          <CardDescription>Configure currency, date format, and timezone</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="currency">Currency</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="INR - Indian Rupee" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="inr">INR - Indian Rupee (₹)</SelectItem>
                <SelectItem value="usd">USD - US Dollar ($)</SelectItem>
                <SelectItem value="eur">EUR - Euro (€)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="dateFormat">Date Format</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="DD/MM/YYYY" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ddmmyyyy">DD/MM/YYYY</SelectItem>
                <SelectItem value="mmddyyyy">MM/DD/YYYY</SelectItem>
                <SelectItem value="yyyymmdd">YYYY-MM-DD</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="timezone">Timezone</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Asia/Kolkata (IST)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kolkata">Asia/Kolkata (IST)</SelectItem>
                <SelectItem value="dubai">Asia/Dubai (GST)</SelectItem>
                <SelectItem value="singapore">Asia/Singapore (SGT)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Default Filters</CardTitle>
          <CardDescription>Set default filter values for reports and dashboards</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="defaultDateRange">Default Date Range</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Last 30 days" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
                <SelectItem value="365">Last 12 months</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="defaultView">Default Dashboard View</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Overview" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="overview">Overview</SelectItem>
                <SelectItem value="performance">Performance</SelectItem>
                <SelectItem value="leads">Leads</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Display Settings</CardTitle>
          <CardDescription>Customize display preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium text-gray-900">Compact Mode</p>
              <p className="text-xs text-gray-500">Use dense spacing for tables and lists</p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium text-gray-900">Show tooltips</p>
              <p className="text-xs text-gray-500">Display helpful tips on hover</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium text-gray-900">Enable animations</p>
              <p className="text-xs text-gray-500">Smooth transitions and effects</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button variant="outline">Reset to Defaults</Button>
        <Button className="gap-2">
          <Save className="w-4 h-4" />
          Save Preferences
        </Button>
      </div>
    </div>
  );
}