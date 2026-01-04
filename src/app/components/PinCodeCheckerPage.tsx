import { useState, useMemo, useEffect, useRef } from 'react';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { banks } from '../data/banks';
import { pincodeSearchAPI } from '../utils/database';
import { searchPopularPinCodes } from '../data/popular-pincodes';
import { Search, CheckCircle, XCircle, MapPin, Info, Loader2, Building2, MapPinned, Clock } from 'lucide-react';

interface PinCodeRecord {
  pincode: string;
  officename: string;
  officeType?: string;
  Deliverystatus?: string;
  divisionname?: string;
  regionname?: string;
  circlename?: string;
  Taluk?: string;
  Districtname?: string;
  statename: string;
}

export function PinCodeCheckerPage() {
  const [pinCode, setPinCode] = useState('');
  const [areaName, setAreaName] = useState('');
  const [searchType, setSearchType] = useState<'pincode' | 'area'>('pincode');
  const [searchedPinCode, setSearchedPinCode] = useState<string | null>(null);
  const [pinCodeData, setPinCodeData] = useState<PinCodeRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Autocomplete states
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<typeof searchPopularPinCodes extends (...args: any[]) => infer R ? R : never>([]);
  const debounceTimer = useRef<number | null>(null);
  const [cache, setCache] = useState<{[key: string]: PinCodeRecord[]}>({});

  // Show autocomplete suggestions
  useEffect(() => {
    if (searchType === 'pincode' && pinCode.length >= 3 && pinCode.length < 6) {
      const matches = searchPopularPinCodes(pinCode);
      setSuggestions(matches);
      setShowSuggestions(matches.length > 0);
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
    }
  }, [pinCode, searchType]);

  // Determine area type based on city/region
  const getAreaType = (record: PinCodeRecord): 'Metro' | 'Non-Metro' | 'Rural' => {
    const metroKeywords = ['mumbai', 'delhi', 'bangalore', 'bengaluru', 'chennai', 'kolkata', 'hyderabad', 'pune', 'ahmedabad'];
    const cityName = (record.Districtname || record.divisionname || '').toLowerCase();
    const officeName = record.officename.toLowerCase();
    
    if (metroKeywords.some(keyword => cityName.includes(keyword) || officeName.includes(keyword))) {
      return 'Metro';
    }
    
    if (record.Deliverystatus === 'Delivery' || record.officeType === 'H.O' || record.officeType === 'S.O') {
      return 'Non-Metro';
    }
    
    return 'Rural';
  };

  // Get bank serviceability for a PIN code
  const getBankServiceability = (pincode: string, areaType: 'Metro' | 'Non-Metro' | 'Rural') => {
    return banks.map((bank) => {
      // Check if this PIN code is in the bank's preferred/serviceable list
      const isPreferredPincode = bank.criteria.preferredPincodes?.includes(pincode);
      
      // Determine serviceability based on area type and bank criteria
      let isServiceable = false;
      let remarks = '';
      
      if (isPreferredPincode) {
        isServiceable = true;
        remarks = 'Multiple branches available';
      } else if (areaType === 'Metro') {
        isServiceable = true;
        remarks = 'Branch available';
      } else if (areaType === 'Non-Metro') {
        // Only some banks service non-metro areas
        if (['sbi', 'pnb', 'bob', 'hdfc', 'icici'].includes(bank.id)) {
          isServiceable = true;
          remarks = 'Digital processing available';
        } else {
          isServiceable = false;
          remarks = 'Area not covered';
        }
      } else {
        // Rural areas - limited banks
        if (['sbi', 'pnb', 'bob'].includes(bank.id)) {
          isServiceable = true;
          remarks = 'Limited branch network';
        } else {
          isServiceable = false;
          remarks = 'Area not covered';
        }
      }
      
      return {
        bank,
        isServiceable,
        remarks,
      };
    });
  };

  const handleSearchByPincode = async () => {
    if (pinCode.length !== 6) return;

    // Check cache first
    if (cache[pinCode]) {
      console.log('Using cached data for PIN code:', pinCode);
      setPinCodeData(cache[pinCode]);
      setSearchedPinCode(pinCode);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    setSearchedPinCode(null);

    try {
      const result = await pincodeSearchAPI.searchByPincode(pinCode);
      
      if (result.success && result.data && result.data.length > 0) {
        setPinCodeData(result.data);
        setSearchedPinCode(pinCode);
        // Cache the results
        setCache(prev => ({ ...prev, [pinCode]: result.data }));
      } else {
        setPinCodeData([]);
        setSearchedPinCode(pinCode);
        setError('PIN code not found in database. Please upload PIN code data via Admin Panel → Database Settings.');
      }
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to search PIN code. Please try again.');
      setPinCodeData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchByArea = async () => {
    if (!areaName.trim()) return;
    
    setIsLoading(true);
    setError(null);
    setSearchedPinCode(null);
    
    try {
      const response = await pincodeSearchAPI.searchByArea(areaName);
      
      if (response.success && response.data && response.data.length > 0) {
        setPinCodeData(response.data);
      } else {
        setPinCodeData([]);
        setError('No areas found matching your search. Try a different name.');
      }
    } catch (err) {
      console.error('Area search error:', err);
      setError('Failed to fetch area data. Please try again.');
      setPinCodeData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const getAreaTypeColor = (areaType: string) => {
    switch (areaType) {
      case 'Metro':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'Non-Metro':
        return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'Rural':
        return 'bg-orange-100 text-orange-700 border-orange-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  // For single PIN code search, show the first record
  const primaryRecord = pinCodeData[0];
  const areaType = primaryRecord ? getAreaType(primaryRecord) : 'Non-Metro';
  const bankResults = primaryRecord ? getBankServiceability(primaryRecord.pincode, areaType) : [];
  const serviceableCount = bankResults.filter((r) => r.isServiceable).length;

  return (
    <div className="min-h-[calc(100vh-60px)] bg-gray-50 py-12">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Pan India PIN Code Serviceability Checker
          </h1>
          <p className="text-gray-600">
            Search any PIN code across India and check bank serviceability • Local database for instant results
          </p>
        </div>

        {/* Search Section */}
        <Card className="mb-8">
          <CardContent className="p-6">
            {/* Search Type Tabs */}
            <div className="flex gap-2 mb-6 border-b border-gray-200">
              <button
                onClick={() => setSearchType('pincode')}
                className={`px-6 py-3 font-medium transition-colors border-b-2 ${
                  searchType === 'pincode'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <MapPin className="w-4 h-4 inline mr-2" />
                Search by PIN Code
              </button>
              <button
                onClick={() => setSearchType('area')}
                className={`px-6 py-3 font-medium transition-colors border-b-2 ${
                  searchType === 'area'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <Building2 className="w-4 h-4 inline mr-2" />
                Search by Area Name
              </button>
            </div>

            {/* PIN Code Search */}
            {searchType === 'pincode' && (
              <div className="flex gap-3 max-w-xl">
                <div className="flex-1 relative">
                  <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-2">
                    Enter PIN Code
                  </label>
                  <Input
                    id="pincode"
                    type="text"
                    placeholder="e.g., 400001, 110001, 560001"
                    maxLength={6}
                    value={pinCode}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      setPinCode(value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSearchByPincode();
                        setShowSuggestions(false);
                      } else if (e.key === 'Escape') {
                        setShowSuggestions(false);
                      }
                    }}
                    onBlur={() => {
                      // Delay to allow click on suggestion
                      setTimeout(() => setShowSuggestions(false), 200);
                    }}
                    className="h-12 text-base"
                  />
                  {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {suggestions.map((suggestion, idx) => (
                        <button
                          key={suggestion.pincode + idx}
                          type="button"
                          className="w-full px-4 py-3 text-left hover:bg-blue-50 border-b border-gray-100 last:border-b-0 transition-colors"
                          onClick={() => {
                            setPinCode(suggestion.pincode);
                            setShowSuggestions(false);
                            // Trigger search automatically when selecting from suggestions
                            setTimeout(() => {
                              const event = new KeyboardEvent('keydown', { key: 'Enter' });
                              document.getElementById('pincode')?.dispatchEvent(event);
                            }, 100);
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="font-semibold text-gray-900">{suggestion.pincode}</div>
                              <div className="text-sm text-gray-600">{suggestion.area}</div>
                            </div>
                            <Badge 
                              variant="outline" 
                              className={`${getAreaTypeColor(suggestion.type)} border text-xs ml-2`}
                            >
                              {suggestion.type}
                            </Badge>
                          </div>
                        </button>
                      ))}
                      <div className="px-4 py-2 text-xs text-gray-500 bg-gray-50 border-t border-gray-200">
                        <Clock className="w-3 h-3 inline mr-1" />
                        Showing popular PIN codes • Type 6 digits to search all India
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex items-end">
                  <Button
                    onClick={handleSearchByPincode}
                    size="lg"
                    className="px-8"
                    disabled={pinCode.length !== 6 || isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Searching...
                      </>
                    ) : (
                      <>
                        <Search className="w-4 h-4 mr-2" />
                        Check Availability
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* Area Search */}
            {searchType === 'area' && (
              <div className="flex gap-3 max-w-xl">
                <div className="flex-1">
                  <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-2">
                    Enter Area/City Name
                  </label>
                  <Input
                    id="area"
                    type="text"
                    placeholder="e.g., Mumbai, Connaught Place, Bangalore"
                    value={areaName}
                    onChange={(e) => setAreaName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSearchByArea();
                      }
                    }}
                    className="h-12 text-base"
                  />
                </div>
                <div className="flex items-end">
                  <Button
                    onClick={handleSearchByArea}
                    size="lg"
                    className="px-8"
                    disabled={!areaName.trim() || isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Searching...
                      </>
                    ) : (
                      <>
                        <Search className="w-4 h-4 mr-2" />
                        Search Area
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}

            <p className="text-xs text-gray-500 mt-3">
              💡 Search across 150,000+ PIN codes in India with live data from data.gov.in
            </p>
          </CardContent>
        </Card>

        {/* Results Section - Multiple Areas */}
        {searchType === 'area' && pinCodeData.length > 0 && !isLoading && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Found {pinCodeData.length} location{pinCodeData.length > 1 ? 's' : ''} matching "{areaName}"
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pinCodeData.slice(0, 12).map((record, idx) => {
                const recordAreaType = getAreaType(record);
                return (
                  <Card
                    key={idx}
                    className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-blue-400"
                    onClick={() => {
                      setPinCode(record.pincode);
                      setSearchType('pincode');
                      setSearchedPinCode(record.pincode);
                      setPinCodeData([record]);
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{record.officename}</h3>
                          <p className="text-sm text-gray-600">
                            {record.Districtname}, {record.statename}
                          </p>
                        </div>
                        <Badge className={`${getAreaTypeColor(recordAreaType)} border text-xs`}>
                          {recordAreaType}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                        <span className="text-sm font-medium text-blue-600">PIN: {record.pincode}</span>
                        <span className="text-xs text-gray-500">{record.Deliverystatus}</span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Results Section - Single PIN Code */}
        {searchType === 'pincode' && primaryRecord && !isLoading && (
          <>
            {/* PIN Code Info */}
            <div className="mb-6">
              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between flex-wrap gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">
                          {primaryRecord.officename}
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">
                          {primaryRecord.Districtname}, {primaryRecord.statename} • PIN: {primaryRecord.pincode}
                        </p>
                        {primaryRecord.divisionname && (
                          <p className="text-xs text-gray-500 mt-1">
                            Division: {primaryRecord.divisionname} • Region: {primaryRecord.regionname}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={`${getAreaTypeColor(areaType)} font-semibold border`}>
                        {areaType}
                      </Badge>
                      <Badge variant="outline" className="text-base px-4 py-2">
                        {serviceableCount} / {banks.length} Banks Serviceable
                      </Badge>
                    </div>
                  </div>

                  {/* Additional PIN code info */}
                  {pinCodeData.length > 1 && (
                    <div className="mt-4 pt-4 border-t border-blue-200">
                      <p className="text-sm text-gray-700">
                        <MapPinned className="w-4 h-4 inline mr-1" />
                        Found {pinCodeData.length} post office{pinCodeData.length > 1 ? 's' : ''} in this PIN code
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Info Card */}
            <Card className="mb-6 bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-start gap-2">
                  <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 mb-2">
                      Understanding Serviceability
                    </p>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-900">Branch Available:</span>
                        <p className="text-gray-600">Physical branch for in-person services</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">Digital Processing:</span>
                        <p className="text-gray-600">Online application and documentation</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">Area Not Covered:</span>
                        <p className="text-gray-600">Bank does not service this PIN code</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bank Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {bankResults.map((result) => (
                <Card
                  key={result.bank.id}
                  className={`transition-all hover:shadow-lg ${
                    result.isServiceable
                      ? 'border-green-300 bg-gradient-to-br from-green-50 to-white'
                      : 'border-red-200 bg-gradient-to-br from-red-50 to-white'
                  }`}
                >
                  <CardContent className="p-5">
                    {/* Bank Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-3xl">{result.bank.logo}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{result.bank.name}</h3>
                        <p className="text-xs text-gray-500">{result.bank.roi}% ROI</p>
                      </div>
                    </div>

                    {/* Status Indicator */}
                    <div className="flex items-center gap-2 mb-3">
                      {result.isServiceable ? (
                        <>
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <span className="font-semibold text-green-700">Serviceable</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                          <span className="font-semibold text-red-600">Not Serviceable</span>
                        </>
                      )}
                    </div>

                    {/* Area Type Badge */}
                    <Badge
                      variant="outline"
                      className={`mb-3 ${getAreaTypeColor(areaType)} border`}
                    >
                      {areaType}
                    </Badge>

                    {/* Remarks */}
                    {result.remarks && (
                      <p
                        className={`text-xs ${
                          result.isServiceable ? 'text-green-700' : 'text-red-600'
                        } mt-2 bg-white/50 p-2 rounded`}
                      >
                        {result.remarks}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Summary Statistics */}
            <Card className="mt-8">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Summary</h3>
                <div className="grid grid-cols-4 gap-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-600">{serviceableCount}</p>
                    <p className="text-sm text-gray-600 mt-1">Serviceable Banks</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-600">
                      {bankResults.filter((r) => r.remarks?.includes('Branch')).length}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">Physical Branches</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-purple-600">
                      {bankResults.filter((r) => r.remarks?.includes('Digital')).length}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">Digital Processing</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-red-600">
                      {bankResults.filter((r) => !r.isServiceable).length}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">Not Covered</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-12 text-center">
              <div className="text-orange-400 mb-4">
                <XCircle className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Results Found</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <Button
                variant="outline"
                onClick={() => {
                  setPinCode('');
                  setAreaName('');
                  setSearchedPinCode(null);
                  setPinCodeData([]);
                  setError(null);
                }}
              >
                Try Another Search
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {!searchedPinCode && pinCodeData.length === 0 && !isLoading && !error && (
          <Card className="border-dashed border-2">
            <CardContent className="p-12 text-center">
              <div className="text-gray-400 mb-4">
                <MapPin className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Search Any PIN Code Across India
              </h3>
              <p className="text-gray-600 mb-6">
                Access 150,000+ PIN codes with live data • Check bank serviceability instantly
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <p className="text-sm text-gray-500 w-full mb-2">Try these popular PIN codes:</p>
                {['400001', '110001', '560001', '411001', '302001', '700001', '600001', '380001'].map((code) => (
                  <Button
                    key={code}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setPinCode(code);
                      setSearchType('pincode');
                      handleSearchByPincode();
                    }}
                  >
                    {code}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}