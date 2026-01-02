import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Plus, Search, Edit, Trash2, MapPin, Building2, X, Landmark } from 'lucide-react';
import { pinCodes } from '../../data/pincodes';
import { banks } from '../../data/banks';

interface PinCodeFormData {
  pinCode: string;
  areaName: string;
  city: string;
  state: string;
  category: string;
  zone: string;
  serviceableBanks: string[];
}

export function PinCodeManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPinCode, setEditingPinCode] = useState<string | null>(null);
  const [formData, setFormData] = useState<PinCodeFormData>({
    pinCode: '',
    areaName: '',
    city: '',
    state: '',
    category: 'Metro',
    zone: 'Metro',
    serviceableBanks: [],
  });

  const filteredPincodes = pinCodes.filter((pincode) =>
    pincode.pinCode.includes(searchQuery) ||
    pincode.areaName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pincode.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Helper function to get serviceable banks count for a PIN code
  const getServiceableBanksCount = (pinCode: string) => {
    const pincode = pinCodes.find((p) => p.pinCode === pinCode);
    if (!pincode || !pincode.bankServiceability) return 0;
    
    const serviceableBanksFromPincode = Object.values(pincode.bankServiceability).filter(
      (service) => service.isServiceable
    ).length;
    
    const serviceableBanksFromBanks = banks.filter((bank) =>
      bank.criteria.serviceablePincodes?.includes(pinCode)
    ).length;
    
    // Return the maximum count from both sources
    return Math.max(serviceableBanksFromPincode, serviceableBanksFromBanks);
  };

  // Helper function to get serviceable bank names for a PIN code
  const getServiceableBankNames = (pinCode: string) => {
    const pincode = pinCodes.find((p) => p.pinCode === pinCode);
    const bankNames = new Set<string>();
    
    // Get banks from pincode's bankServiceability
    if (pincode && pincode.bankServiceability) {
      Object.entries(pincode.bankServiceability).forEach(([bankId, service]) => {
        if (service.isServiceable) {
          const bank = banks.find((b) => b.id === bankId);
          if (bank) bankNames.add(bank.name);
        }
      });
    }
    
    // Get banks that have this PIN code in their serviceablePincodes
    banks.forEach((bank) => {
      if (bank.criteria.serviceablePincodes?.includes(pinCode)) {
        bankNames.add(bank.name);
      }
    });
    
    return Array.from(bankNames);
  };

  const handleAddPinCode = () => {
    // Convert serviceableBanks array to bankServiceability object
    const bankServiceability: any = {};
    formData.serviceableBanks.forEach((bankName) => {
      const bank = banks.find(b => b.name === bankName);
      if (bank) {
        bankServiceability[bank.id] = {
          isServiceable: true,
          remarks: 'Branch available'
        };
      }
    });

    const newPinCode = {
      pinCode: formData.pinCode,
      areaName: formData.areaName,
      state: formData.state,
      areaType: formData.category as 'Metro' | 'Non-Metro' | 'Rural',
      bankServiceability: bankServiceability,
    };
    (pinCodes as any).push(newPinCode);
    setShowAddForm(false);
    setFormData({
      pinCode: '',
      areaName: '',
      city: '',
      state: '',
      category: 'Metro',
      zone: 'Metro',
      serviceableBanks: [],
    });
  };

  const handleEditPinCode = () => {
    const index = pinCodes.findIndex((pincode) => pincode.pinCode === editingPinCode);
    if (index !== -1) {
      // Convert serviceableBanks array to bankServiceability object
      const bankServiceability: any = {};
      formData.serviceableBanks.forEach((bankName) => {
        const bank = banks.find(b => b.name === bankName);
        if (bank) {
          bankServiceability[bank.id] = {
            isServiceable: true,
            remarks: 'Branch available'
          };
        }
      });

      (pinCodes as any)[index] = {
        pinCode: formData.pinCode,
        areaName: formData.areaName,
        state: formData.state,
        areaType: formData.category as 'Metro' | 'Non-Metro' | 'Rural',
        bankServiceability: bankServiceability,
      };
      setShowAddForm(false);
      setEditingPinCode(null);
      setFormData({
        pinCode: '',
        areaName: '',
        city: '',
        state: '',
        category: 'Metro',
        zone: 'Metro',
        serviceableBanks: [],
      });
    }
  };

  const handleDeletePinCode = (pinCode: string) => {
    const index = pinCodes.findIndex((pincode) => pincode.pinCode === pinCode);
    if (index !== -1) {
      pinCodes.splice(index, 1);
    }
  };

  const handleEditClick = (pinCode: string) => {
    const pincode = pinCodes.find((p) => p.pinCode === pinCode);
    if (pincode) {
      // Convert bankServiceability to serviceableBanks array
      const serviceableBankNames = Object.entries(pincode.bankServiceability || {})
        .filter(([_, service]) => service.isServiceable)
        .map(([bankId, _]) => {
          const bank = banks.find(b => b.id === bankId);
          return bank ? bank.name : '';
        })
        .filter(name => name !== '');

      setFormData({
        pinCode: pincode.pinCode,
        areaName: pincode.areaName,
        city: (pincode as any).city || '',
        state: pincode.state,
        category: pincode.areaType,
        zone: (pincode as any).zone || 'Metro',
        serviceableBanks: serviceableBankNames,
      });
      setEditingPinCode(pinCode);
      setShowAddForm(true);
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
                placeholder="Search by PIN code, area, or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add PIN Code
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
                {editingPinCode ? 'Edit PIN Code' : 'Add New PIN Code'}
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setShowAddForm(false);
                  setEditingPinCode(null);
                  setFormData({
                    pinCode: '',
                    areaName: '',
                    city: '',
                    state: '',
                    category: 'Metro',
                    zone: 'Metro',
                    serviceableBanks: [],
                  });
                }}
              >
                Cancel
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  PIN Code *
                </label>
                <Input
                  placeholder="e.g., 400001"
                  value={formData.pinCode}
                  onChange={(e) => setFormData({ ...formData, pinCode: e.target.value })}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Area *
                </label>
                <Input
                  placeholder="e.g., Fort"
                  value={formData.areaName}
                  onChange={(e) => setFormData({ ...formData, areaName: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <Input
                  placeholder="e.g., Mumbai"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State *
                </label>
                <Input
                  placeholder="e.g., Maharashtra"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  className="w-full h-10 px-3 border border-gray-300 rounded-md"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="Metro">Metro</option>
                  <option value="Non-Metro">Non-Metro</option>
                  <option value="Rural">Rural</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Zone
                </label>
                <select
                  className="w-full h-10 px-3 border border-gray-300 rounded-md"
                  value={formData.zone}
                  onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
                >
                  <option>Metro</option>
                  <option>Urban</option>
                  <option>Semi-Urban</option>
                  <option>Rural</option>
                </select>
              </div>

              <div className="col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Serviceable Banks *
                </label>
                <div className="border border-gray-300 rounded-md p-4 bg-white">
                  <div className="grid grid-cols-2 gap-3">
                    {banks.map((bank) => (
                      <label
                        key={bank.id}
                        className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          formData.serviceableBanks.includes(bank.name)
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.serviceableBanks.includes(bank.name)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({
                                ...formData,
                                serviceableBanks: [...formData.serviceableBanks, bank.name],
                              });
                            } else {
                              setFormData({
                                ...formData,
                                serviceableBanks: formData.serviceableBanks.filter((b) => b !== bank.name),
                              });
                            }
                          }}
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{bank.logo}</span>
                          <div>
                            <div className="font-medium text-gray-900">{bank.name}</div>
                            <div className="text-xs text-gray-500">ROI: {bank.roi}%</div>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                  
                  {/* Selected Banks Summary */}
                  {formData.serviceableBanks.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Building2 className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-700">
                          Selected: {formData.serviceableBanks.length} bank{formData.serviceableBanks.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {formData.serviceableBanks.map((bankName) => (
                          <Badge
                            key={bankName}
                            className="bg-blue-100 text-blue-700 flex items-center gap-1"
                          >
                            {bankName}
                            <button
                              onClick={() =>
                                setFormData({
                                  ...formData,
                                  serviceableBanks: formData.serviceableBanks.filter((b) => b !== bankName),
                                })
                              }
                              className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
              {editingPinCode ? (
                <Button onClick={handleEditPinCode}>Update PIN Code</Button>
              ) : (
                <Button onClick={handleAddPinCode}>Save PIN Code</Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* PIN Codes Table */}
      <Card>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">PIN Code</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Area</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">State</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Serviceable Banks</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPincodes.slice(0, 50).map((pincode) => {
                  const banksCount = getServiceableBanksCount(pincode.pinCode);
                  const bankNames = getServiceableBankNames(pincode.pinCode);
                  
                  return (
                    <tr key={pincode.pinCode} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="font-mono font-medium text-gray-900">{pincode.pinCode}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{pincode.areaName}</td>
                      <td className="py-3 px-4 text-gray-600">{pincode.state}</td>
                      <td className="py-3 px-4">
                        <Badge
                          className={
                            pincode.areaType === 'Metro'
                              ? 'bg-green-100 text-green-700'
                              : pincode.areaType === 'Non-Metro'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-orange-100 text-orange-700'
                          }
                        >
                          {pincode.areaType}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 border border-purple-200 rounded-lg">
                            <Landmark className="w-4 h-4 text-purple-600" />
                            <span className="font-semibold text-purple-700">{banksCount}</span>
                            <span className="text-sm text-purple-600">
                              {banksCount === 1 ? 'Bank' : 'Banks'}
                            </span>
                          </div>
                          {bankNames.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {bankNames.slice(0, 3).map((name) => (
                                <Badge
                                  key={name}
                                  className="bg-gray-100 text-gray-700 text-xs"
                                  title={name}
                                >
                                  {name.split(' ')[0]}
                                </Badge>
                              ))}
                              {bankNames.length > 3 && (
                                <Badge className="bg-gray-100 text-gray-700 text-xs">
                                  +{bankNames.length - 3}
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditClick(pincode.pinCode)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeletePinCode(pincode.pinCode)}
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
            <div>Showing {Math.min(filteredPincodes.length, 50)} of {filteredPincodes.length} PIN codes</div>
            <div className="text-xs text-gray-500">Displaying first 50 results</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}