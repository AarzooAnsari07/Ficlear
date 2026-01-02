import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Plus, Search, Edit, Trash2, Building2, Download, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { companies } from '../../data/companies';
import { fetchCompanyByCIN, getSampleCINs } from '../../services/companyApi';

interface CompanyFormData {
  companyName: string;
  cin: string;
  industry: string;
  incorporationDate: string;
  companyType: string;
  companyStatus: string;
  employeeSize: string;
  riskTag: string;
}

export function CompanyManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [isLoadingCIN, setIsLoadingCIN] = useState(false);
  const [cinFetchStatus, setCinFetchStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [cinError, setCinError] = useState('');
  const [formData, setFormData] = useState<CompanyFormData>({
    companyName: '',
    cin: '',
    industry: '',
    incorporationDate: '',
    companyType: 'Private',
    companyStatus: 'Active',
    employeeSize: 'Micro',
    riskTag: 'Low',
  });

  const filteredCompanies = companies.filter((company) =>
    company.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCINFetch = async () => {
    if (!formData.cin.trim()) {
      setCinError('Please enter a CIN number');
      setCinFetchStatus('error');
      return;
    }

    setIsLoadingCIN(true);
    setCinFetchStatus('idle');
    setCinError('');

    try {
      const response = await fetchCompanyByCIN(formData.cin);
      
      if (response.success && response.data) {
        setFormData({
          ...formData,
          companyName: response.data.companyName,
          industry: response.data.industry,
          incorporationDate: response.data.incorporationDate,
          companyType: response.data.companyType,
          companyStatus: response.data.companyStatus,
          employeeSize: response.data.employeeSize,
          riskTag: response.data.riskTag,
        });
        setCinFetchStatus('success');
      } else {
        setCinError(response.error || 'Failed to fetch company details');
        setCinFetchStatus('error');
      }
    } catch (error) {
      setCinError('An error occurred while fetching company details');
      setCinFetchStatus('error');
    } finally {
      setIsLoadingCIN(false);
    }
  };

  const handleAddCompany = () => {
    // Add company logic here
    console.log('Add Company:', formData);
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Company
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Form */}
      {showAddForm && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-gray-900">Add New Company</h3>
              <Button variant="outline" size="sm" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>

            {/* Sample CINs Info Box */}
            <div className="mb-6 p-4 bg-blue-100 border border-blue-300 rounded-lg">
              <div className="flex items-start gap-2">
                <Download className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-blue-900 mb-2">
                    Try Auto-Fetch with Sample CINs:
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <button
                      onClick={() => setFormData({ ...formData, cin: 'L22210MH1995PLC084781' })}
                      className="text-left px-2 py-1 bg-white rounded hover:bg-blue-50 border border-blue-200"
                    >
                      L22210MH1995PLC084781 (TCS)
                    </button>
                    <button
                      onClick={() => setFormData({ ...formData, cin: 'L65910MH1994PLC080618' })}
                      className="text-left px-2 py-1 bg-white rounded hover:bg-blue-50 border border-blue-200"
                    >
                      L65910MH1994PLC080618 (HDFC Bank)
                    </button>
                    <button
                      onClick={() => setFormData({ ...formData, cin: 'L67120MH1958PLC011126' })}
                      className="text-left px-2 py-1 bg-white rounded hover:bg-blue-50 border border-blue-200"
                    >
                      L67120MH1958PLC011126 (ICICI)
                    </button>
                    <button
                      onClick={() => setFormData({ ...formData, cin: 'L72900GJ1999PLC035648' })}
                      className="text-left px-2 py-1 bg-white rounded hover:bg-blue-50 border border-blue-200"
                    >
                      L72900GJ1999PLC035648 (Infosys)
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name *
                </label>
                <Input
                  placeholder="e.g., Tata Consultancy Services"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry *
                </label>
                <Input
                  placeholder="e.g., IT Services"
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CIN Number
                </label>
                <Input
                  placeholder="e.g., L22210MH1995PLC084781"
                  value={formData.cin}
                  onChange={(e) => setFormData({ ...formData, cin: e.target.value })}
                />
                <div className="mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCINFetch}
                    disabled={isLoadingCIN}
                  >
                    {isLoadingCIN ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Download className="w-4 h-4" />
                    )}
                    Fetch Details
                  </Button>
                  {cinFetchStatus === 'success' && (
                    <CheckCircle className="w-4 h-4 text-green-500 ml-2" />
                  )}
                  {cinFetchStatus === 'error' && (
                    <XCircle className="w-4 h-4 text-red-500 ml-2" />
                  )}
                </div>
                {cinError && <p className="text-sm text-red-500 mt-1">{cinError}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Incorporation Date
                </label>
                <Input
                  type="date"
                  value={formData.incorporationDate}
                  onChange={(e) => setFormData({ ...formData, incorporationDate: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Type
                </label>
                <select
                  className="w-full h-10 px-3 border border-gray-300 rounded-md"
                  value={formData.companyType}
                  onChange={(e) => setFormData({ ...formData, companyType: e.target.value })}
                >
                  <option>Private</option>
                  <option>Public</option>
                  <option>LLP</option>
                  <option>Partnership</option>
                  <option>Proprietorship</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Status
                </label>
                <select
                  className="w-full h-10 px-3 border border-gray-300 rounded-md"
                  value={formData.companyStatus}
                  onChange={(e) => setFormData({ ...formData, companyStatus: e.target.value })}
                >
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Strike Off</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employee Size
                </label>
                <select
                  className="w-full h-10 px-3 border border-gray-300 rounded-md"
                  value={formData.employeeSize}
                  onChange={(e) => setFormData({ ...formData, employeeSize: e.target.value })}
                >
                  <option>Micro</option>
                  <option>Small</option>
                  <option>Medium</option>
                  <option>Large</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Risk Tag
                </label>
                <select
                  className="w-full h-10 px-3 border border-gray-300 rounded-md"
                  value={formData.riskTag}
                  onChange={(e) => setFormData({ ...formData, riskTag: e.target.value })}
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bank Categories & Multipliers
              </label>
              <div className="bg-white rounded-lg p-4 space-y-3">
                <div className="grid grid-cols-5 gap-3 text-sm font-medium text-gray-600 pb-2 border-b">
                  <div>Bank</div>
                  <div>Listed</div>
                  <div>Category</div>
                  <div>Multiplier</div>
                  <div>Action</div>
                </div>
                {['HDFC', 'ICICI', 'SBI', 'Axis', 'Kotak', 'PNB', 'BOB', 'IDFC'].map((bank) => (
                  <div key={bank} className="grid grid-cols-5 gap-3 items-center">
                    <div className="font-medium">{bank}</div>
                    <input type="checkbox" className="w-4 h-4" />
                    <select className="h-8 px-2 border border-gray-300 rounded text-sm">
                      <option>A</option>
                      <option>B</option>
                      <option>C</option>
                      <option>D</option>
                    </select>
                    <Input type="number" placeholder="25" className="h-8" />
                    <Button variant="outline" size="sm">Set</Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddCompany}>Save Company</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Companies Table */}
      <Card>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Company</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Industry</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">CIN</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Risk</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Size</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCompanies.map((company) => (
                  <tr key={company.companyId} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-gray-400" />
                        <span className="font-medium text-gray-900">{company.companyName}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{company.industry}</td>
                    <td className="py-3 px-4">
                      <span className="font-mono text-xs text-gray-600">{company.cin || '-'}</span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        className={
                          company.companyStatus === 'Active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }
                      >
                        {company.companyStatus}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        className={
                          company.riskTag === 'Low'
                            ? 'bg-green-100 text-green-700'
                            : company.riskTag === 'Medium'
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-red-100 text-red-700'
                        }
                      >
                        {company.riskTag}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{company.employeeSize}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
            <div>Showing {filteredCompanies.length} companies</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}