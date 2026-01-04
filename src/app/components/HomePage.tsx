import { Building, MapPin, FileText, Shield, Users, TrendingUp, ChevronRight, Award, TrendingDown } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Check Loan Eligibility Instantly with FiClear
            </h1>
            <p className="text-lg sm:text-xl text-blue-50 mb-8 leading-relaxed max-w-3xl mx-auto">
              Verify your company's loan eligibility, check PIN code serviceability, and compare 
              bank policies instantly. Get transparent, real-time eligibility results across 50+ 
              partner banks in seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
                onClick={() => onNavigate('eligibility')}
              >
                Check Eligibility Now
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-12 sm:-mt-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Building className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">10,000+</p>
                  <p className="text-xs sm:text-sm text-gray-600">Companies Listed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 sm:w-7 sm:h-7 text-green-600" />
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">50+</p>
                  <p className="text-xs sm:text-sm text-gray-600">Partner Banks</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 text-purple-600" />
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">₹500Cr+</p>
                  <p className="text-xs sm:text-sm text-gray-600">Loans Processed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 sm:w-7 sm:h-7 text-orange-600" />
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">100%</p>
                  <p className="text-xs sm:text-sm text-gray-600">Secure Platform</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Comprehensive Eligibility Verification */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        {/* Live Offers CTA Banner */}
        <Card className="mb-12 bg-gradient-to-r from-green-600 to-green-700 text-white border-0 shadow-xl overflow-hidden">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                  <TrendingDown className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-1">🎊 Live Bank Offers Available Now!</h3>
                  <p className="text-green-50">
                    Get instant loan approvals with special interest rates from top banks
                  </p>
                </div>
              </div>
              <Button
                size="lg"
                className="bg-white text-green-600 hover:bg-green-50 font-semibold px-8 shadow-lg whitespace-nowrap"
                onClick={() => onNavigate('offers')}
              >
                View All Offers
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Comprehensive Eligibility Verification
          </h2>
          <p className="text-lg text-gray-600">
            Three powerful tools to check loan eligibility from every angle
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Checker */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <Building className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Company Checker</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Verify company category and loan eligibility across 50+ banks
              </p>
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 font-semibold"
                onClick={() => onNavigate('company')}
              >
                Open Checker
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* PIN Code Checker */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                <MapPin className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Pan India PIN Code Checker</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Search 150,000+ PIN codes across India • Live data from data.gov.in
              </p>
              <Button 
                className="w-full bg-green-600 hover:bg-green-700 font-semibold"
                onClick={() => onNavigate('pincode')}
              >
                Open Checker
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Eligibility Checker */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                <FileText className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Eligibility Checker</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Compare policies, rates, and eligibility across all banks
              </p>
              <Button 
                className="w-full bg-purple-600 hover:bg-purple-700 font-semibold"
                onClick={() => onNavigate('eligibility')}
              >
                Open Checker
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600">Simple 3-step process to check eligibility</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-3xl font-bold text-blue-600 mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Enter Details</h3>
              <p className="text-gray-600 leading-relaxed">
                Search company name, PIN code, or browse bank policies
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-3xl font-bold text-blue-600 mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">View Results</h3>
              <p className="text-gray-600 leading-relaxed">
                Get instant eligibility results across multiple banks
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-3xl font-bold text-blue-600 mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Apply with Expert</h3>
              <p className="text-gray-600 leading-relaxed">
                Connect with our loan experts for personalized assistance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="font-bold text-gray-900 mb-2">100% Secure</h4>
            <p className="text-sm text-gray-600">Data Protected</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Trusted by 10K+</h4>
            <p className="text-sm text-gray-600">Happy Customers</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-purple-600" />
            </div>
            <h4 className="font-bold text-gray-900 mb-2">RBI Compliant</h4>
            <p className="text-sm text-gray-600">Fully Licensed</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-orange-600" />
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Best Rates</h4>
            <p className="text-sm text-gray-600">Competitive Offers</p>
          </div>
        </div>
      </section>
    </div>
  );
}