import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Lead, LeadFormData } from '../types/lead';
import { searchLeads, createLead } from '../data/mockLeads';
import { Search, Plus, X, UserPlus, Calendar, Phone, CreditCard, Building, IndianRupee, MapPin } from 'lucide-react';

export function LeadsPage() {
  const [searchParams, setSearchParams] = useState({
    name: '',
    mobileNumber: '',
    panNumber: '',
  });
  const [searchResults, setSearchResults] = useState<Lead[] | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    dateOfBirth: '',
    mobileNumber: '',
    panNumber: '',
    companyName: '',
    netSalary: '',
    areaPincode: '',
  });

  const handleSearch = () => {
    const results = searchLeads(searchParams);
    setSearchResults(results);
    setShowCreateForm(false);
  };

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();

    const newLead = createLead({
      name: formData.name,
      dateOfBirth: formData.dateOfBirth,
      mobileNumber: formData.mobileNumber,
      panNumber: formData.panNumber.toUpperCase(),
      companyName: formData.companyName,
      netSalary: parseFloat(formData.netSalary),
      areaPincode: formData.areaPincode,
    });

    // Reset form and show success
    setFormData({
      name: '',
      dateOfBirth: '',
      mobileNumber: '',
      panNumber: '',
      companyName: '',
      netSalary: '',
      areaPincode: '',
    });
    setShowCreateForm(false);
    setSearchResults([newLead]);
  };

  const handleCancelCreate = () => {
    setShowCreateForm(false);
    setFormData({
      name: '',
      dateOfBirth: '',
      mobileNumber: '',
      panNumber: '',
      companyName: '',
      netSalary: '',
      areaPincode: '',
    });
  };

  const getStatusColor = (status: Lead['status']) => {
    switch (status) {
      case 'New':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'Contacted':
        return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'Qualified':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'In Progress':
        return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'Won':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'Lost':
        return 'bg-red-100 text-red-700 border-red-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <div className="min-h-[calc(100vh-60px)] bg-gray-50 py-12">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header Section */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Leads</h1>
            <p className="text-gray-600">Search and manage your leads</p>
          </div>
          <Button onClick={() => setShowCreateForm(true)} size="lg" className="gap-2">
            <Plus className="w-5 h-5" />
            Create Lead
          </Button>
        </div>

        {/* Search Section */}
        {!showCreateForm && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <Input
                    id="name"
                    placeholder="Enter name"
                    value={searchParams.name}
                    onChange={(e) => setSearchParams({ ...searchParams, name: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number
                  </label>
                  <Input
                    id="mobile"
                    placeholder="Enter mobile"
                    value={searchParams.mobileNumber}
                    onChange={(e) => setSearchParams({ ...searchParams, mobileNumber: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="pan" className="block text-sm font-medium text-gray-700 mb-2">
                    PAN Number
                  </label>
                  <Input
                    id="pan"
                    placeholder="Enter PAN"
                    value={searchParams.panNumber}
                    onChange={(e) =>
                      setSearchParams({ ...searchParams, panNumber: e.target.value.toUpperCase() })
                    }
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={handleSearch} size="lg" className="w-full gap-2">
                    <Search className="w-4 h-4" />
                    Search
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Create Lead Form */}
        {showCreateForm && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Create New Lead</h2>
                <Button variant="ghost" size="sm" onClick={handleCancelCreate}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <form onSubmit={handleCreateLead}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="form-name" className="block text-sm font-medium text-gray-700 mb-2">
                      Name of Prospect <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="form-name"
                        placeholder="Enter full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label htmlFor="form-dob" className="block text-sm font-medium text-gray-700 mb-2">
                      Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="form-dob"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                        required
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label htmlFor="form-mobile" className="block text-sm font-medium text-gray-700 mb-2">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="form-mobile"
                        placeholder="10-digit mobile number"
                        maxLength={10}
                        value={formData.mobileNumber}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          setFormData({ ...formData, mobileNumber: value });
                        }}
                        required
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* PAN Number */}
                  <div>
                    <label htmlFor="form-pan" className="block text-sm font-medium text-gray-700 mb-2">
                      PAN Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="form-pan"
                        placeholder="ABCDE1234F"
                        maxLength={10}
                        value={formData.panNumber}
                        onChange={(e) => setFormData({ ...formData, panNumber: e.target.value.toUpperCase() })}
                        required
                        className="pl-10 uppercase"
                      />
                    </div>
                  </div>

                  {/* Company Name */}
                  <div>
                    <label htmlFor="form-company" className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="form-company"
                        placeholder="Enter company name"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        required
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Net Salary */}
                  <div>
                    <label htmlFor="form-salary" className="block text-sm font-medium text-gray-700 mb-2">
                      Net Salary (per month) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="form-salary"
                        type="number"
                        placeholder="e.g., 75000"
                        value={formData.netSalary}
                        onChange={(e) => setFormData({ ...formData, netSalary: e.target.value })}
                        required
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Area PIN Code */}
                  <div>
                    <label htmlFor="form-pincode" className="block text-sm font-medium text-gray-700 mb-2">
                      Area PIN Code <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="form-pincode"
                        placeholder="6-digit PIN code"
                        maxLength={6}
                        value={formData.areaPincode}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          setFormData({ ...formData, areaPincode: value });
                        }}
                        required
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex items-center gap-3">
                  <Button type="submit" size="lg" className="gap-2">
                    <Plus className="w-4 h-4" />
                    Create Lead
                  </Button>
                  <Button type="button" variant="outline" size="lg" onClick={handleCancelCreate}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Search Results */}
        {searchResults !== null && !showCreateForm && (
          <>
            {searchResults.length > 0 ? (
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Mobile</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">PAN</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Company</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {searchResults.map((lead) => (
                          <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4">
                              <div>
                                <p className="font-medium text-gray-900">{lead.name}</p>
                                <p className="text-sm text-gray-500">ID: {lead.id}</p>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-gray-900">{lead.mobileNumber}</td>
                            <td className="px-6 py-4">
                              <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                                {lead.panNumber}
                              </code>
                            </td>
                            <td className="px-6 py-4">
                              <p className="text-gray-900">{lead.companyName}</p>
                              <p className="text-sm text-gray-500">₹{lead.netSalary.toLocaleString()}/mo</p>
                            </td>
                            <td className="px-6 py-4">
                              <Badge className={`${getStatusColor(lead.status)} font-medium border`}>
                                {lead.status}
                              </Badge>
                            </td>
                            <td className="px-6 py-4">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedLead(lead)}
                              >
                                Open Lead
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-dashed border-2">
                <CardContent className="p-12 text-center">
                  <div className="text-gray-400 mb-4">
                    <Search className="w-16 h-16 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No lead found</h3>
                  <p className="text-gray-600 mb-6">Create a new lead?</p>
                  <Button onClick={() => setShowCreateForm(true)} size="lg" className="gap-2">
                    <Plus className="w-5 h-5" />
                    Create Lead
                  </Button>
                </CardContent>
              </Card>
            )}
          </>
        )}

        {/* Lead Detail Modal/View (Optional - for when "Open Lead" is clicked) */}
        {selectedLead && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
            <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900">Lead Details</h2>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedLead(null)}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Lead ID</p>
                      <p className="font-medium text-gray-900">{selectedLead.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Status</p>
                      <Badge className={`${getStatusColor(selectedLead.status)} font-medium border mt-1`}>
                        {selectedLead.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Name</p>
                      <p className="font-medium text-gray-900">{selectedLead.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Date of Birth</p>
                      <p className="font-medium text-gray-900">{selectedLead.dateOfBirth}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Mobile Number</p>
                      <p className="font-medium text-gray-900">{selectedLead.mobileNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">PAN Number</p>
                      <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                        {selectedLead.panNumber}
                      </code>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Company Name</p>
                      <p className="font-medium text-gray-900">{selectedLead.companyName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Net Salary</p>
                      <p className="font-medium text-gray-900">
                        ₹{selectedLead.netSalary.toLocaleString()} /month
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Area PIN Code</p>
                    <p className="font-medium text-gray-900">{selectedLead.areaPincode}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Created At</p>
                      <p className="font-medium text-gray-900">
                        {new Date(selectedLead.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Updated At</p>
                      <p className="font-medium text-gray-900">
                        {new Date(selectedLead.updatedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <Button size="lg" className="flex-1">
                    Check Eligibility
                  </Button>
                  <Button variant="outline" size="lg" onClick={() => setSelectedLead(null)}>
                    Close
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}