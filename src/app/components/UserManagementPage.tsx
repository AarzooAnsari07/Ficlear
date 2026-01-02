import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Edit2, Trash2, Plus, Search, Users, Shield } from 'lucide-react';
import { AddEditUserDialog } from './AddEditUserDialog';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Manager' | 'Agent';
  status: 'Active' | 'Inactive';
  permissions: string[];
}

export function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Bilal Khan',
      email: 'bilal@financecrm.com',
      role: 'Admin',
      status: 'Active',
      permissions: ['all'],
    },
    {
      id: '2',
      name: 'Priya Verma',
      email: 'priya@financecrm.com',
      role: 'Agent',
      status: 'Active',
      permissions: ['view_leads', 'create_leads', 'edit_leads'],
    },
    {
      id: '3',
      name: 'Rahul Sharma',
      email: 'rahul@financecrm.com',
      role: 'Agent',
      status: 'Active',
      permissions: ['view_leads', 'create_leads', 'edit_leads'],
    },
    {
      id: '4',
      name: 'Sneha Patel',
      email: 'sneha@financecrm.com',
      role: 'Manager',
      status: 'Active',
      permissions: ['view_leads', 'create_leads', 'edit_leads', 'view_reports', 'export_data'],
    },
    {
      id: '5',
      name: 'Amit Kumar',
      email: 'amit@financecrm.com',
      role: 'Agent',
      status: 'Inactive',
      permissions: ['view_leads'],
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddUser = () => {
    setEditingUser(null);
    setIsDialogOpen(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsDialogOpen(true);
  };

  const handleRemoveUser = (userId: string) => {
    if (confirm('Are you sure you want to remove this user?')) {
      setUsers(users.filter((u) => u.id !== userId));
    }
  };

  const handleSaveUser = (userData: Omit<User, 'id'>) => {
    if (editingUser) {
      // Update existing user
      setUsers(users.map((u) => (u.id === editingUser.id ? { ...userData, id: u.id } : u)));
    } else {
      // Add new user
      const newUser: User = {
        ...userData,
        id: Date.now().toString(),
      };
      setUsers([...users, newUser]);
    }
    setIsDialogOpen(false);
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Admin':
        return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'Manager':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'Agent':
        return 'bg-gray-100 text-gray-700 border-gray-300';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    return status === 'Active'
      ? 'bg-green-100 text-green-700 border-green-300'
      : 'bg-red-100 text-red-700 border-red-300';
  };

  const roleStats = {
    admin: users.filter((u) => u.role === 'Admin').length,
    manager: users.filter((u) => u.role === 'Manager').length,
    agent: users.filter((u) => u.role === 'Agent').length,
    active: users.filter((u) => u.status === 'Active').length,
  };

  return (
    <div className="min-h-[calc(100vh-60px)] bg-gray-50 py-8">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">User & Role Management</h1>
            <p className="text-gray-600">Manage users, roles, and permissions</p>
          </div>
          <Button onClick={handleAddUser} className="gap-2">
            <Plus className="w-4 h-4" />
            Add User
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{users.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Users</p>
                  <p className="text-2xl font-bold text-green-600 mt-1">{roleStats.active}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Admins</p>
                  <p className="text-2xl font-bold text-purple-600 mt-1">{roleStats.admin}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Managers</p>
                  <p className="text-2xl font-bold text-blue-600 mt-1">{roleStats.manager}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Team Members Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>Manage your team members and their access levels</CardDescription>
              </div>
              <div className="relative w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Name</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Email</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Role</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4">
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getRoleBadgeColor(user.role)} variant="outline">
                          {user.role}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getStatusBadgeColor(user.status)} variant="outline">
                          {user.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditUser(user)}
                            className="gap-1"
                          >
                            <Edit2 className="w-4 h-4" />
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveUser(user.id)}
                            className="gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                            Remove
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredUsers.length === 0 && (
                <div className="text-center py-12">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No users found</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add/Edit User Dialog */}
      <AddEditUserDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSaveUser}
        user={editingUser}
      />
    </div>
  );
}
