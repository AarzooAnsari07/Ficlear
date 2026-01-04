import { useState, useEffect } from 'react';
import { Search, Filter, TrendingDown, Calendar, CheckCircle2, Sparkles, Clock, Building2, ChevronRight, Loader2, TrendingUp } from 'lucide-react';
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
import { offersAPI } from '../utils/database';

interface BankOffer {
  id: string;
  bankName: string;
  bankLogo: string;
  offerBadge: string;
  loanType: string;
  interestRate: string;
  interestRateNote?: string;
  maxAmount: string;
  maxAmountTenure?: string;
  processingFee: string;
  processingFeeNote?: string;
  keyBenefits: string[];
  eligibilityCriteria: string;
  validTill: string;
  isTrending?: boolean;
  badgeColor?: 'green' | 'orange' | 'blue';
}

interface LiveOffersPageProps {
  onNavigate?: (page: string) => void;
}

export function LiveOffersPage({ onNavigate }: LiveOffersPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLoanType, setSelectedLoanType] = useState<string>('all');
  const [selectedBank, setSelectedBank] = useState<string>('all');
  const [offers, setOffers] = useState<BankOffer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load offers from database
  useEffect(() => {
    loadOffers();
  }, []);

  const loadOffers = async () => {
    try {
      setIsLoading(true);
      console.log('Loading offers from database...');
      const response = await offersAPI.getAll();
      console.log('Offers API response:', response);
      
      if (response.success && response.data) {
        // Filter out null/undefined values and ensure valid data
        const validOffers = response.data.filter((offer): offer is BankOffer => 
          offer !== null && 
          offer !== undefined && 
          typeof offer === 'object' &&
          'bankName' in offer
        );
        console.log('Valid offers loaded:', validOffers.length, validOffers);
        setOffers(validOffers);
      } else {
        console.log('No offers data in response');
        setOffers([]);
      }
    } catch (error) {
      console.error('Error loading offers:', error);
      setOffers([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredOffers = offers.filter(offer => {
    // Extra safety check
    if (!offer || !offer.bankName || !offer.loanType) return false;
    
    const matchesSearch = offer.bankName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         offer.loanType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLoanType = selectedLoanType === 'all' || offer.loanType.includes(selectedLoanType);
    const matchesBank = selectedBank === 'all' || offer.bankName === selectedBank;
    
    return matchesSearch && matchesLoanType && matchesBank;
  });

  const getBadgeColorClass = (color?: string) => {
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

  // Get unique banks from offers for filter
  const uniqueBanks = Array.from(new Set(offers.map(o => o.bankName)));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Special Highlight Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 sm:py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2 sm:gap-3 text-center flex-wrap">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300" />
            <p className="text-sm sm:text-base font-semibold">
              🎊 New Year Special: Get loans at lowest interest rates | Limited period offer
            </p>
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300" />
          </div>
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <TrendingDown className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Live Bank Loan Offers
            </h1>
          </div>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            Compare current loan offers from top banks and NBFCs. Find the best rates and apply instantly.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Filter Bar */}
        <Card className="mb-6 sm:mb-8 shadow-sm">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Filter Offers</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {/* Search */}
              <div className="relative sm:col-span-2 lg:col-span-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search bank or loan type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Loan Type Filter */}
              <Select value={selectedLoanType} onValueChange={setSelectedLoanType}>
                <SelectTrigger>
                  <SelectValue placeholder="All Loan Types" />
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
              <Select value={selectedBank} onValueChange={setSelectedBank}>
                <SelectTrigger>
                  <SelectValue placeholder="All Banks" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Banks</SelectItem>
                  {uniqueBanks.map(bank => (
                    <SelectItem key={bank} value={bank}>{bank}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Active Filters Count */}
            {(searchTerm || selectedLoanType !== 'all' || selectedBank !== 'all') && (
              <div className="mt-4 flex items-center gap-2 flex-wrap">
                <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                  {filteredOffers.length} offers found
                </Badge>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedLoanType('all');
                    setSelectedBank('all');
                  }}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Loading State */}
        {isLoading && (
          <Card className="shadow-md border-0">
            <CardContent className="p-12 text-center">
              <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-600 font-medium">Loading offers...</p>
              <p className="text-sm text-gray-500 mt-2">Please wait while we fetch the latest deals</p>
            </CardContent>
          </Card>
        )}

        {/* No Offers State */}
        {!isLoading && filteredOffers.length === 0 && (
          <Card className="shadow-md border-0">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingDown className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-2">No offers found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || selectedLoanType !== 'all' || selectedBank !== 'all'
                  ? 'Try adjusting your filters to see more results'
                  : 'No loan offers are currently available. Please check back later.'}
              </p>
              {(searchTerm || selectedLoanType !== 'all' || selectedBank !== 'all') && (
                <Button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedLoanType('all');
                    setSelectedBank('all');
                  }}
                  variant="outline"
                >
                  Clear All Filters
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* Offers Grid */}
        {!isLoading && filteredOffers.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {filteredOffers.map((offer) => (
              <Card
                key={offer.id}
                className={`shadow-md hover:shadow-xl transition-all duration-300 border-0 ${
                  offer.isTrending ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <CardHeader className="pb-3 sm:pb-4">
                  <div className="flex items-start justify-between gap-3">
                    {/* Bank Info */}
                    <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-100 rounded-xl flex items-center justify-center text-2xl sm:text-3xl flex-shrink-0">
                        {offer.bankLogo}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-base sm:text-lg text-gray-900 truncate">{offer.bankName}</h3>
                        <p className="text-xs sm:text-sm text-gray-600 truncate">{offer.loanType}</p>
                      </div>
                    </div>

                    {/* Offer Badge */}
                    <Badge className={`${getBadgeColorClass(offer.badgeColor)} px-2 sm:px-3 py-1 text-xs sm:text-sm whitespace-nowrap flex-shrink-0`}>
                      {offer.offerBadge}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3 sm:space-y-4">
                  {/* Trending Badge */}
                  {offer.isTrending && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-2 sm:p-3">
                      <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-green-700 font-medium">
                        <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>🔥 Trending Offer - High Success Rate</span>
                      </div>
                    </div>
                  )}

                  {/* Key Metrics */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-4 p-3 sm:p-4 bg-blue-50 rounded-xl">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Interest Rate</p>
                      <p className="font-bold text-blue-600 text-sm sm:text-lg">{offer.interestRate}</p>
                      <p className="text-xs text-gray-500 truncate">{offer.interestRateNote || 'p.a. onwards'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Max Amount</p>
                      <p className="font-bold text-gray-900 text-sm sm:text-lg">{offer.maxAmount}</p>
                      <p className="text-xs text-gray-500 truncate">{offer.maxAmountTenure}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Processing Fee</p>
                      <p className={`font-bold text-sm sm:text-lg ${
                        offer.processingFee === 'FREE' || offer.processingFee === '0%' 
                          ? 'text-green-600' 
                          : 'text-gray-900'
                      }`}>
                        {offer.processingFee === '0%' ? 'FREE' : offer.processingFee}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{offer.processingFeeNote || '+ GST'}</p>
                    </div>
                  </div>

                  {/* Key Benefits */}
                  <div>
                    <h4 className="font-semibold text-sm sm:text-base text-gray-900 mb-2 flex items-center gap-2">
                      <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                      Key Benefits
                    </h4>
                    <ul className="space-y-1.5">
                      {offer.keyBenefits.filter(Boolean).slice(0, 4).map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700">
                          <span className="text-green-600 mt-0.5 flex-shrink-0">✓</span>
                          <span className="flex-1">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Eligibility & Validity */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-3 border-t">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                      <p className="text-xs sm:text-sm text-gray-600">{offer.eligibilityCriteria}</p>
                    </div>
                    <div className="flex items-center gap-1 text-orange-600">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <p className="text-xs sm:text-sm font-medium whitespace-nowrap">Valid till {offer.validTill}</p>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-2">
                    <Button
                      variant="outline"
                      className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 text-xs sm:text-sm"
                      size="sm"
                    >
                      View Details
                    </Button>
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm"
                      size="sm"
                      onClick={() => onNavigate?.('eligibility')}
                    >
                      Apply Now
                      <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Can't Find Offer CTA */}
        {!isLoading && filteredOffers.length > 0 && (
          <Card className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 border-0 shadow-lg">
            <CardContent className="p-6 sm:p-8 text-center text-white">
              <h3 className="text-xl sm:text-2xl font-bold mb-2">Can't find the right offer?</h3>
              <p className="text-sm sm:text-base text-blue-100 mb-6">
                Check your eligibility and we'll recommend the best loan options for you
              </p>
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold"
                onClick={() => onNavigate?.('eligibility')}
              >
                Check Eligibility Now
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
