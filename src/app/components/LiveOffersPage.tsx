import { useState } from 'react';
import { Search, Filter, TrendingDown, Calendar, CheckCircle2, Sparkles, Clock, Building2, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface BankOffer {
  id: string;
  bankName: string;
  bankLogo: string;
  offerBadge: 'Limited Time' | 'Festival Offer' | 'Hot Deal' | 'New Launch';
  loanType: string;
  interestRate: string;
  maxLoanAmount: string;
  processingFee: string;
  tenure: string;
  keyBenefits: string[];
  eligibilityCriteria: string;
  validUntil: string;
  isHighlighted?: boolean;
}

const bankOffers: BankOffer[] = [
  {
    id: '1',
    bankName: 'HDFC Bank',
    bankLogo: '🏦',
    offerBadge: 'Festival Offer',
    loanType: 'Personal Loan',
    interestRate: '10.50%',
    maxLoanAmount: '₹40 Lakhs',
    processingFee: '0.99%',
    tenure: 'Up to 5 years',
    keyBenefits: [
      'Instant approval in 10 minutes',
      'Minimal documentation',
      'No collateral required',
      'Flexible EMI options'
    ],
    eligibilityCriteria: 'Salaried, Min ₹25,000/month',
    validUntil: 'Dec 31, 2025',
    isHighlighted: true
  },
  {
    id: '2',
    bankName: 'ICICI Bank',
    bankLogo: '🏦',
    offerBadge: 'Limited Time',
    loanType: 'Home Loan',
    interestRate: '8.40%',
    maxLoanAmount: '₹5 Crores',
    processingFee: '0%',
    tenure: 'Up to 30 years',
    keyBenefits: [
      'Zero processing fee',
      'Pre-approved offers for existing customers',
      'Balance transfer facility',
      'Top-up loan available'
    ],
    eligibilityCriteria: 'Salaried/Self-employed, Min ₹50,000/month',
    validUntil: 'Jan 15, 2026',
  },
  {
    id: '3',
    bankName: 'Axis Bank',
    bankLogo: '🏦',
    offerBadge: 'Hot Deal',
    loanType: 'Business Loan',
    interestRate: '12.00%',
    maxLoanAmount: '₹75 Lakhs',
    processingFee: '1.5%',
    tenure: 'Up to 7 years',
    keyBenefits: [
      'Quick disbursal in 48 hours',
      'Working capital support',
      'Overdraft facility',
      'Tax benefits available'
    ],
    eligibilityCriteria: 'Business vintage 3+ years, ITR ₹5L+',
    validUntil: 'Jan 31, 2026',
    isHighlighted: true
  },
  {
    id: '4',
    bankName: 'SBI',
    bankLogo: '🏦',
    offerBadge: 'New Launch',
    loanType: 'Education Loan',
    interestRate: '9.15%',
    maxLoanAmount: '₹1.5 Crores',
    processingFee: '0%',
    tenure: 'Up to 15 years',
    keyBenefits: [
      'Interest subsidy for eligible students',
      'No collateral up to ₹7.5L',
      'Moratorium period available',
      'Cover full course fees'
    ],
    eligibilityCriteria: 'Admission to recognized institution',
    validUntil: 'Mar 31, 2026',
  },
  {
    id: '5',
    bankName: 'Kotak Mahindra',
    bankLogo: '🏦',
    offerBadge: 'Limited Time',
    loanType: 'Car Loan',
    interestRate: '8.75%',
    maxLoanAmount: '₹1 Crore',
    processingFee: '2.5%',
    tenure: 'Up to 7 years',
    keyBenefits: [
      'Up to 100% on-road price financing',
      'Quick approval in 2 hours',
      'Flexible repayment options',
      'Both new and used cars'
    ],
    eligibilityCriteria: 'Salaried/Self-employed, Min ₹30,000/month',
    validUntil: 'Feb 28, 2026',
  },
  {
    id: '6',
    bankName: 'Bajaj Finserv',
    bankLogo: '🏦',
    offerBadge: 'Hot Deal',
    loanType: 'Personal Loan',
    interestRate: '11.00%',
    maxLoanAmount: '₹35 Lakhs',
    processingFee: '0%',
    tenure: 'Up to 7 years',
    keyBenefits: [
      'Digital approval in minutes',
      'No income proof for pre-approved',
      'Flexi loan facility',
      'Part-payment with no charges'
    ],
    eligibilityCriteria: 'Salaried, Min ₹20,000/month, CIBIL 700+',
    validUntil: 'Jan 20, 2026',
  },
];

export function LiveOffersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [loanTypeFilter, setLoanTypeFilter] = useState('all');
  const [bankFilter, setBankFilter] = useState('all');
  const [employmentFilter, setEmploymentFilter] = useState('all');

  const filteredOffers = bankOffers.filter(offer => {
    const matchesSearch = offer.bankName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         offer.loanType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLoanType = loanTypeFilter === 'all' || offer.loanType.includes(loanTypeFilter);
    const matchesBank = bankFilter === 'all' || offer.bankName === bankFilter;
    
    return matchesSearch && matchesLoanType && matchesBank;
  });

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Festival Offer':
        return 'bg-orange-500';
      case 'Limited Time':
        return 'bg-red-500';
      case 'Hot Deal':
        return 'bg-green-500';
      case 'New Launch':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Special Highlight Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-center gap-3 text-center flex-wrap">
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <p className="font-semibold">
              🎊 New Year Special: Get loans at lowest interest rates | Limited period offer
            </p>
            <Sparkles className="w-5 h-5 text-yellow-300" />
          </div>
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-center gap-3 mb-2">
            <TrendingDown className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Live Bank Loan Offers
            </h1>
          </div>
          <p className="text-gray-600 mt-2">
            Compare current loan offers from top banks and NBFCs. Find the best rates and apply instantly.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Filter Bar */}
        <Card className="mb-8 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-gray-600" />
              <h3 className="font-semibold text-gray-900">Filter Offers</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search bank or loan type..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Loan Type Filter */}
              <Select value={loanTypeFilter} onValueChange={setLoanTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Loan Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Loan Types</SelectItem>
                  <SelectItem value="Personal">Personal Loan</SelectItem>
                  <SelectItem value="Home">Home Loan</SelectItem>
                  <SelectItem value="Business">Business Loan</SelectItem>
                  <SelectItem value="Education">Education Loan</SelectItem>
                  <SelectItem value="Car">Car Loan</SelectItem>
                </SelectContent>
              </Select>

              {/* Bank Filter */}
              <Select value={bankFilter} onValueChange={setBankFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Bank" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Banks</SelectItem>
                  <SelectItem value="HDFC Bank">HDFC Bank</SelectItem>
                  <SelectItem value="ICICI Bank">ICICI Bank</SelectItem>
                  <SelectItem value="Axis Bank">Axis Bank</SelectItem>
                  <SelectItem value="SBI">SBI</SelectItem>
                  <SelectItem value="Kotak Mahindra">Kotak Mahindra</SelectItem>
                  <SelectItem value="Bajaj Finserv">Bajaj Finserv</SelectItem>
                </SelectContent>
              </Select>

              {/* Employment Type */}
              <Select value={employmentFilter} onValueChange={setEmploymentFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Employment Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="salaried">Salaried</SelectItem>
                  <SelectItem value="self-employed">Self Employed</SelectItem>
                  <SelectItem value="business">Business Owner</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Active Filters Count */}
            {(searchQuery || loanTypeFilter !== 'all' || bankFilter !== 'all' || employmentFilter !== 'all') && (
              <div className="mt-4 flex items-center gap-2">
                <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                  {filteredOffers.length} offers found
                </Badge>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setLoanTypeFilter('all');
                    setBankFilter('all');
                    setEmploymentFilter('all');
                  }}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredOffers.map((offer) => (
            <Card
              key={offer.id}
              className={`shadow-md hover:shadow-xl transition-all duration-300 border-0 ${
                offer.isHighlighted ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  {/* Bank Info */}
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center text-3xl">
                      {offer.bankLogo}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{offer.bankName}</h3>
                      <p className="text-sm text-gray-600">{offer.loanType}</p>
                    </div>
                  </div>

                  {/* Offer Badge */}
                  <Badge className={`${getBadgeColor(offer.offerBadge)} text-white px-3 py-1`}>
                    {offer.offerBadge}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-4 p-4 bg-blue-50 rounded-xl">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Interest Rate</p>
                    <p className="font-bold text-blue-600 text-lg">{offer.interestRate}</p>
                    <p className="text-xs text-gray-500">p.a. onwards</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Max Amount</p>
                    <p className="font-bold text-gray-900 text-lg">{offer.maxLoanAmount}</p>
                    <p className="text-xs text-gray-500">{offer.tenure}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Processing Fee</p>
                    <p className="font-bold text-green-600 text-lg">
                      {offer.processingFee === '0%' ? 'FREE' : offer.processingFee}
                    </p>
                    <p className="text-xs text-gray-500">+ GST</p>
                  </div>
                </div>

                {/* Key Benefits */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    Key Benefits
                  </h4>
                  <ul className="space-y-1.5">
                    {offer.keyBenefits.slice(0, 3).map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-green-600 mt-0.5">✓</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Eligibility & Validity */}
                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-gray-400" />
                    <p className="text-xs text-gray-600">{offer.eligibilityCriteria}</p>
                  </div>
                  <div className="flex items-center gap-1 text-orange-600">
                    <Clock className="w-4 h-4" />
                    <p className="text-xs font-medium">Valid till {offer.validUntil}</p>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <Button
                    variant="outline"
                    className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
                  >
                    Check Eligibility
                  </Button>
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 font-semibold"
                  >
                    Apply with Expert
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>

                {/* Highlighted Offer Tag */}
                {offer.isHighlighted && (
                  <div className="flex items-center justify-center gap-2 p-2 bg-green-50 rounded-lg">
                    <Sparkles className="w-4 h-4 text-green-600" />
                    <p className="text-xs font-semibold text-green-700">
                      🔥 Trending Offer - High Success Rate
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredOffers.length === 0 && (
          <Card className="shadow-sm">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">No offers found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your filters or search terms
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setLoanTypeFilter('all');
                  setBankFilter('all');
                  setEmploymentFilter('all');
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Bottom CTA Banner */}
        <Card className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white border-0 shadow-lg">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-2">Can't find the right offer?</h3>
            <p className="text-blue-100 mb-6">
              Our loan experts can help you find personalized offers based on your profile
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold"
              >
                Talk to Expert Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10"
              >
                Check Full Eligibility
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
