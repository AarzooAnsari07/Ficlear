import { useState } from 'react';
import { ChevronDown, ChevronUp, AlertTriangle, CheckCircle2, XCircle, Clock, HelpCircle, FileText, MessageCircle, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

interface PolicyPageProps {
  onNavigate?: (page: string) => void;
}

export function PolicyPage({ onNavigate }: PolicyPageProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Policy Header */}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* 1. BASIC ELIGIBILITY CRITERIA */}
        <Card className="mb-6 shadow-md border-0">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">1. Basic Eligibility Criteria</h2>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Minimum Salary */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  Minimum Salary
                </h3>
                <p className="text-2xl font-bold text-blue-600">₹15,000/month</p>
              </div>

              {/* Age Criteria */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  Age Criteria
                </h3>
                <p className="text-xl font-bold text-blue-600">Min: 21 years | Max: 60 years</p>
              </div>

              {/* Loan Amount */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  Loan Amount
                </h3>
                <p className="text-xl font-bold text-blue-600">₹50,000 - ₹100,00,000</p>
              </div>

              {/* Loan Tenure */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  Loan Tenure
                </h3>
                <p className="text-xl font-bold text-blue-600">12 to 84 months</p>
                <p className="text-sm text-gray-600 mt-1">Up to 96 months for salary above ₹100,000 (case dependent)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 2. COMPANY / EMPLOYER POLICY */}
        <Card className="mb-6 shadow-md border-0">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b">
            <h2 className="text-xl font-bold text-gray-900">2. Company / Employer Policy</h2>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2">Listed & Non-Listed Companies</h3>
                <div className="space-y-2 text-sm">
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span className="text-gray-700"><strong>Listed companies:</strong> Allowed</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span className="text-gray-700"><strong>Non-listed companies:</strong> Allowed (MCA vintage minimum 2 years)</span>
                  </p>
                </div>
              </div>

              <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                <h3 className="font-semibold text-gray-900 mb-2">Special Non-Listed Company Conditions</h3>
                <p className="text-sm text-gray-700">Certain banks & NBFCs allow non-listed companies with conditions such as:</p>
                <ul className="mt-2 space-y-1 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600">•</span>
                    <span>Salary threshold</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600">•</span>
                    <span>Limited multiplier</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600">•</span>
                    <span>Reduced maximum loan amount</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 3. ACCOMMODATION RULES */}
        <Card className="mb-6 shadow-md border-0">
          <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100 border-b">
            <h2 className="text-xl font-bold text-gray-900">3. Accommodation Rules</h2>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold text-gray-900">Bachelor Accommodation</h3>
                </div>
                <p className="text-sm text-gray-700">Allowed (subject to salary & CIBIL conditions)</p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center gap-2 mb-2">
                  <XCircle className="w-5 h-5 text-red-600" />
                  <h3 className="font-semibold text-gray-900">Hostel Accommodation</h3>
                </div>
                <p className="text-sm text-gray-700">Not allowed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 4. FOIR */}
        <Card className="mb-6 shadow-md border-0">
          <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 border-b">
            <h2 className="text-xl font-bold text-gray-900">4. FOIR (Fixed Obligation to Income Ratio)</h2>
          </CardHeader>
          <CardContent className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-green-50">
                  <tr>
                    <th className="text-left p-4 font-semibold text-gray-900">Monthly Salary</th>
                    <th className="text-left p-4 font-semibold text-gray-900">Maximum FOIR</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr className="bg-white">
                    <td className="p-4 text-gray-900">₹35K – ₹50K</td>
                    <td className="p-4">
                      <Badge className="bg-green-100 text-green-700 text-lg px-4 py-1">50%</Badge>
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-4 text-gray-900">₹50K – ₹75K</td>
                    <td className="p-4">
                      <Badge className="bg-blue-100 text-blue-700 text-lg px-4 py-1">60%</Badge>
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-4 text-gray-900">₹75K+</td>
                    <td className="p-4">
                      <Badge className="bg-purple-100 text-purple-700 text-lg px-4 py-1">70%</Badge>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Important Notes
              </h3>
              <p className="text-sm text-gray-700 mb-2">FOIR may reduce for:</p>
              <ul className="space-y-1 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600">•</span>
                  <span>Low CIBIL</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600">•</span>
                  <span>Unlisted company</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600">•</span>
                  <span>High existing obligations</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* 5. MULTIPLIER POLICY */}
        <Card className="mb-6 shadow-md border-0">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b">
            <h2 className="text-xl font-bold text-gray-900">5. Multiplier Policy</h2>
          </CardHeader>
          <CardContent className="p-6">
            <div className="overflow-x-auto mb-4">
              <table className="w-full">
                <thead className="bg-purple-50">
                  <tr>
                    <th className="text-left p-4 font-semibold text-gray-900">Monthly Income</th>
                    <th className="text-left p-4 font-semibold text-gray-900">Multiplier</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr className="bg-white">
                    <td className="p-4 text-gray-900">₹20K – ₹35K</td>
                    <td className="p-4">
                      <Badge className="bg-purple-100 text-purple-700 text-lg px-4 py-1">Up to 20×</Badge>
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-4 text-gray-900">₹35K – ₹75K</td>
                    <td className="p-4">
                      <Badge className="bg-blue-100 text-blue-700 text-lg px-4 py-1">Up to 22×</Badge>
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-4 text-gray-900">₹75K+</td>
                    <td className="p-4">
                      <Badge className="bg-green-100 text-green-700 text-lg px-4 py-1">Case dependent</Badge>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-700 mb-2"><strong>Final eligibility depends on:</strong></p>
              <ul className="space-y-1 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span>FOIR</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Company category</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Credit profile</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* 6. Documents Required */}
        <Card className="mt-6 shadow-md border-0">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b">
            <h2 className="text-xl font-bold text-gray-900">6. Documents Required</h2>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-900">Aadhaar Card</span>
              </div>
              <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-900">PAN Card</span>
              </div>
              <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-900">Latest 3 months salary slips</span>
              </div>
              <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-900">Latest 3 months bank statement</span>
              </div>
              <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg md:col-span-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-900">Office mailID / Form-16 (if required)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 7. Important Disclaimer */}
        <Card className="mt-6 shadow-md border-0 border-l-4 border-l-amber-500">
          <CardHeader className="bg-amber-50">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
              7. Important Disclaimer
            </h2>
          </CardHeader>
          <CardContent className="p-6 bg-amber-50">
            <p className="text-gray-800 mb-3">Eligibility criteria mentioned above are indicative and subject to:</p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span>Bank's internal credit policies</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span>Profile risk assessment</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span>Final approval by the lender</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Advanced Policy Toggle */}
        <div className="mb-6 mt-8">
          <Button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 font-semibold py-6 text-lg shadow-lg"
          >
            {showAdvanced ? (
              <>
                <ChevronUp className="w-5 h-5 mr-2" />
                Hide Advanced Policy Rules (For Professionals)
              </>
            ) : (
              <>
                <ChevronDown className="w-5 h-5 mr-2" />
                Show Advanced Policy Rules (For Professionals)
              </>
            )}
          </Button>
        </div>

        {/* Advanced Policy Section */}
        {showAdvanced && (
          <div className="space-y-6">
            <Card className="border-2 border-purple-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Advanced Policy Rules & Exceptions
                    </h2>
                    <p className="text-sm text-gray-700">
                      ⚠️ These are bank-specific exceptions & relaxations used by professionals.
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <Accordion type="multiple" className="space-y-4">
                  {/* 8. Address Proof Exception */}
                  <AccordionItem value="address-proof" className="border rounded-lg bg-white shadow-sm">
                    <AccordionTrigger className="px-4 py-3 hover:no-underline">
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-orange-600" />
                        <span className="font-semibold">8. ADDRESS PROOF EXCEPTION POLICY</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <h4 className="font-semibold text-gray-900 mb-3 mt-2">Banks / NBFCs Allowing Cases Without Address Proof</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-gray-900">HDFC Bank</span>
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                        </div>
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-gray-900">ICICI Bank</span>
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                        </div>
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-gray-900">IndusInd Bank</span>
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                        </div>
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-gray-900">YES Bank</span>
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                        </div>
                        <div className="flex items-center justify-between p-2 bg-amber-50 rounded border border-amber-200">
                          <span className="text-gray-900">Axis Bank</span>
                          <Badge className="bg-amber-500 text-white text-xs">⚠️ Account Opening Required</Badge>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-amber-50 rounded border border-amber-200">
                          <span className="text-gray-900">Kotak Bank</span>
                          <Badge className="bg-amber-500 text-white text-xs">⚠️ Account Opening Required</Badge>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-gray-900">ABFL</span>
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                        </div>
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-gray-900">InCred</span>
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                        </div>
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-gray-900">Finable</span>
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                        </div>
                      </div>
                      <div className="mt-4 p-3 bg-amber-50 rounded border border-amber-200">
                        <p className="text-sm text-amber-800 flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                          <span>Address proof waiver is subject to internal verification and may vary by profile.</span>
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* 9. Balance Transfer & OD Rules */}
                  <AccordionItem value="bt-od" className="border rounded-lg bg-white shadow-sm">
                    <AccordionTrigger className="px-4 py-3 hover:no-underline">
                      <div className="flex items-center gap-2">
                        <XCircle className="w-5 h-5 text-red-600" />
                        <span className="font-semibold">9. BALANCE TRANSFER (BT) & OD RULES</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="space-y-4 mt-2">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">OD / BT Restrictions</h4>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between p-3 bg-red-50 rounded border border-red-200">
                              <span className="text-gray-900 font-medium">HDFC Bank</span>
                              <Badge className="bg-red-500 text-white">❌ Not Allowed</Badge>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-red-50 rounded border border-red-200">
                              <span className="text-gray-900 font-medium">ICICI Bank</span>
                              <Badge className="bg-red-500 text-white">❌ Not Allowed</Badge>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-amber-50 rounded border border-amber-200">
                              <span className="text-gray-900 font-medium">Axis Bank</span>
                              <Badge className="bg-amber-500 text-white">⏳ After 2.5 Years</Badge>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-amber-50 rounded border border-amber-200">
                              <span className="text-gray-900 font-medium">Fullerton</span>
                              <Badge className="bg-amber-500 text-white">⏳ After 2.5 Years</Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* 10. Top-up & Lock-in */}
                  <AccordionItem value="topup" className="border rounded-lg bg-white shadow-sm">
                    <AccordionTrigger className="px-4 py-3 hover:no-underline">
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-blue-600" />
                        <span className="font-semibold">10. TOP-UP & BALANCE TRANSFER POLICY</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                          <h4 className="font-semibold text-gray-900 mb-2">Top-Up Loan</h4>
                          <p className="text-lg font-bold text-green-700">Allowed after 3 months</p>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <h4 className="font-semibold text-gray-900 mb-2">Balance Transfer</h4>
                          <p className="text-lg font-bold text-blue-700">After 6 months</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* 11. Foreclosure & Part-Payment */}
                  <AccordionItem value="foreclosure" className="border rounded-lg bg-white shadow-sm">
                    <AccordionTrigger className="px-4 py-3 hover:no-underline">
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-green-600" />
                        <span className="font-semibold">11. FORECLOSURE & PART-PAYMENT POLICY</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="space-y-3 mt-2">
                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                          <p className="text-sm text-gray-700">
                            <CheckCircle2 className="w-4 h-4 text-green-600 inline mr-2" />
                            <strong>Foreclosure:</strong> Allowed after 12 EMIs
                          </p>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <p className="text-sm text-gray-700">
                            <CheckCircle2 className="w-4 h-4 text-blue-600 inline mr-2" />
                            <strong>Part-payment:</strong> Allowed up to 20% after 12 EMIs
                          </p>
                        </div>
                        <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                          <p className="text-sm text-gray-700">
                            <AlertTriangle className="w-4 h-4 text-amber-600 inline mr-2" />
                            Charges as per bank's prevailing schedule
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* 12. Banks Minimum Salary */}
                  <AccordionItem value="bank-salary" className="border rounded-lg bg-white shadow-sm">
                    <AccordionTrigger className="px-4 py-3 hover:no-underline">
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <span className="font-semibold">12. BANKS WITH MINIMUM SALARY REQUIREMENT</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="overflow-x-auto mt-2">
                        <table className="w-full text-sm">
                          <thead className="bg-blue-50">
                            <tr>
                              <th className="text-left p-3 font-semibold text-gray-900">Bank</th>
                              <th className="text-left p-3 font-semibold text-gray-900">Minimum Salary</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            <tr className="bg-white hover:bg-gray-50">
                              <td className="p-3 font-medium text-gray-900">Axis Bank</td>
                              <td className="p-3 text-gray-700">₹15K (ETB) / ₹25K (NTB)</td>
                            </tr>
                            <tr className="bg-white hover:bg-gray-50">
                              <td className="p-3 font-medium text-gray-900">IDFC Bank</td>
                              <td className="p-3 text-gray-700">₹20K</td>
                            </tr>
                            <tr className="bg-white hover:bg-gray-50">
                              <td className="p-3 font-medium text-gray-900">YES Bank</td>
                              <td className="p-3 text-gray-700">₹25K</td>
                            </tr>
                            <tr className="bg-white hover:bg-gray-50">
                              <td className="p-3 font-medium text-gray-900">IndusInd Bank</td>
                              <td className="p-3 text-gray-700">₹25K (Listed) / ₹30K (Unlisted)</td>
                            </tr>
                            <tr className="bg-white hover:bg-gray-50">
                              <td className="p-3 font-medium text-gray-900">HDFC Bank</td>
                              <td className="p-3 text-gray-700">₹30K</td>
                            </tr>
                            <tr className="bg-white hover:bg-gray-50">
                              <td className="p-3 font-medium text-gray-900">ICICI Bank</td>
                              <td className="p-3 text-gray-700">₹35K (Listed) / ₹75K (Unlisted)</td>
                            </tr>
                            <tr className="bg-white hover:bg-gray-50">
                              <td className="p-3 font-medium text-gray-900">Kotak Bank</td>
                              <td className="p-3 text-gray-700">₹36K</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* 13. NBFCs Minimum Salary */}
                  <AccordionItem value="nbfc-salary" className="border rounded-lg bg-white shadow-sm">
                    <AccordionTrigger className="px-4 py-3 hover:no-underline">
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-purple-600" />
                        <span className="font-semibold">13. NBFCs WITH MINIMUM SALARY REQUIREMENT</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="overflow-x-auto mt-2">
                        <table className="w-full text-sm">
                          <thead className="bg-purple-50">
                            <tr>
                              <th className="text-left p-3 font-semibold text-gray-900">NBFC</th>
                              <th className="text-left p-3 font-semibold text-gray-900">Salary Requirement</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            <tr className="bg-white hover:bg-gray-50">
                              <td className="p-3 font-medium text-gray-900">Piramal</td>
                              <td className="p-3 text-gray-700">₹15K</td>
                            </tr>
                            <tr className="bg-white hover:bg-gray-50">
                              <td className="p-3 font-medium text-gray-900">InCred</td>
                              <td className="p-3 text-gray-700">₹15K</td>
                            </tr>
                            <tr className="bg-white hover:bg-gray-50">
                              <td className="p-3 font-medium text-gray-900">TATA Capital</td>
                              <td className="p-3 text-gray-700">₹15K (TATA emp) / ₹20K listed</td>
                            </tr>
                            <tr className="bg-white hover:bg-gray-50">
                              <td className="p-3 font-medium text-gray-900">Finable</td>
                              <td className="p-3 text-gray-700">₹20K</td>
                            </tr>
                            <tr className="bg-white hover:bg-gray-50">
                              <td className="p-3 font-medium text-gray-900">SMFG</td>
                              <td className="p-3 text-gray-700">₹20K</td>
                            </tr>
                            <tr className="bg-white hover:bg-gray-50">
                              <td className="p-3 font-medium text-gray-900">ABFL</td>
                              <td className="p-3 text-gray-700">₹25K (PL) / ₹40K (OD)</td>
                            </tr>
                            <tr className="bg-white hover:bg-gray-50">
                              <td className="p-3 font-medium text-gray-900">Shriram Finance</td>
                              <td className="p-3 text-gray-700">₹25K</td>
                            </tr>
                            <tr className="bg-white hover:bg-gray-50">
                              <td className="p-3 font-medium text-gray-900">Chola Mandalam</td>
                              <td className="p-3 text-gray-700">₹25K + Listed company</td>
                            </tr>
                            <tr className="bg-white hover:bg-gray-50">
                              <td className="p-3 font-medium text-gray-900">Poonawalla</td>
                              <td className="p-3 text-gray-700">₹30K (Unlisted max ₹5L)</td>
                            </tr>
                            <tr className="bg-white hover:bg-gray-50">
                              <td className="p-3 font-medium text-gray-900">Bajaj</td>
                              <td className="p-3 text-gray-700">₹35K Growth / ₹40K Prime</td>
                            </tr>
                            <tr className="bg-white hover:bg-gray-50">
                              <td className="p-3 font-medium text-gray-900">Axis Finance</td>
                              <td className="p-3 text-gray-700">₹50K + Listed company only</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        )}

        {/* View All Bank Policies Button */}
        <div className="mt-8 text-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-12 py-6 text-lg shadow-xl"
          >
            📋 Check All Bank Policies Separately
          </Button>
        </div>

        {/* Smart User CTA */}
        <Card className="mt-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white border-0 shadow-xl">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-3">
              This policy has multiple exceptions.
            </h3>
            <p className="text-blue-100 mb-6 text-lg">
              To apply correctly, consult a FiClear expert.
            </p>
            <div className="flex justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8"
              >
                Apply with Expert
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sticky Bottom CTA - Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 md:hidden z-50">
        <Button className="w-full bg-blue-600 hover:bg-blue-700 font-semibold">
          👉 Apply with Expert
        </Button>
      </div>
    </div>
  );
}