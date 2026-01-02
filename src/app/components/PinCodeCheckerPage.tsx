import { useState, useMemo } from 'react';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { pinCodes } from '../data/pincodes';
import { banks } from '../data/banks';
import { Search, CheckCircle, XCircle, MapPin, Info } from 'lucide-react';

export function PinCodeCheckerPage() {
  const [pinCode, setPinCode] = useState('');
  const [searchedPinCode, setSearchedPinCode] = useState<string | null>(null);

  // Get PIN code data
  const pinCodeData = useMemo(() => {
    return pinCodes.find((p) => p.pinCode === searchedPinCode);
  }, [searchedPinCode]);

  // Get bank results for searched PIN code
  const bankResults = useMemo(() => {
    if (!pinCodeData) return [];

    return banks.map((bank) => {
      const serviceability = pinCodeData.bankServiceability[bank.id];
      return {
        bank,
        isServiceable: serviceability?.isServiceable || false,
        remarks: serviceability?.remarks,
      };
    });
  }, [pinCodeData]);

  const handleSearch = () => {
    if (pinCode.length === 6) {
      setSearchedPinCode(pinCode);
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

  const serviceableCount = bankResults.filter((r) => r.isServiceable).length;

  return (
    <div className="min-h-[calc(100vh-60px)] bg-gray-50 py-12">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">PIN Code Serviceability Checker</h1>
          <p className="text-gray-600">Check bank serviceability by area PIN code</p>
        </div>

        {/* Search Section */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex gap-3 max-w-xl">
              <div className="flex-1">
                <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-2">
                  Enter PIN Code
                </label>
                <Input
                  id="pincode"
                  type="text"
                  placeholder="e.g., 400001"
                  maxLength={6}
                  value={pinCode}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    setPinCode(value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch();
                    }
                  }}
                  className="h-12 text-base"
                />
              </div>
              <div className="flex items-end">
                <Button
                  onClick={handleSearch}
                  size="lg"
                  className="px-8"
                  disabled={pinCode.length !== 6}
                >
                  <Search className="w-4 h-4 mr-2" />
                  Check Availability
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        {searchedPinCode && pinCodeData && (
          <>
            {/* PIN Code Info */}
            <div className="mb-6">
              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">
                          {pinCodeData.areaName}
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">
                          {pinCodeData.state} • PIN: {pinCodeData.pinCode}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={`${getAreaTypeColor(pinCodeData.areaType)} font-semibold border`}>
                        {pinCodeData.areaType}
                      </Badge>
                      <Badge variant="outline" className="text-base px-4 py-2">
                        {serviceableCount} / {banks.length} Banks Serviceable
                      </Badge>
                    </div>
                  </div>
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
                      className={`mb-3 ${getAreaTypeColor(pinCodeData.areaType)} border`}
                    >
                      {pinCodeData.areaType}
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

        {/* Invalid PIN Code Message */}
        {searchedPinCode && !pinCodeData && (
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-12 text-center">
              <div className="text-orange-400 mb-4">
                <XCircle className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">PIN Code Not Found</h3>
              <p className="text-gray-600 mb-4">
                We don't have serviceability data for PIN code {searchedPinCode}
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setPinCode('');
                  setSearchedPinCode(null);
                }}
              >
                Try Another PIN Code
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {!searchedPinCode && (
          <Card className="border-dashed border-2">
            <CardContent className="p-12 text-center">
              <div className="text-gray-400 mb-4">
                <MapPin className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Enter a PIN code to check serviceability
              </h3>
              <p className="text-gray-600 mb-6">
                Find out which banks provide services in your area and their availability type
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <p className="text-sm text-gray-500">Try these PIN codes:</p>
                {['400001', '110001', '560001', '411001', '302001'].map((code) => (
                  <Button
                    key={code}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setPinCode(code);
                      setSearchedPinCode(code);
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
