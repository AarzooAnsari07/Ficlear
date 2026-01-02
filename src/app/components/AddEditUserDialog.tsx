import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import {
  Save,
  X,
  Shield,
  Eye,
  Plus,
  Edit,
  Trash2,
  Download,
  Settings,
  Users,
  BarChart3,
  FileText,
  CheckCircle2,
} from 'lucide-react';

interface User {
  name: string;
  email: string;
  role: 'Admin' | 'Manager' | 'Agent';
  status: 'Active' | 'Inactive';
  permissions: string[];
}

interface AddEditUserDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: User) => void;
  user: (User & { id: string }) | null;
}

interface Permission {
  id: string;
  label: string;
  description: string;
  icon: any;
  category: string;
}

const allPermissions: Permission[] = [
  // Lead Management
  {
    id: 'view_leads',
    label: 'View Leads',
    description: 'View all leads and their details',
    icon: Eye,
    category: 'Lead Management',
  },
  {
    id: 'create_leads',
    label: 'Create Leads',
    description: 'Add new leads to the system',
    icon: Plus,
    category: 'Lead Management',
  },
  {
    id: 'edit_leads',
    label: 'Edit Leads',
    description: 'Modify existing lead information',
    icon: Edit,
    category: 'Lead Management',
  },
  {
    id: 'delete_leads',
    label: 'Delete Leads',
    description: 'Remove leads from the system',
    icon: Trash2,
    category: 'Lead Management',
  },
  // Reports & Analytics
  {
    id: 'view_reports',
    label: 'View Reports',
    description: 'Access reports and analytics',
    icon: BarChart3,
    category: 'Reports & Analytics',
  },
  {
    id: 'export_data',
    label: 'Export Data',
    description: 'Download reports and lead data',
    icon: Download,
    category: 'Reports & Analytics',
  },
  {
    id: 'view_analytics',
    label: 'View Analytics',
    description: 'Access performance analytics and insights',
    icon: BarChart3,
    category: 'Reports & Analytics',
  },
  // Eligibility & Checker
  {
    id: 'run_eligibility',
    label: 'Run Eligibility Checks',
    description: 'Perform loan eligibility checks',
    icon: CheckCircle2,
    category: 'Eligibility & Checker',
  },
  {
    id: 'view_bank_offers',
    label: 'View Bank Offers',
    description: 'See available bank offers and ROI',
    icon: FileText,
    category: 'Eligibility & Checker',
  },
  // User Management
  {
    id: 'manage_users',
    label: 'Manage Users',
    description: 'Add, edit, and remove users',
    icon: Users,
    category: 'User Management',
  },
  {
    id: 'manage_roles',
    label: 'Manage Roles',
    description: 'Configure roles and permissions',
    icon: Shield,
    category: 'User Management',
  },
  // System Settings
  {
    id: 'configure_settings',
    label: 'Configure Settings',
    description: 'Modify system settings and configurations',
    icon: Settings,
    category: 'System Settings',
  },
  {
    id: 'manage_banks',
    label: 'Manage Banks',
    description: 'Configure bank rules and eligibility criteria',
    icon: Settings,
    category: 'System Settings',
  },
  {
    id: 'manage_company_master',
    label: 'Manage Company Master',
    description: 'Edit company categories and rules',
    icon: Settings,
    category: 'System Settings',
  },
];

const rolePresets: Record<string, string[]> = {
  Admin: ['all'],
  Manager: [
    'view_leads',
    'create_leads',
    'edit_leads',
    'view_reports',
    'export_data',
    'view_analytics',
    'run_eligibility',
    'view_bank_offers',
    'manage_users',
  ],
  Agent: ['view_leads', 'create_leads', 'edit_leads', 'run_eligibility', 'view_bank_offers'],
};

export function AddEditUserDialog({ isOpen, onClose, onSave, user }: AddEditUserDialogProps) {
  const [formData, setFormData] = useState<User>({
    name: '',
    email: '',
    role: 'Agent',
    status: 'Active',
    permissions: [],
  });

  const [selectedTab, setSelectedTab] = useState('basic');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        permissions: user.permissions,
      });
    } else {
      setFormData({
        name: '',
        email: '',
        role: 'Agent',
        status: 'Active',
        permissions: rolePresets.Agent,
      });
    }
  }, [user, isOpen]);

  const handleRoleChange = (role: 'Admin' | 'Manager' | 'Agent') => {
    setFormData({
      ...formData,
      role,
      permissions: rolePresets[role],
    });
  };

  const togglePermission = (permissionId: string) => {
    if (formData.permissions.includes('all')) {
      // If admin (all permissions), don't allow toggling
      return;
    }

    if (formData.permissions.includes(permissionId)) {
      setFormData({
        ...formData,
        permissions: formData.permissions.filter((p) => p !== permissionId),
      });
    } else {
      setFormData({
        ...formData,
        permissions: [...formData.permissions, permissionId],
      });
    }
  };

  const hasPermission = (permissionId: string) => {
    return formData.permissions.includes('all') || formData.permissions.includes(permissionId);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email) {
      alert('Please fill in all required fields');
      return;
    }
    onSave(formData);
    onClose();
  };

  const groupedPermissions = allPermissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {} as Record<string, Permission[]>);

  const isAdmin = formData.role === 'Admin';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>{user ? 'Edit User' : 'Add New User'}</DialogTitle>
        </DialogHeader>

        {/* Tabs */}
        <div className="flex border-b">
          <button
            onClick={() => setSelectedTab('basic')}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
              selectedTab === 'basic'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Basic Information
          </button>
          <button
            onClick={() => setSelectedTab('permissions')}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
              selectedTab === 'permissions'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Role & Permissions
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto py-4">
          {selectedTab === 'basic' && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <Label htmlFor="email">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="user@financecrm.com"
                />
              </div>

              <div>
                <Label htmlFor="role">Role</Label>
                <Select value={formData.role} onValueChange={handleRoleChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="Agent">Agent</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500 mt-1">
                  Selecting a role will automatically assign default permissions
                </p>
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: 'Active' | 'Inactive') =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Role Description */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900 mb-1">
                      {formData.role} Role
                    </p>
                    <p className="text-xs text-blue-700">
                      {formData.role === 'Admin' &&
                        'Full system access with all permissions including user and system management.'}
                      {formData.role === 'Manager' &&
                        'Can manage leads, view reports, and manage team members. Limited access to system settings.'}
                      {formData.role === 'Agent' &&
                        'Can create and manage leads, run eligibility checks. No access to reports or system settings.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'permissions' && (
            <div className="space-y-6">
              {/* Admin Notice */}
              {isAdmin && (
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-purple-600" />
                    <p className="text-sm font-medium text-purple-900">
                      Admin has all permissions by default
                    </p>
                  </div>
                </div>
              )}

              {/* Permission Groups */}
              {Object.entries(groupedPermissions).map(([category, permissions]) => (
                <div key={category}>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">{category}</h3>
                  <div className="space-y-3">
                    {permissions.map((permission) => {
                      const Icon = permission.icon;
                      const isChecked = hasPermission(permission.id);
                      return (
                        <div
                          key={permission.id}
                          className={`flex items-start justify-between p-3 rounded-lg border transition-colors ${
                            isChecked
                              ? 'bg-blue-50 border-blue-200'
                              : 'bg-white border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-start gap-3 flex-1">
                            <Icon
                              className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                                isChecked ? 'text-blue-600' : 'text-gray-400'
                              }`}
                            />
                            <div className="flex-1">
                              <p
                                className={`text-sm font-medium ${
                                  isChecked ? 'text-blue-900' : 'text-gray-900'
                                }`}
                              >
                                {permission.label}
                              </p>
                              <p
                                className={`text-xs mt-0.5 ${
                                  isChecked ? 'text-blue-700' : 'text-gray-600'
                                }`}
                              >
                                {permission.description}
                              </p>
                            </div>
                          </div>
                          <Switch
                            checked={isChecked}
                            onCheckedChange={() => togglePermission(permission.id)}
                            disabled={isAdmin}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <Separator className="mt-6" />
                </div>
              ))}

              {/* Permissions Summary */}
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <p className="text-sm font-medium text-gray-900 mb-2">Permissions Summary</p>
                <div className="flex flex-wrap gap-2">
                  {formData.permissions.includes('all') ? (
                    <Badge className="bg-purple-100 text-purple-700 border-purple-300">
                      All Permissions
                    </Badge>
                  ) : (
                    formData.permissions.map((permId) => {
                      const perm = allPermissions.find((p) => p.id === permId);
                      return (
                        perm && (
                          <Badge
                            key={permId}
                            variant="outline"
                            className="bg-blue-50 text-blue-700 border-blue-300"
                          >
                            {perm.label}
                          </Badge>
                        )
                      );
                    })
                  )}
                  {!formData.permissions.includes('all') &&
                    formData.permissions.length === 0 && (
                      <p className="text-sm text-gray-500">No permissions assigned</p>
                    )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            <Save className="w-4 h-4 mr-2" />
            {user ? 'Update User' : 'Add User'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
