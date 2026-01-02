import { useState, useMemo } from 'react';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { companies } from '../data/companies';
import { banks } from '../data/banks';
import { Search, CheckCircle, XCircle, Info, Filter, Building2, Calendar, Shield, Users, TrendingUp } from 'lucide-react';
import { Checkbox } from './ui/checkbox';

export function CompanyCheckerPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [showOnlyListed, setShowOnlyListed] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Filter suggestions based on search query
  const suggestions = useMemo(() => {
    if (!searchQuery || searchQuery.length < 2) return [];
    return companies.filter((company) =>
      company.companyName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Get selected company data
  const companyData = useMemo(() => {
    return companies.find((c) => c.companyName === selectedCompany);
  }, [selectedCompany]);

  // Get bank results for selected company
  const bankResults = useMemo(() => {
    if (!companyData) return [];

    const results = banks.map((bank) => {
      const listing = companyData.bankCategories[bank.id];
      return {
        bank,
        isListed: listing?.isListed || false,
        category: listing?.category,
        maxMultiplier: listing?.maxMultiplier,
        notes: listing?.notes,
      };
    });

    if (showOnlyListed) {
      return results.filter((r) => r.isListed);
    }

    return results;
  }, [companyData, showOnlyListed]);

  const handleSearch = () => {
    if (suggestions.length > 0) {
      setSelectedCompany(suggestions[0].companyName);
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (companyName: string) => {
    setSelectedCompany(companyName);
    setSearchQuery(companyName);
    setShowSuggestions(false);
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'A':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'B':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'C':
        return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'D':
        return 'bg-red-100 text-red-700 border-red-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const listedCount = bankResults.filter((r) => r.isListed).length;

  return (
    <div className="min-h-[calc(100vh-60px)] bg-gray-50 py-12">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Company Category Checker</h1>
          <p className="text-gray-600">
            Check company listing & category across multiple banks instantly
          </p>
        </div>

        {/* Search Section */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="relative">
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Enter company name (e.g. TCS, Infosys, HUL)"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSearch();
                      }
                    }}
                    className="pl-12 h-12 text-base"
                  />

                  {/* Auto-suggestions dropdown */}
                  {showSuggestions && suggestions.length > 0 && (
                    <Card className="absolute top-full left-0 right-0 mt-2 z-50 shadow-lg">
                      <CardContent className="p-2">
                        <div className="space-y-1">
                          {suggestions.map((company) => (
                            <button
                              key={company.companyName}
                              onClick={() => handleSelectSuggestion(company.companyName)}
                              className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 transition-colors"
                            >
                              <p className="font-medium text-gray-900">{company.companyName}</p>
                              <p className="text-sm text-gray-500">{company.industry}</p>
                            </button>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
                <Button onClick={handleSearch} size="lg" className="px-8">
                  Search
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        {selectedCompany && companyData && (
          <>
            {/* Company Info & Filters */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {companyData.companyName}
                  </h2>
                  <p className="text-sm text-gray-600">{companyData.industry}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border">
                    <Checkbox
                      id="showListed"
                      checked={showOnlyListed}
                      onCheckedChange={(checked) => setShowOnlyListed(checked as boolean)}
                    />
                    <label
                      htmlFor="showListed"
                      className="text-sm font-medium text-gray-700 cursor-pointer flex items-center gap-2"
                    >
                      <Filter className="w-4 h-4" />
                      Show Only Listed Banks
                    </label>
                  </div>
                  <Badge variant="outline" className="text-base px-4 py-2">
                    {listedCount} / {banks.length} Banks Listed
                  </Badge>
                </div>
              </div>
            </div>

            {/* Enhanced Company Details Card */}
            {(companyData.cin || companyData.incorporationDate || companyData.companyType || companyData.employeeSize || companyData.riskTag) && (
              <Card className="mb-6 border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Building2 className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold text-gray-900">Company Information</h3>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {companyData.cin && (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-500 mb-1">CIN Number</p>
                        <p className="font-mono text-xs font-medium text-gray-900">{companyData.cin}</p>
                      </div>
                    )}
                    {companyData.incorporationDate && (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center gap-1 mb-1">
                          <Calendar className="w-3 h-3 text-gray-500" />
                          <p className="text-xs text-gray-500">Incorporated</p>
                        </div>
                        <p className="text-sm font-medium text-gray-900">
                          {new Date(companyData.incorporationDate).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                    )}
                    {companyData.companyStatus && (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-500 mb-1">Status</p>
                        <Badge 
                          className={`${
                            companyData.companyStatus === 'Active' 
                              ? 'bg-green-100 text-green-700 border-green-300' 
                              : 'bg-red-100 text-red-700 border-red-300'
                          }`}
                        >
                          {companyData.companyStatus}
                        </Badge>
                      </div>
                    )}
                    {companyData.companyType && (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center gap-1 mb-1">
                          <Building2 className="w-3 h-3 text-gray-500" />
                          <p className="text-xs text-gray-500">Company Type</p>
                        </div>
                        <p className="text-sm font-medium text-gray-900">{companyData.companyType}</p>
                      </div>
                    )}
                    {companyData.employeeSize && (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center gap-1 mb-1">
                          <Users className="w-3 h-3 text-gray-500" />
                          <p className="text-xs text-gray-500">Employee Size</p>
                        </div>
                        <p className="text-sm font-medium text-gray-900">{companyData.employeeSize}</p>
                      </div>
                    )}
                    {companyData.riskTag && (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center gap-1 mb-1">
                          <Shield className="w-3 h-3 text-gray-500" />
                          <p className="text-xs text-gray-500">Risk Level</p>
                        </div>
                        <Badge 
                          className={`${
                            companyData.riskTag === 'Low' 
                              ? 'bg-green-100 text-green-700 border-green-300' 
                              : companyData.riskTag === 'Medium'
                              ? 'bg-orange-100 text-orange-700 border-orange-300'
                              : 'bg-red-100 text-red-700 border-red-300'
                          }`}
                        >
                          {companyData.riskTag}
                        </Badge>
                      </div>
                    )}
                  </div>
                  {companyData.isMcaListed !== undefined && (
                    <div className="mt-4 flex items-center gap-2">
                      {companyData.isMcaListed ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-gray-700">MCA/Zauba Verified Company</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-red-500" />
                          <span className="text-sm text-gray-700">Not MCA Verified</span>
                        </>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Bank Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {bankResults.map((result) => (
                <Card
                  key={result.bank.id}
                  className={`transition-all hover:shadow-lg ${
                    result.isListed
                      ? 'border-green-300 bg-gradient-to-br from-green-50 to-white'
                      : 'border-gray-200 bg-gradient-to-br from-gray-50 to-white opacity-75'
                  }`}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{result.bank.logo}</div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{result.bank.name}</h3>
                          <p className="text-xs text-gray-500">{result.bank.roi}% ROI</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      {result.isListed ? (
                        <>
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="font-medium text-green-700">Listed</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-5 h-5 text-red-500" />
                          <span className="font-medium text-red-600">Not Listed</span>
                        </>
                      )}
                    </div>

                    {result.isListed && result.category && (
                      <Badge className={`${getCategoryColor(result.category)} font-semibold border`}>
                        Category {result.category}
                      </Badge>
                    )}

                    {!result.isListed && (
                      <p className="text-xs text-gray-500 mt-2">
                        This company is not in {result.bank.name}'s approved list
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Summary Statistics */}
            <Card className="mt-8">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Summary Statistics</h3>
                <div className="grid grid-cols-4 gap-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-600">{listedCount}</p>
                    <p className="text-sm text-gray-600 mt-1">Banks Listed</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-600">
                      {bankResults.filter((r) => r.category === 'A').length}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">Category A</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-600">
                      {bankResults.filter((r) => r.category === 'B').length}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">Category B</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-orange-600">
                      {bankResults.filter((r) => r.category === 'C').length}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">Category C</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Empty State */}
        {!selectedCompany && (
          <Card className="border-dashed border-2">
            <CardContent className="p-12 text-center">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Search for a company to get started
              </h3>
              <p className="text-gray-600 mb-6">
                Enter a company name above to check its listing status and category across all banks
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <p className="text-sm text-gray-500">Popular searches:</p>
                {['TCS', 'Infosys', 'HUL', 'Wipro', 'Amazon India'].map((company) => (
                  <Button
                    key={company}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const fullCompany = companies.find((c) =>
                        c.companyName.toLowerCase().includes(company.toLowerCase())
                      );
                      if (fullCompany) {
                        setSelectedCompany(fullCompany.companyName);
                        setSearchQuery(fullCompany.companyName);
                      }
                    }}
                  >
                    {company}
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