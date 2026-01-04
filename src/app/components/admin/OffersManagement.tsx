import { useState, useEffect } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Plus, Search, Edit, Trash2, Tag, X, Calendar, TrendingUp, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { offersAPI } from '../../utils/database';

interface LiveOffer {
  id: string;
  bankName: string;
  bankLogo: string;
  loanType: string;
  offerBadge: string;
  badgeColor: 'green' | 'orange' | 'blue';
  interestRate: string;
  interestRateNote: string;
  maxAmount: string;
  maxAmountTenure: string;
  processingFee: string;
  processingFeeNote: string;
  keyBenefits: string[];
  eligibilityCriteria: string;
  validTill: string;
  isTrending: boolean;
}

export function OffersManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingOffer, setEditingOffer] = useState<string | null>(null);
  const [offers, setOffers] = useState<LiveOffer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Load offers from database
  useEffect(() => {
    loadOffers();
  }, []);

  const loadOffers = async () => {
    try {
      setIsLoading(true);
      const response = await offersAPI.getAll();
      
      if (response.success && response.data) {
        // Filter out null/undefined values
        const validOffers = response.data.filter((offer): offer is LiveOffer => 
          offer !== null && 
          offer !== undefined && 
          typeof offer === 'object' &&
          'bankName' in offer
        );
        setOffers(validOffers);
        
        // If no offers exist, seed demo data
        if (validOffers.length === 0) {
          await seedDemoOffers();
        }
      } else {
        setOffers([]);
      }
    } catch (error) {
      console.error('Error loading offers:', error);
      setMessage({ type: 'error', text: 'Failed to load offers' });
      setOffers([]);
    } finally {
      setIsLoading(false);
    }
  };

  const seedDemoOffers = async () => {
    const demoOffers: Omit<LiveOffer, 'id'>[] = [
      {
        bankName: 'Bajaj Finance',
        bankLogo: '💰',
        loanType: 'Personal Loan',
        offerBadge: 'Hot Deal',
        badgeColor: 'green',
        interestRate: '11.00%',
        interestRateNote: 'p.a. onwards',
        maxAmount: '₹35 Lakhs',
        maxAmountTenure: 'Up to 7 years',
        processingFee: '2.00%',
        processingFeeNote: '+ GST',
        keyBenefits: [
          'Instant approval in 5 minutes',
          'Flexible repayment options',
          'No prepayment charges',
          'Digital process - Paperless loan'
        ],
        eligibilityCriteria: 'Salaried, Min ₹20,000/month',
        validTill: 'Mar 31, 2026',
        isTrending: true,
      },
      {
        bankName: 'HDFC Bank',
        bankLogo: '🏦',
        loanType: 'Personal Loan',
        offerBadge: 'Festival Offer',
        badgeColor: 'orange',
        interestRate: '10.50%',
        interestRateNote: 'p.a. onwards',
        maxAmount: '₹40 Lakhs',
        maxAmountTenure: 'Up to 5 years',
        processingFee: '0.99%',
        processingFeeNote: '+ GST',
        keyBenefits: [
          'Instant approval in 10 minutes',
          'Minimal documentation required',
          'No collateral required',
          'Flexible EMI options'
        ],
        eligibilityCriteria: 'Salaried, Min ₹25,000/month',
        validTill: 'Dec 31, 2025',
        isTrending: true,
      },
      {
        bankName: 'ICICI Bank',
        bankLogo: '🏛️',
        loanType: 'Home Loan',
        offerBadge: 'New Launch',
        badgeColor: 'blue',
        interestRate: '8.40%',
        interestRateNote: 'p.a. onwards',
        maxAmount: '₹5 Crores',
        maxAmountTenure: 'Up to 30 years',
        processingFee: 'FREE',
        processingFeeNote: 'Limited period',
        keyBenefits: [
          'Zero processing fee',
          'Pre-approved for existing customers',
          'Balance transfer facility available',
          'Top-up loan option'
        ],
        eligibilityCriteria: 'Salaried/Self-employed, Min ₹50,000/month',
        validTill: 'Jan 31, 2026',
        isTrending: false,
      },
    ];

    try {
      console.log('Seeding demo offers...');
      const createdOffers = [];
      
      for (const offer of demoOffers) {
        const response = await offersAPI.create(offer as LiveOffer);
        if (response.success && response.data) {
          createdOffers.push(response.data);
        }
      }
      
      if (createdOffers.length > 0) {
        setOffers(createdOffers);
        setMessage({ type: 'success', text: `${createdOffers.length} demo offers created successfully!` });
        console.log('Demo offers seeded successfully');
      }
    } catch (error) {
      console.error('Error seeding demo offers:', error);
      setMessage({ type: 'error', text: 'Failed to create demo offers' });
    }
  };

  const [formData, setFormData] = useState<LiveOffer>({
    id: '',
    bankName: '',
    bankLogo: '🏦',
    loanType: '',
    offerBadge: 'Hot Deal',
    badgeColor: 'green',
    interestRate: '',
    interestRateNote: 'p.a. onwards',
    maxAmount: '',
    maxAmountTenure: '',
    processingFee: '',
    processingFeeNote: '+ GST',
    keyBenefits: ['', '', ''],
    eligibilityCriteria: '',
    validTill: '',
    isTrending: false,
  });

  const filteredOffers = offers.filter(
    (offer) =>
      offer.bankName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offer.loanType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditClick = (offerId: string) => {
    const offer = offers.find((o) => o.id === offerId);
    if (offer) {
      setFormData(offer);
      setEditingOffer(offerId);
      setShowAddForm(true);
    }
  };

  const handleSaveOffer = async () => {
    try {
      if (editingOffer) {
        const response = await offersAPI.update(editingOffer, formData);
        if (response.success) {
          setOffers(offers.map((o) => (o.id === editingOffer ? formData : o)));
          setMessage({ type: 'success', text: 'Offer updated successfully' });
        } else {
          setMessage({ type: 'error', text: 'Failed to update offer' });
        }
      } else {
        const response = await offersAPI.create(formData);
        if (response.success && response.data) {
          const newOffer = { ...formData, id: response.data.id };
          setOffers([...offers, newOffer]);
          setMessage({ type: 'success', text: 'Offer added successfully' });
        } else {
          setMessage({ type: 'error', text: 'Failed to add offer' });
        }
      }
    } catch (error) {
      console.error('Error saving offer:', error);
      setMessage({ type: 'error', text: 'Failed to save offer' });
    } finally {
      resetForm();
    }
  };

  const handleDeleteOffer = async (offerId: string) => {
    try {
      const response = await offersAPI.delete(offerId);
      if (response.success) {
        setOffers(offers.filter((o) => o.id !== offerId));
        setMessage({ type: 'success', text: 'Offer deleted successfully' });
      } else {
        setMessage({ type: 'error', text: 'Failed to delete offer' });
      }
    } catch (error) {
      console.error('Error deleting offer:', error);
      setMessage({ type: 'error', text: 'Failed to delete offer' });
    }
  };

  const resetForm = () => {
    setShowAddForm(false);
    setEditingOffer(null);
    setFormData({
      id: '',
      bankName: '',
      bankLogo: '🏦',
      loanType: '',
      offerBadge: 'Hot Deal',
      badgeColor: 'green',
      interestRate: '',
      interestRateNote: 'p.a. onwards',
      maxAmount: '',
      maxAmountTenure: '',
      processingFee: '',
      processingFeeNote: '+ GST',
      keyBenefits: ['', '', ''],
      eligibilityCriteria: '',
      validTill: '',
      isTrending: false,
    });
  };

  const updateBenefit = (index: number, value: string) => {
    const newBenefits = [...formData.keyBenefits];
    newBenefits[index] = value;
    setFormData({ ...formData, keyBenefits: newBenefits });
  };

  const addBenefit = () => {
    setFormData({ ...formData, keyBenefits: [...formData.keyBenefits, ''] });
  };

  const removeBenefit = (index: number) => {
    setFormData({
      ...formData,
      keyBenefits: formData.keyBenefits.filter((_, i) => i !== index),
    });
  };

  const getBadgeColorClass = (color: string) => {
    switch (color) {
      case 'green':
        return 'bg-green-500 text-white';
      case 'orange':
        return 'bg-orange-500 text-white';
      case 'blue':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-500 text-white';
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
                placeholder="Search by bank name or loan type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add New Offer
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
                {editingOffer ? 'Edit Offer' : 'Add New Offer'}
              </h3>
              <Button variant="outline" size="sm" onClick={resetForm}>
                Cancel
              </Button>
            </div>

            <div className="space-y-6">
              {/* Bank Details Section */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bank Name *
                  </label>
                  <Input
                    placeholder="e.g., HDFC Bank"
                    value={formData.bankName}
                    onChange={(e) =>
                      setFormData({ ...formData, bankName: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bank Logo (Emoji) *
                  </label>
                  <Input
                    placeholder="e.g., 🏦"
                    value={formData.bankLogo}
                    onChange={(e) =>
                      setFormData({ ...formData, bankLogo: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loan Type *
                  </label>
                  <Input
                    placeholder="e.g., Personal Loan"
                    value={formData.loanType}
                    onChange={(e) =>
                      setFormData({ ...formData, loanType: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Offer Badge Section */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Offer Badge *
                  </label>
                  <Input
                    placeholder="e.g., Hot Deal"
                    value={formData.offerBadge}
                    onChange={(e) =>
                      setFormData({ ...formData, offerBadge: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Badge Color *
                  </label>
                  <select
                    className="w-full h-10 px-3 border border-gray-300 rounded-md"
                    value={formData.badgeColor}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        badgeColor: e.target.value as 'green' | 'orange' | 'blue',
                      })
                    }
                  >
                    <option value="green">Green (Hot Deal)</option>
                    <option value="orange">Orange (Festival Offer)</option>
                    <option value="blue">Blue (New Launch)</option>
                  </select>
                </div>
              </div>

              {/* Interest Rate Section */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interest Rate *
                  </label>
                  <Input
                    placeholder="e.g., 10.50%"
                    value={formData.interestRate}
                    onChange={(e) =>
                      setFormData({ ...formData, interestRate: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interest Rate Note
                  </label>
                  <Input
                    placeholder="e.g., p.a. onwards"
                    value={formData.interestRateNote}
                    onChange={(e) =>
                      setFormData({ ...formData, interestRateNote: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Max Amount Section */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Amount *
                  </label>
                  <Input
                    placeholder="e.g., ₹40 Lakhs"
                    value={formData.maxAmount}
                    onChange={(e) =>
                      setFormData({ ...formData, maxAmount: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Amount Tenure
                  </label>
                  <Input
                    placeholder="e.g., Up to 5 years"
                    value={formData.maxAmountTenure}
                    onChange={(e) =>
                      setFormData({ ...formData, maxAmountTenure: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Processing Fee Section */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Processing Fee *
                  </label>
                  <Input
                    placeholder="e.g., 0.99% or FREE"
                    value={formData.processingFee}
                    onChange={(e) =>
                      setFormData({ ...formData, processingFee: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Processing Fee Note
                  </label>
                  <Input
                    placeholder="e.g., + GST"
                    value={formData.processingFeeNote}
                    onChange={(e) =>
                      setFormData({ ...formData, processingFeeNote: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Key Benefits Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Key Benefits *
                </label>
                <div className="space-y-2">
                  {formData.keyBenefits.map((benefit, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder={`Benefit ${index + 1}`}
                        value={benefit}
                        onChange={(e) => updateBenefit(index, e.target.value)}
                      />
                      {formData.keyBenefits.length > 1 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeBenefit(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={addBenefit}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Benefit
                  </Button>
                </div>
              </div>

              {/* Eligibility & Validity Section */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Eligibility Criteria *
                  </label>
                  <Input
                    placeholder="e.g., Salaried, Min ₹25,000/month"
                    value={formData.eligibilityCriteria}
                    onChange={(e) =>
                      setFormData({ ...formData, eligibilityCriteria: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Valid Till *
                  </label>
                  <Input
                    placeholder="e.g., Dec 31, 2025"
                    value={formData.validTill}
                    onChange={(e) =>
                      setFormData({ ...formData, validTill: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Trending Toggle */}
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isTrending}
                    onChange={(e) =>
                      setFormData({ ...formData, isTrending: e.target.checked })
                    }
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Mark as Trending Offer - High Success Rate
                  </span>
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={resetForm}>
                Cancel
              </Button>
              <Button onClick={handleSaveOffer}>
                {editingOffer ? 'Update Offer' : 'Save Offer'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredOffers.map((offer) => (
          <Card
            key={offer.id}
            className="border-2 border-blue-300 hover:border-blue-400 transition-colors"
          >
            <CardContent className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                    {offer.bankLogo}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{offer.bankName}</h3>
                    <p className="text-sm text-gray-600">{offer.loanType}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge className={getBadgeColorClass(offer.badgeColor)}>
                    {offer.offerBadge}
                  </Badge>
                </div>
              </div>

              {/* Offer Details */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Interest Rate</div>
                    <div className="font-bold text-blue-700 text-lg">
                      {offer.interestRate}
                    </div>
                    <div className="text-xs text-gray-500">{offer.interestRateNote}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Max Amount</div>
                    <div className="font-bold text-gray-900 text-lg">
                      {offer.maxAmount}
                    </div>
                    <div className="text-xs text-gray-500">{offer.maxAmountTenure}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Processing Fee</div>
                    <div
                      className={`font-bold text-lg ${
                        offer.processingFee === 'FREE'
                          ? 'text-green-600'
                          : 'text-gray-900'
                      }`}
                    >
                      {offer.processingFee}
                    </div>
                    <div className="text-xs text-gray-500">{offer.processingFeeNote}</div>
                  </div>
                </div>
              </div>

              {/* Key Benefits */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="font-semibold text-gray-900">Key Benefits</span>
                </div>
                <ul className="space-y-2">
                  {offer.keyBenefits.filter(Boolean).map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Eligibility & Validity */}
              <div className="flex items-center justify-between mb-4 py-3 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Tag className="w-4 h-4" />
                  <span>{offer.eligibilityCriteria}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-orange-600">
                  <Calendar className="w-4 h-4" />
                  <span>Valid till {offer.validTill}</span>
                </div>
              </div>

              {/* Trending Badge */}
              {offer.isTrending && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-center gap-2 text-sm text-green-700 font-medium">
                    <TrendingUp className="w-4 h-4" />
                    <span>🔥 Trending Offer - High Success Rate</span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 pt-3 border-t border-gray-200">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleEditClick(offer.id)}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => handleDeleteOffer(offer.id)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredOffers.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Tag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">No offers found</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery
                ? 'Try adjusting your search query'
                : 'Get started by adding your first offer'}
            </p>
            {!searchQuery && (
              <Button onClick={() => setShowAddForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add New Offer
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Loading Indicator */}
      {isLoading && (
        <Card>
          <CardContent className="p-12 text-center">
            <Loader2 className="w-12 h-12 text-gray-400 mx-auto mb-4 animate-spin" />
            <h3 className="font-semibold text-gray-900 mb-2">Loading offers...</h3>
          </CardContent>
        </Card>
      )}

      {/* Message Display */}
      {message && (
        <Card className={`border-${message.type === 'success' ? 'green' : 'red'}-200 bg-${message.type === 'success' ? 'green' : 'red'}-50`}>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              {message.type === 'success' ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600" />
              )}
              <p className="text-sm text-gray-900">{message.text}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}