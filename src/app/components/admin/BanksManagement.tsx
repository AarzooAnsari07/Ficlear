import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Plus, Search, Edit, Trash2, Building2, X } from 'lucide-react';
import { banks } from '../../data/banks';

interface BankFormData {
  id: string;
  name: string;
  logo: string;
  roi: number;
  processingFee: number;
  minCibil: number;
  maxCibil: number;
  minSalary: number;
  companyCategoryAllowed: string[];
  maxObligationPercent: number;
  maxLTV: number;
  features: string[];
  serviceablePincodes: string[];
}

export function BanksManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingBank, setEditingBank] = useState<string | null>(null);
  const [formData, setFormData] = useState<BankFormData>({
    id: '',
    name: '',
    logo: '🏦',
    roi: 8.5,
    processingFee: 1.0,
    minCibil: 700,
    maxCibil: 900,
    minSalary: 25000,
    companyCategoryAllowed: ['A', 'B'],
    maxObligationPercent: 50,
    maxLTV: 85,
    features: ['', '', '', ''],
    serviceablePincodes: [],
  });

  const filteredBanks = banks.filter((bank) =>
    bank.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditClick = (bankId: string) => {
    const bank = banks.find((b) => b.id === bankId);
    if (bank) {
      setFormData({
        id: bank.id,
        name: bank.name,
        logo: bank.logo,
        roi: bank.roi,
        processingFee: bank.processingFee,
        minCibil: bank.criteria.minCibil,
        maxCibil: bank.criteria.maxCibil,
        minSalary: bank.criteria.minSalary,
        companyCategoryAllowed: bank.criteria.companyCategoryAllowed,
        maxObligationPercent: bank.criteria.maxObligationPercent,
        maxLTV: bank.criteria.maxLTV,
        features: [...bank.features],
        serviceablePincodes: bank.criteria.serviceablePincodes || [],
      });
      setEditingBank(bankId);
      setShowAddForm(true);
    }
  };

  const handleSaveBank = () => {
    if (editingBank) {
      // Update existing bank
      const index = banks.findIndex((b) => b.id === editingBank);
      if (index !== -1) {
        (banks as any)[index] = {
          id: formData.id,
          name: formData.name,
          logo: formData.logo,
          roi: formData.roi,
          processingFee: formData.processingFee,
          criteria: {
            minCibil: formData.minCibil,
            maxCibil: formData.maxCibil,
            minSalary: formData.minSalary,
            companyCategoryAllowed: formData.companyCategoryAllowed,
            maxObligationPercent: formData.maxObligationPercent,
            maxLTV: formData.maxLTV,
            serviceablePincodes: formData.serviceablePincodes,
          },
          features: formData.features.filter((f) => f.trim() !== ''),
        };
      }
    } else {
      // Add new bank
      const newBank = {
        id: formData.id,
        name: formData.name,
        logo: formData.logo,
        roi: formData.roi,
        processingFee: formData.processingFee,
        criteria: {
          minCibil: formData.minCibil,
          maxCibil: formData.maxCibil,
          minSalary: formData.minSalary,
          companyCategoryAllowed: formData.companyCategoryAllowed,
          maxObligationPercent: formData.maxObligationPercent,
          maxLTV: formData.maxLTV,
          serviceablePincodes: formData.serviceablePincodes,
        },
        features: formData.features.filter((f) => f.trim() !== ''),
      };
      (banks as any).push(newBank);
    }
    resetForm();
  };

  const handleDeleteBank = (bankId: string) => {
    const index = banks.findIndex((b) => b.id === bankId);
    if (index !== -1) {
      banks.splice(index, 1);
    }
  };

  const resetForm = () => {
    setShowAddForm(false);
    setEditingBank(null);
    setFormData({
      id: '',
      name: '',
      logo: '🏦',
      roi: 8.5,
      processingFee: 1.0,
      minCibil: 700,
      maxCibil: 900,
      minSalary: 25000,
      companyCategoryAllowed: ['A', 'B'],
      maxObligationPercent: 50,
      maxLTV: 85,
      features: ['', '', '', ''],
      serviceablePincodes: [],
    });
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ''] });
  };

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    });
  };

  const toggleCategory = (category: string) => {
    const categories = formData.companyCategoryAllowed;
    if (categories.includes(category)) {
      setFormData({
        ...formData,
        companyCategoryAllowed: categories.filter((c) => c !== category),
      });
    } else {
      setFormData({
        ...formData,
        companyCategoryAllowed: [...categories, category],
      });
    }
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
                placeholder="Search banks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Bank
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Form */}
      {showAddForm && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-gray-900">
                {editingBank ? 'Edit Bank' : 'Add New Bank'}
              </h3>
              <Button variant="outline" size="sm" onClick={resetForm}>
                Cancel
              </Button>
            </div>

            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bank ID *
                  </label>
                  <Input
                    placeholder="e.g., hdfc"
                    value={formData.id}
                    onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                    disabled={!!editingBank}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bank Name *
                  </label>
                  <Input
                    placeholder="e.g., HDFC Bank"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Logo (Emoji) *
                  </label>
                  <Input
                    placeholder="e.g., 🏦"
                    value={formData.logo}
                    onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                  />
                </div>
              </div>

              {/* Interest & Fee */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ROI (%) *
                  </label>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="e.g., 8.5"
                    value={formData.roi}
                    onChange={(e) =>
                      setFormData({ ...formData, roi: parseFloat(e.target.value) || 0 })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Processing Fee (%) *
                  </label>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="e.g., 1.0"
                    value={formData.processingFee}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        processingFee: parseFloat(e.target.value) || 0,
                      })
                    }
                  />
                </div>
              </div>

              {/* CIBIL Criteria */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Min CIBIL Score *
                  </label>
                  <Input
                    type="number"
                    placeholder="e.g., 700"
                    value={formData.minCibil}
                    onChange={(e) =>
                      setFormData({ ...formData, minCibil: parseInt(e.target.value) || 0 })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max CIBIL Score *
                  </label>
                  <Input
                    type="number"
                    placeholder="e.g., 900"
                    value={formData.maxCibil}
                    onChange={(e) =>
                      setFormData({ ...formData, maxCibil: parseInt(e.target.value) || 0 })
                    }
                  />
                </div>
              </div>

              {/* Salary & Obligations */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Min Salary (₹) *
                  </label>
                  <Input
                    type="number"
                    placeholder="e.g., 25000"
                    value={formData.minSalary}
                    onChange={(e) =>
                      setFormData({ ...formData, minSalary: parseInt(e.target.value) || 0 })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Obligation (%) *
                  </label>
                  <Input
                    type="number"
                    placeholder="e.g., 50"
                    value={formData.maxObligationPercent}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        maxObligationPercent: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max LTV (%) *
                  </label>
                  <Input
                    type="number"
                    placeholder="e.g., 85"
                    value={formData.maxLTV}
                    onChange={(e) =>
                      setFormData({ ...formData, maxLTV: parseInt(e.target.value) || 0 })
                    }
                  />
                </div>
              </div>

              {/* Company Categories */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Categories Allowed *
                </label>
                <div className="flex gap-4 bg-white p-4 rounded-lg border border-gray-300">
                  {['A', 'B', 'C', 'D'].map((category) => (
                    <label
                      key={category}
                      className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        formData.companyCategoryAllowed.includes(category)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.companyCategoryAllowed.includes(category)}
                        onChange={() => toggleCategory(category)}
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                      <span className="font-medium text-gray-900">Category {category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Features
                </label>
                <div className="space-y-2">
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder={`Feature ${index + 1}`}
                        value={feature}
                        onChange={(e) => updateFeature(index, e.target.value)}
                      />
                      {formData.features.length > 1 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeFeature(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={addFeature}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Feature
                  </Button>
                </div>
              </div>

              {/* Preferred PIN Codes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Serviceable PIN Codes (comma-separated)
                </label>
                <Input
                  placeholder="e.g., 400001, 110001, 560001"
                  value={formData.serviceablePincodes.join(', ')}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      serviceablePincodes: e.target.value
                        .split(',')
                        .map((p) => p.trim())
                        .filter(Boolean),
                    })
                  }
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={resetForm}>
                Cancel
              </Button>
              <Button onClick={handleSaveBank}>
                {editingBank ? 'Update Bank' : 'Save Bank'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Banks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredBanks.map((bank) => (
          <Card key={bank.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                    {bank.logo}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{bank.name}</h3>
                    <p className="text-sm text-gray-500">ID: {bank.id}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditClick(bank.id)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteBank(bank.id)}
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">ROI</span>
                  <Badge className="bg-blue-100 text-blue-700">{bank.roi}%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Processing Fee</span>
                  <Badge className="bg-green-100 text-green-700">
                    {bank.processingFee}%
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Min CIBIL</span>
                  <span className="font-medium text-gray-900">{bank.criteria.minCibil}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Min Salary</span>
                  <span className="font-medium text-gray-900">
                    ₹{bank.criteria.minSalary.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Max Obligation</span>
                  <span className="font-medium text-gray-900">
                    {bank.criteria.maxObligationPercent}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Max LTV</span>
                  <span className="font-medium text-gray-900">{bank.criteria.maxLTV}%</span>
                </div>
              </div>

              <div className="border-t pt-3">
                <div className="text-sm text-gray-600 mb-2">Allowed Categories:</div>
                <div className="flex gap-2">
                  {bank.criteria.companyCategoryAllowed.map((cat) => (
                    <Badge key={cat} variant="outline" className="text-xs">
                      Cat {cat}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="border-t pt-3 mt-3">
                <div className="text-sm text-gray-600 mb-2">Features:</div>
                <ul className="space-y-1">
                  {bank.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {bank.criteria.serviceablePincodes &&
                bank.criteria.serviceablePincodes.length > 0 && (
                  <div className="border-t pt-3 mt-3">
                    <div className="text-sm text-gray-600 mb-2">Serviceable PIN Codes:</div>
                    <div className="flex flex-wrap gap-2">
                      {bank.criteria.serviceablePincodes.map((pincode) => (
                        <Badge key={pincode} className="bg-purple-100 text-purple-700">
                          {pincode}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBanks.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">No banks found</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery
                ? 'Try adjusting your search query'
                : 'Get started by adding your first bank'}
            </p>
            {!searchQuery && (
              <Button onClick={() => setShowAddForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Bank
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}